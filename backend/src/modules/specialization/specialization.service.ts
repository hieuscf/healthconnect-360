import { where } from "sequelize";
import Specialization from "./specialization.model";

export const getListSpecializationServices = async () => {
  try {
    const data = await Specialization.findAll({
    attributes: ["specialization_id", "specialization_name"], // chọn cột cần thiết
    where: { active: true }, // lọc theo trạng thái
    order: [["specialization_name", "ASC"]], // sắp xếp theo specialization_name
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching specializations:", error);
    return { success: false, message: "Không thể lấy danh sách chuyên khoa" };
  }
};