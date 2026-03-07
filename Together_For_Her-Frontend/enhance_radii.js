const fs = require('fs');
const path = require('path');

const directory = './src';

// Regex mappings for border-radius (circular corners)
const replacements = [
    { regex: /rounded-md/g, replace: 'rounded-xl' },
    { regex: /rounded-lg/g, replace: 'rounded-2xl' },
    { regex: /rounded-xl/g, replace: 'rounded-3xl' },
    { regex: /rounded-2xl/g, replace: 'rounded-[2rem]' },
    { regex: /rounded-3xl/g, replace: 'rounded-[2.5rem]' },
    { regex: /rounded-\[2rem\]/g, replace: 'rounded-[2.5rem]' },
    // Optional: Target custom values and standard them to softer sizes
    { regex: /rounded-\[1\.5rem\]/g, replace: 'rounded-[2rem]' },
    { regex: /rounded-\[2\.5rem\]/g, replace: 'rounded-[3rem]' }
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
                console.log(`Softened circular corners in: ${fullPath}`);
                filesChangedCount++;
            }
        }
    });
}

console.log('Starting border radius enhancement for psychological harmony...');
walk(directory);
console.log(`Done. Enhanced rounded corners in ${filesChangedCount} files.`);
