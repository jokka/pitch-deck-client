import React, { ReactNode } from 'react';

interface ClickableTextProps {
  onClick: () => void;
  children: ReactNode;
}

const ClickableText = ({ onClick, children }: ClickableTextProps) => (
  <div
    onClick={onClick}
    className="cursor-pointer transition-opacity opacity-50 hover:underline hover:opacity-100 active:no-underline active:translate-y-[1px]"
  >
    {children}
  </div>
);

export default ClickableText;
