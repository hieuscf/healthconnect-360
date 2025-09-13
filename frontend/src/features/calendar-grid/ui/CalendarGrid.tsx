import React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  dayNames,
  monthNames,
} from "../../../shared/lib/Calendar/formatDateKey";

interface Event {
  id: string;
  title: string;
  type: string;
  startTime: string;
  endTime: string;
  date: string;
}

interface CalendarGridProps {
  currentDate: Date;
  schedule: Record<string, Event[]>;
  selectedDate: string | null;
  onSelectDate: (dateKey: string) => void;
  onQuickAdd: (dateKey: string) => void;
  onNavigateMonth: (newDate: Date) => void;
  getEventColor: (type: string) => string;
  formatDateKey: (year: number, month: number, day: number) => string;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  schedule,
  selectedDate,
  onSelectDate,
  onQuickAdd,
  onNavigateMonth,
  getEventColor,
  formatDateKey,
}) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const days = getDaysInMonth(currentDate);

  const todayKey = formatDateKey(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() =>
                onNavigateMonth(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                  )
                )
              }
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() =>
                onNavigateMonth(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                  )
                )
              }
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-semibold text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={index} className="p-2 h-24"></div>;
              }

              const dateKey = formatDateKey(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              );
              const dayEvents = schedule[dateKey] || [];
              const isToday = dateKey === todayKey;
              const isSelected = selectedDate === dateKey;

              return (
                <div
                  key={day}
                  className={`p-2 h-24 border rounded-lg cursor-pointer transition-all hover:shadow-md relative group ${
                    isToday
                      ? "bg-blue-50 border-blue-200"
                      : isSelected
                      ? "bg-indigo-50 border-indigo-200"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => onSelectDate(dateKey)}
                >
                  <div className="h-full">
                    <div
                      className={`text-sm font-semibold mb-1 ${
                        isToday ? "text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded ${getEventColor(
                            event.type
                          )} truncate`}
                        >
                          {event.startTime} {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} khác
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Quick add button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(dateKey);
                    }}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 transition-all"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
