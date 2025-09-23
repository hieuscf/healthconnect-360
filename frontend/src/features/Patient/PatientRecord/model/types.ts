export interface PatientRecord {
  user_id: string;
  blood_group: string;
  allergies: string;
  chronic_conditions: string;
  medical_history: string;
  current_medications: string;
  vaccinations: string;
  height: number;  // cm
  weight: number;  // kg
}

export interface PatientRecordStore {
  patient: PatientRecord | null;   // đổi tên user -> patient
  loading: boolean;
  error: string | null;
  
  fetchPatient: (id: string) => Promise<void>;
  updatePatient: (id: string, data: Partial<PatientRecord>) => Promise<void>;
  clearPatient: () => void; // thêm function reset state
}
