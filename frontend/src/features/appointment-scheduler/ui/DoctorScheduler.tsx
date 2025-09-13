import React, { useState } from "react";
import {
  Plus,
  Calendar,
  Clock,
  User,
  MapPin,
  Stethoscope,
  Users,
  Phone,
  Edit2,
  Trash2,
  Save,
  X,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  type: "appointment" | "surgery" | "meeting" | "emergency" | "break";
  startTime: string;
  endTime: string;
  patient?: string;
  location?: string;
  notes?: string;
  date: string;
}

interface DaySchedule {
  [key: string]: Event[];
}

interface EventFormData {
  title: string;
  type: "appointment" | "surgery" | "meeting" | "emergency" | "break";
  startTime: string;
  endTime: string;
  patient: string;
  location: string;
  notes: string;
  date: string;
}

export default function DoctorSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 2)); // September 2, 2025
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    type: "appointment",
    startTime: "",
    endTime: "",
    patient: "",
    location: "",
    notes: "",
    date: "",
  });

  // Sample schedule data - using state to make it editable
  const [schedule, setSchedule] = useState<DaySchedule>({
    "2025-09-02": [
      {
        id: "1",
        title: "Khám tổng quát",
        type: "appointment",
        startTime: "08:00",
        endTime: "08:30",
        patient: "Nguyễn Văn An",
        location: "Phòng khám 101",
        notes: "Kiểm tra sức khỏe định kỳ",
        date: "2025-09-02",
      },
      {
        id: "2",
        title: "Phẫu thuật",
        type: "surgery",
        startTime: "10:00",
        endTime: "12:00",
        patient: "Trần Thị Bình",
        location: "Phòng mổ A",
        notes: "Phẫu thuật ruột thừa",
        date: "2025-09-02",
      },
      {
        id: "3",
        title: "Nghỉ trưa",
        type: "break",
        startTime: "12:00",
        endTime: "13:00",
        location: "Phòng nghỉ bác sĩ",
        date: "2025-09-02",
      },
    ],
    "2025-09-03": [
      {
        id: "4",
        title: "Hội chẩn",
        type: "meeting",
        startTime: "09:00",
        endTime: "10:30",
        location: "Phòng họp lớn",
        notes: "Bàn luận ca bệnh phức tạp",
        date: "2025-09-03",
      },
      {
        id: "5",
        title: "Khám chuyên khoa",
        type: "appointment",
        startTime: "14:00",
        endTime: "17:00",
        location: "Phòng khám chuyên khoa",
        notes: "Tiếp nhận bệnh nhân ngoại trú",
        date: "2025-09-03",
      },
    ],
    "2025-09-04": [
      {
        id: "6",
        title: "Đào tạo y khoa",
        type: "meeting",
        startTime: "08:00",
        endTime: "10:00",
        location: "Hội trường A",
        notes: "Hội thảo cập nhật kiến thức",
        date: "2025-09-04",
      },
    ],
    "2025-09-05": [
      {
        id: "7",
        title: "Ca cấp cứu",
        type: "emergency",
        startTime: "18:00",
        endTime: "06:00",
        location: "Khoa cấp cứu",
        notes: "Ca trực đêm",
        date: "2025-09-05",
      },
    ],
  });

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const eventTypes = [
    { value: "appointment", label: "Khám bệnh", icon: User },
    { value: "surgery", label: "Phẫu thuật", icon: Stethoscope },
    { value: "meeting", label: "Hội chẩn/Họp", icon: Users },
    { value: "emergency", label: "Cấp cứu/Trực", icon: Phone },
    { value: "break", label: "Nghỉ ngơi", icon: Clock },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 border-l-4 border-blue-500 text-blue-800";
      case "surgery":
        return "bg-red-100 border-l-4 border-red-500 text-red-800";
      case "meeting":
        return "bg-green-100 border-l-4 border-green-500 text-green-800";
      case "emergency":
        return "bg-orange-100 border-l-4 border-orange-500 text-orange-800";
      case "break":
        return "bg-gray-100 border-l-4 border-gray-500 text-gray-800";
      default:
        return "bg-gray-100 border-l-4 border-gray-500 text-gray-800";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <User className="w-4 h-4" />;
      case "surgery":
        return <Stethoscope className="w-4 h-4" />;
      case "meeting":
        return <Users className="w-4 h-4" />;
      case "emergency":
        return <Phone className="w-4 h-4" />;
      case "break":
        return <Clock className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const dateKey = formatDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(selectedDate === dateKey ? null : dateKey);
  };

  const openAddModal = (date?: string) => {
    setModalMode("add");
    setEditingEvent(null);
    setFormData({
      title: "",
      type: "appointment",
      startTime: "",
      endTime: "",
      patient: "",
      location: "",
      notes: "",
      date:
        date ||
        selectedDate ||
        formatDateKey(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          new Date().getDate()
        ),
    });
    setShowModal(true);
  };

  const openEditModal = (event: Event) => {
    setModalMode("edit");
    setEditingEvent(event);
    setFormData({
      title: event.title,
      type: event.type,
      startTime: event.startTime,
      endTime: event.endTime,
      patient: event.patient || "",
      location: event.location || "",
      notes: event.notes || "",
      date: event.date,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setFormData({
      title: "",
      type: "appointment",
      startTime: "",
      endTime: "",
      patient: "",
      location: "",
      notes: "",
      date: "",
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.startTime || !formData.endTime) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    const newEvent: Event = {
      id: editingEvent?.id || Date.now().toString(),
      title: formData.title,
      type: formData.type,
      startTime: formData.startTime,
      endTime: formData.endTime,
      patient: formData.patient || undefined,
      location: formData.location || undefined,
      notes: formData.notes || undefined,
      date: formData.date,
    };

    setSchedule((prev) => {
      const newSchedule = { ...prev };

      if (modalMode === "edit" && editingEvent) {
        // Remove old event
        const oldDateEvents = newSchedule[editingEvent.date] || [];
        newSchedule[editingEvent.date] = oldDateEvents.filter(
          (e) => e.id !== editingEvent.id
        );

        if (newSchedule[editingEvent.date].length === 0) {
          delete newSchedule[editingEvent.date];
        }
      }

      // Add new/updated event
      if (!newSchedule[formData.date]) {
        newSchedule[formData.date] = [];
      }
      newSchedule[formData.date].push(newEvent);

      // Sort events by start time
      newSchedule[formData.date].sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      );

      return newSchedule;
    });

    closeModal();
  };

  const handleDeleteEvent = (eventId: string) => {
    setSchedule((prev) => {
      const newSchedule = { ...prev };

      // Find and remove the event
      Object.keys(newSchedule).forEach((dateKey) => {
        newSchedule[dateKey] = newSchedule[dateKey].filter(
          (e) => e.id !== eventId
        );
        if (newSchedule[dateKey].length === 0) {
          delete newSchedule[dateKey];
        }
      });

      return newSchedule;
    });

    setShowDeleteConfirm(null);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Lịch Làm Việc Bác Sĩ
              </h1>
              <p className="text-gray-600 mt-1">
                BS. Nguyễn Văn Minh - Khoa Nội Tổng Hợp
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => openAddModal()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Thêm Lịch</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold text-gray-800">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={() => navigateMonth(1)}
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
                  const isToday = dateKey === "2025-09-02";
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
                    >
                      <div
                        onClick={() => handleDateClick(day)}
                        className="h-full"
                      >
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
                          openAddModal(dateKey);
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

          {/* Event Details Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Lịch Hôm Nay
              </h3>
              <div className="space-y-3">
                {(schedule["2025-09-02"] || []).map((event) => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg ${getEventColor(
                      event.type
                    )} relative group`}
                  >
                    <div className="flex items-start space-x-2">
                      {getEventIcon(event.type)}
                      <div className="flex-1">
                        <div className="font-semibold text-sm">
                          {event.title}
                        </div>
                        <div className="text-xs mt-1">
                          {event.startTime} - {event.endTime}
                        </div>
                        {event.patient && (
                          <div className="text-xs mt-1">
                            Bệnh nhân: {event.patient}
                          </div>
                        )}
                        {event.location && (
                          <div className="text-xs mt-1 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal(event)}
                          className="p-1 hover:bg-white hover:bg-opacity-50 rounded"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(event.id)}
                          className="p-1 hover:bg-white hover:bg-opacity-50 rounded text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Date Details */}
            {selectedDate && schedule[selectedDate] && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Chi tiết ngày {selectedDate}
                </h3>
                <div className="space-y-3">
                  {schedule[selectedDate].map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg ${getEventColor(
                        event.type
                      )} relative group`}
                    >
                      <div className="flex items-start space-x-2">
                        {getEventIcon(event.type)}
                        <div className="flex-1">
                          <div className="font-semibold text-sm">
                            {event.title}
                          </div>
                          <div className="text-xs mt-1">
                            {event.startTime} - {event.endTime}
                          </div>
                          {event.patient && (
                            <div className="text-xs mt-1">
                              Bệnh nhân: {event.patient}
                            </div>
                          )}
                          {event.location && (
                            <div className="text-xs mt-1 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {event.location}
                            </div>
                          )}
                          {event.notes && (
                            <div className="text-xs mt-2 text-gray-600">
                              {event.notes}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(event)}
                            className="p-1 hover:bg-white hover:bg-opacity-50 rounded"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(event.id)}
                            className="p-1 hover:bg-white hover:bg-opacity-50 rounded text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Thống Kê Tuần
              </h3>
              <div className="space-y-3">
                {(() => {
                  const stats = Object.values(schedule)
                    .flat()
                    .reduce((acc, event) => {
                      acc[event.type] = (acc[event.type] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>);

                  return [
                    {
                      type: "appointment",
                      label: "Số ca khám",
                      color: "text-blue-600",
                      count: stats.appointment || 0,
                    },
                    {
                      type: "surgery",
                      label: "Ca phẫu thuật",
                      color: "text-red-600",
                      count: stats.surgery || 0,
                    },
                    {
                      type: "emergency",
                      label: "Ca trực",
                      color: "text-orange-600",
                      count: stats.emergency || 0,
                    },
                    {
                      type: "meeting",
                      label: "Hội chẩn",
                      color: "text-green-600",
                      count: stats.meeting || 0,
                    },
                  ].map(({ type, label, color, count }) => (
                    <div
                      key={type}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className={`font-semibold ${color}`}>{count}</span>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Event Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {modalMode === "add" ? "Thêm Lịch Mới" : "Chỉnh Sửa Lịch"}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại sự kiện *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as unknown,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {eventTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giờ bắt đầu *
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Giờ kết thúc *
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bệnh nhân
                    </label>
                    <input
                      type="text"
                      value={formData.patient}
                      onChange={(e) =>
                        setFormData({ ...formData, patient: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tên bệnh nhân (nếu có)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa điểm
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Phòng/Địa điểm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ghi chú thêm..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>{modalMode === "add" ? "Thêm" : "Cập nhật"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Xác nhận xóa
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa lịch hẹn này không? Hành động này
                không thể hoàn tác.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDeleteEvent(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
