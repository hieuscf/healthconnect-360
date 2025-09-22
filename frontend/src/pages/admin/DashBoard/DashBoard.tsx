import React from "react";
import { OverviewDashboard } from "../../../widgets/OverviewDashBoard/ui/OverviewDashboard";

const DashBoard = () => {
  return (
    <div>
      <OverviewDashboard />
      Số lượng bệnh nhân, bác sĩ, cuộc hẹn, doanh thu. Biểu đồ thống kê: lượt
      đặt lịch theo ngày/tháng, chuyên khoa, mức độ hoạt động. Thông báo nhanh
      (bác sĩ sắp nghỉ, thuốc sắp hết, phản hồi quan trọng).
    </div>
  );
};

export default DashBoard;
