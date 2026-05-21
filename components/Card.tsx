import React from "react";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border bg-red-950/60 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}