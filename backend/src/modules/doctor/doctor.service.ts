import Doctor from "./doctor.model";
import AuthUser from "../auth/auth.model";
import UserDetails from "../users/user.model"
import bcrypt from "bcrypt";
import type { UpdateDoctorInput } from "./doctor.types"
import Role from "../permistion/model/roles";
import UserRole from "../permistion/model/user_roles";
import Specialization from "../specialization/specialization.model"
import DoctorSpecialization from "../relations/doctorSpecialization.model";


export const createDoctorService = async (data: {
  fullName: string;
  email: string;
  phone: string;
  experience: number;
  specialization: string[];
  degree: string;
  clinic: string;
  licenseNumber: string;
}) => {

  const existingLicenseNumber = await Doctor.findOne({ where: { licenseNumber: data.licenseNumber } });
  if (existingLicenseNumber) {
    throw new Error("Doctor đã tồn tại");
  }

  // Kiểm tra trùng email
  const existingEmail = await AuthUser.findOne({ where: { email: data.email } });
  if (existingEmail) {
    throw new Error("Email đã tồn tại");
  }
  //tao password default
  const password = data.email;
  //Tạo tài khoản mới cho bác sỹ
  const hash = await bcrypt.hash(password, 10);
  const user = await AuthUser.create({
    email:data.email,
    password_hash: hash,
    active:true
  });

  const doctorRole = await Role.findOne({ where: { role_name: "Doctor" } });
  if (doctorRole) {
    await UserRole.create({
      user_id: user.user_id,
      role_id: doctorRole.role_id,
    });
  }

  //Tạo UserDetails mặc định cho user
  await UserDetails.create({
    user_id: user.user_id,
    full_name: data.fullName || "",
    avatar_image:
      process.env.AVATAR ||
      "https://res.cloudinary.com/dwtuyzsl5/image/upload/v1757610785/avatar-icon_l51bse.avif",
    phone: data.phone || "",
    citizen_id: "",
    health_insurance_id: null,
    country: "",
    city: "",
    postal_code: null,
    tax_id: null,
  });

  // Tạo mới bác sĩ
  const newDoctor = await Doctor.create({
      user_id: user.user_id,
      degree: data.degree,
      experience_years: data.experience,
      clinic: data.clinic,
      licenseNumber: data.licenseNumber,
      status: "active",
      bio: ""
  });

  // Gắn chuyên khoa vào bảng trung gian
  if (data.specialization && data.specialization.length > 0) {
    await newDoctor.setSpecializations(data.specialization);
  }



  return newDoctor;
};

export const getDoctorsService = async () => {
  const doctors = await Doctor.findAll({
    include: [
      {
        model: AuthUser,
        as: "user",
        attributes: ["email"],
        include: [
          {
            model: UserDetails,
            as: "details",
            attributes: ["full_name", "avatar_image", "phone"],
          },
        ],
      },
      {
        model: Specialization,
        as: "specializations",
        attributes: ["specialization_name"],
        through: { attributes: [] }, // bỏ cột trung gian
      },
    ],
    attributes: [
      "doctor_id",
      "degree",
      "experience_years",
      "clinic",
      "licenseNumber",
      "status",
      "rating",
    ],
  });

  // Map dữ liệu về đúng interface Doctor
  return doctors.map((doc: any) => ({
    id: doc.doctor_id,
    fullName: doc.user?.details?.full_name || "",
    email: doc.user?.email || "",
    phone: doc.user?.details?.phone || "",
    experience: doc.experience_years,
    specialization: doc.specializations?.map((s: any) => s.specialization_name).join(", ") || "",
    degree: doc.degree,
    clinic: doc.clinic,
    licenseNumber: doc.licenseNumber,
    status: doc.status,
    rating: doc.rating || 0,
    avatar_image: doc.user?.details?.avatar_image || null,
  }));
};

export const updateDoctorService = async (id: string, data: UpdateDoctorInput) => {
  const doctor = await Doctor.findByPk(id, {
    include: [
      {
        model: AuthUser,
        as: "user",
        include: [{ model: UserDetails, as: "details" }],
      },
      {
        model: Specialization,
        as: "specializations",
      },
    ],
  });

  if (!doctor) throw new Error("Doctor not found");

  // Update Doctor
  await doctor.update({
    degree: data.degree,
    experience_years: data.experience,
    clinic: data.clinic,
    licenseNumber: data.licenseNumber,
    status: data.status,
  });

  // Update AuthUser
  if (doctor.user && data.email) {
    await doctor.user.update({ email: data.email });
  }

  // Update UserDetails
  await UserDetails.update(
  {
    full_name: data.fullName,
    phone: data.phone,
    avatar_image: data.avatar_image,
  },
  { where: { user_id: doctor.user_id } }
);

  if (data.specialization) {
    await doctor.setSpecializations(data.specialization);
  }

  return doctor;
};

export const deleteDoctorService = async (id: string) => {
  // Tìm bác sĩ theo id
  const doctor = await Doctor.findByPk(id);
  if (!doctor) throw new Error("Doctor not found");

  // Xóa chuyên khoa liên quan (bảng trung gian)
  await DoctorSpecialization.destroy({ where: { doctor_id: doctor.doctor_id } });

  // Xóa thông tin userDetails
  await UserDetails.destroy({ where: { user_id: doctor.user_id } });

  // Xóa user (AuthUser)
  await AuthUser.destroy({ where: { user_id: doctor.user_id } });

  // Xóa bác sĩ
  await doctor.destroy();

  return true;
};