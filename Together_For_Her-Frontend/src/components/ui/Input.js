import React from 'react';

const Input = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    className={`
            w-full px-4 py-2.5 bg-white border border-pink-300 rounded-xl
            text-gray-900 placeholder-gray-400
            transition-all duration-200 outline-none
            focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'hover:border-gray-300'}
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1.5 text-xs text-red-500 ml-1 italic font-medium">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
