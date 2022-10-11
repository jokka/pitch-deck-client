import React from 'react';

const Spinner = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 animate-spin"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M 12 12 M 4.031 9.865 a 8.25 8.25 0 0 1 13.803 -3.7"
    />
  </svg>
);

export default Spinner;
