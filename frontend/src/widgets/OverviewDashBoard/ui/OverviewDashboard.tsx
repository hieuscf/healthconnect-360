import React, { useEffect, useState } from "react";
import { useUserOverview } from "../model/useUserOverview";
import { StatCard } from "../../../shared/components/StartCard";

export const OverviewDashboard: React.FC = () => {
  const { stats, loading, error } = useUserOverview();

  if (loading) return <div>Loading...</div>;
  if (error || !stats) return <div>Error loading data</div>;

  const displayStats = [
    {
      title: "Total Patients",
      value: stats.totalPatient.toLocaleString(),
      change: `${stats.rateActivePatient.toFixed(1)}% active`,
      changeType:
        stats.rateActivePatient >= 50
          ? ("positive" as const)
          : ("negative" as const),
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      change: `${stats.rateActiveUser.toFixed(1)}% active`,
      changeType:
        stats.rateActiveUser >= 50
          ? ("positive" as const)
          : ("negative" as const),
    },
    {
      title: "Total Doctors",
      value: stats.totalDoctor.toLocaleString(),
      change: `${stats.rateActiveDoctor.toFixed(1)}% active`,
      changeType:
        stats.rateActiveDoctor >= 50
          ? ("positive" as const)
          : ("negative" as const),
    },
    {
      title: "Total Admin",
      value: stats.totalAdmin.toLocaleString(),
      change: `${stats.rateActiveUser.toFixed(1)}% active`,
      changeType:
        stats.rateActiveUser >= 50
          ? ("positive" as const)
          : ("negative" as const),
    },
  ];

  return (
    <div className="h-[250px] bg-white rounded-lg border border-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
