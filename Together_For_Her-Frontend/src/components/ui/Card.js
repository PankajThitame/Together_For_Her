import React from 'react';

const Card = ({
    children,
    className = '',
    hoverable = true,
    glass = false
}) => {
    const baseStyles = "rounded-2xl overflow-hidden transition-all duration-300";
    const variants = glass
        ? "bg-white/70 backdrop-blur-md border border-pink-200/70 shadow-xl"
        : "bg-white border border-pink-200 shadow-sm";

    const hoverStyles = hoverable
        ? "hover:shadow-xl hover:-translate-y-1"
        : "";

    return (
        <div className={`${baseStyles} ${variants} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => (
    <div className={`px-6 py-4 border-b border-gray-50 ${className}`}>
        {children}
    </div>
);

export const CardBody = ({ children, className = '' }) => (
    <div className={`px-6 py-5 ${className}`}>
        {children}
    </div>
);

export const CardFooter = ({ children, className = '' }) => (
    <div className={`px-6 py-4 bg-gray-50/50 border-t border-gray-50 ${className}`}>
        {children}
    </div>
);

export default Card;
