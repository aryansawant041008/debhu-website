import React from 'react';

interface CapgammaLogoProps {
  size?: number;
  className?: string;
}

export const CapgammaLogo: React.FC<CapgammaLogoProps> = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M23 20 Q36 37 50 11 Q64 37 77 20 Q73 33 74 45 Q50 31 26 45 Q27 33 23 20 Z"
        fill="currentColor"
      />
      <circle cx="50" cy="50" r="11.5" fill="currentColor" />
      <path
        d="M23 80 Q36 63 50 89 Q64 63 77 80 Q73 67 74 55 Q50 69 26 55 Q27 67 23 80 Z"
        fill="currentColor"
      />
    </svg>
  );
};
