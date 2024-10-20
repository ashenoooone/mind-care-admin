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
      className={`flex justify-center p-4 max-w-[1280px] ${className}`}
    >
      {children}
    </div>
  );
}
