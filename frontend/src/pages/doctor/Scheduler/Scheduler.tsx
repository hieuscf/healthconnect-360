import React,{useState} from "react";
import DoctorSchedule from "../../../features/appointment-scheduler/ui/DoctorScheduler";
import { CalendarGrid } from "../../../features/calendar-grid/ui/CalendarGrid";
import { formatDateKey } from "../../../shared/lib/Calendar/formatDateKey";
import { getEventColor } from "../../../features/calendar-grid/model/calendar-grid";

interface DaySchedule {
  [key: string]: Event[];
}


interface Event {
  id: string;
  title: string;
  type: 'appointment' | 'surgery' | 'meeting' | 'emergency' | 'break';
  startTime: string;
  endTime: string;
  patient?: string;
  location?: string;
  notes?: string;
  date: string;
}
const Scheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 2)); // September 2, 2025
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
    const [schedule, setSchedule] = useState<DaySchedule>({
        '2025-09-02': [
          {
            id: '1',
            title: 'Khám tổng quát',
            type: 'appointment',
            startTime: '08:00',
            endTime: '08:30',
            patient: 'Nguyễn Văn An',
            location: 'Phòng khám 101',
            notes: 'Kiểm tra sức khỏe định kỳ',
            date: '2025-09-02'
          },
          {
            id: '2',
            title: 'Phẫu thuật',
            type: 'surgery',
            startTime: '10:00',
            endTime: '12:00',
            patient: 'Trần Thị Bình',
            location: 'Phòng mổ A',
            notes: 'Phẫu thuật ruột thừa',
            date: '2025-09-02'
          },
          {
            id: '3',
            title: 'Nghỉ trưa',
            type: 'break',
            startTime: '12:00',
            endTime: '13:00',
            location: 'Phòng nghỉ bác sĩ',
            date: '2025-09-02'
          }
        ],
        '2025-09-03': [
          {
            id: '4',
            title: 'Hội chẩn',
            type: 'meeting',
            startTime: '09:00',
            endTime: '10:30',
            location: 'Phòng họp lớn',
            notes: 'Bàn luận ca bệnh phức tạp',
            date: '2025-09-03'
          },
          {
            id: '5',
            title: 'Khám chuyên khoa',
            type: 'appointment',
            startTime: '14:00',
            endTime: '17:00',
            location: 'Phòng khám chuyên khoa',
            notes: 'Tiếp nhận bệnh nhân ngoại trú',
            date: '2025-09-03'
          }
        ],
        '2025-09-04': [
          {
            id: '6',
            title: 'Đào tạo y khoa',
            type: 'meeting',
            startTime: '08:00',
            endTime: '10:00',
            location: 'Hội trường A',
            notes: 'Hội thảo cập nhật kiến thức',
            date: '2025-09-04'
          }
        ],
        '2025-09-05': [
          {
            id: '7',
            title: 'Ca cấp cứu',
            type: 'emergency',
            startTime: '18:00',
            endTime: '06:00',
            location: 'Khoa cấp cứu',
            notes: 'Ca trực đêm',
            date: '2025-09-05'
          }
        ]
      });
  return (
    <div>
      <CalendarGrid
        currentDate={currentDate}
        schedule={schedule}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onQuickAdd={() => setShowModal(true)}
        getEventColor={getEventColor}
        formatDateKey={formatDateKey}
      />
    </div>
  );
};

export default Scheduler;
