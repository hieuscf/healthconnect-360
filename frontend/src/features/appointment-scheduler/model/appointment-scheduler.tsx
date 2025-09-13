export interface Event {
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

export interface DaySchedule {
  [key: string]: Event[];
}

export interface EventFormData {
  title: string;
  type: 'appointment' | 'surgery' | 'meeting' | 'emergency' | 'break';
  startTime: string;
  endTime: string;
  patient: string;
  location: string;
  notes: string;
  date: string;
}