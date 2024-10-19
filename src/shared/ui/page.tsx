import React from 'react';

interface PageProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Page({
  children,
  className = '',
}: PageProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${className}`}
    >
      <div className="w-full max-w-4xl flex flex-col items-center gap-6">
        {children}
      </div>
    </div>
  );
}
