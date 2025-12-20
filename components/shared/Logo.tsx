import React from 'react'

type LogoProps = {
    width?: number;
    height?: number;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 400, height = 120, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 120"
            width={width}
            height={height}
            className={className}
            role='img'
            aria-label='DreamHomes Real Estate Logo'
        >
            <defs>
                <linearGradient id="dh-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#005bea" stopOpacity={1} />
                    <stop offset="100%" stopColor="#00c6fb" stopOpacity={1} />
                </linearGradient>
            </defs>

            <g transform="translate(20, 25)">
                <path d="M 50,5 L 5,45 L 25,45 L 25,75 L 75,75 L 75,45 L 95,45 Z" fill="url(#dh-grad1)" stroke="none" />
                <path d="M 5,85 Q 50,105 95,75" stroke="#ff9a44" strokeWidth={6} fill="none" strokeLinecap="round" />
                <rect x="42" y="55" width="16" height="16" fill="white" />
            </g>

            <g transform="translate(130, 30)" fontFamily="'Segoe UI', Roboto, Helvetica, Arial, sans-serif">
                <text x="0" y="40" fontSize={42} fontWeight="bold" fill="#2d3748">
                    Dream<tspan fill="#005bea">Homes</tspan>
                </text>
                <text x="2" y="70" fontSize={16} fontWeight={500} letterSpacing={3} fill="#718096">REAL ESTATE</text>
            </g>
        </svg>
    )
}

export default Logo