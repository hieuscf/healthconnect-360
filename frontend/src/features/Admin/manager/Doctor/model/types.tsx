export interface Doctor {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  experience: number;
  specialization: string;
  degree: string;
  clinic: string;
  licenseNumber: string;
  status: "active" | "inactive" | "on_leave";
  rating: number;
  avatar_image?: string;
}

type DoctorStatus = "active" | "inactive" | "on_leave";

export interface DoctorForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: number;
  specialization: string;
  degree: string; // học vị
  clinic: string; // nơi công tác
  licenseNumber: string; // số giấy phép
}
