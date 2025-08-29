import React from "react";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  to: string;
}

export const SubmenuItem: React.FC<Props> = ({ label, to }) => (
  <div className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 py-1">
    <Link to={to} className="block w-full h-full">
      {label}
    </Link>
  </div>
);
