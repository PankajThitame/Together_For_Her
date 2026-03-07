const fs = require('fs');
const path = require('path');

const directory = './src';

// Regex mappings for border enhancements
const replacements = [
    { regex: /border-white\/20/g, replace: 'border-pink-200/50' },
    { regex: /border-white\/30/g, replace: 'border-pink-200/60' },
    { regex: /border-white\/40/g, replace: 'border-pink-200/70' },
    { regex: /border-white\/50/g, replace: 'border-pink-300/70' },
    { regex: /border-white\/60/g, replace: 'border-pink-300/80' },
    { regex: /dark:border-slate-800\/20/g, replace: 'dark:border-slate-600/50' },
    { regex: /dark:border-slate-800\/40/g, replace: 'dark:border-slate-600/70' },
    { regex: /dark:border-slate-800/g, replace: 'dark:border-slate-600' },
    { regex: /dark:border-slate-700/g, replace: 'dark:border-slate-500' },
    { regex: /border-gray-100/g, replace: 'border-pink-200' },
    { regex: /border-gray-200/g, replace: 'border-pink-300' }
];

let filesChangedCount = 0;

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            replacements.forEach(({ regex, replace }) => {
                content = content.replace(regex, replace);
            });

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated borders in: ${fullPath}`);
                filesChangedCount++;
            }
        }
    });
}

console.log('Starting border enhancement...');
walk(directory);
console.log(`Done. Enhanced borders in ${filesChangedCount} files.`);
