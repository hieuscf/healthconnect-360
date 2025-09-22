import React from "react";
import {
  BarChart3,
  LayoutGrid,
  ShoppingCart,
  Calendar,
  User,
  CheckSquare,
  FileText,
  Table2,
  FileType,
  MessageCircle,
  Headphones,
  Mail,
  Package,
  Shield,
  ChevronDown,
} from "lucide-react";
import { MenuSection } from "./MenuSection";
import { MenuItem } from "./MenuItem";
import { SubmenuItem } from "./SubmenuItem";
import { useSidebarStore } from "../model/useSidebarStore";
import { Link } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  useSidebarStore();

  return (
    <div className="w-64 bg-white h-screen shadow-lg border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <BarChart3 size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-outfit text-gray-800">HealthAdmin</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="py-4 overflow-y-auto max-h-screen">
        <MenuSection title="MENU">
          <MenuItem
            icon={LayoutGrid}
            label="DashBoard"
            menuKey={"dashboard"}
            to="/admin/dashboard"
          />
          <MenuItem
            icon={User}
            label="Quản lý người dùng"
            hasSubmenu
            menuKey="user"
          >
            <SubmenuItem label="Bệnh nhân" to="/admin/patient" />
            <SubmenuItem label="Bác sĩ" to="/admin/doctor" />
            <SubmenuItem label="Phân quyền" to="/admin/permission" />
          </MenuItem>
          <MenuItem
            icon={ShoppingCart}
            label="Thương mại điện tử"
            hasSubmenu
            menuKey="ecommerce"
          >
            <SubmenuItem label="Sản phẩm" to="/admin/user/patient" />
            <SubmenuItem label="Đơn hàng" to="/admin/user/patient" />
            <SubmenuItem label="Khách hàng" to="/admin/user/patient" />
          </MenuItem>

          <MenuItem icon={Calendar} label="Lịch" menuKey={"calendar"} />
        </MenuSection>

        <MenuSection title="HỖ TRỢ">
          <MenuItem icon={MessageCircle} label="Trò chuyện" menuKey={"chat"} />

          <MenuItem
            icon={Headphones}
            label="Hỗ trợ"
            hasSubmenu
            menuKey="support"
          >
            <SubmenuItem label="Vé đang mở" to="/admin/user/patient" />
            <SubmenuItem label="Vé đã đóng" to="/admin/user/patient" />
          </MenuItem>

          <MenuItem icon={Mail} label="Email" hasSubmenu menuKey="email">
            <SubmenuItem label="Hộp thư đến" to="/admin/user/patient" />
            <SubmenuItem label="Đã gửi" to="/admin/user/patient" />
            <SubmenuItem label="Nháp" to="/admin/user/patient" />
          </MenuItem>
        </MenuSection>
      </div>
    </div>
  );
};

export default AdminSidebar;
