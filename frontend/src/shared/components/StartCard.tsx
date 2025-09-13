import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
}) => {
  const changeColor =
    changeType === "positive" ? "text-green-600" : "text-red-500";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-gray-600 text-sm font-medium mb-3">{title}</h3>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className={`text-sm font-medium ${changeColor}`}>{change}</div>
      </div>
    </div>
  );
};
