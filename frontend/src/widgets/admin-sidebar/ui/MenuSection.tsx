import React, { type ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export const MenuSection: React.FC<Props> = ({ title, children }) => (
  <div className="mb-2">
    <h3 className="px-6 mb-2 mt-4 text-xs font-outfit text-gray-400 uppercase tracking-wider">
      {title}
    </h3>
    {children}
  </div>
);
