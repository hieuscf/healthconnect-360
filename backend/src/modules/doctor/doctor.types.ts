export interface UpdateDoctorInput {
  fullName?: string;
  email?: string;
  phone?: string;
  experience?: number;
  specialization?: string[]; // danh sách ID chuyên khoa
  degree?: string;
  clinic?: string;
  licenseNumber?: string;
  status?: "active" | "inactive" | "on_leave";
  avatar_image?: string;
}