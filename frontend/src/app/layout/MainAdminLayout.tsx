import { type ReactNode } from "react";
import AdminSidebar from "../../widgets/admin-sidebar/ui/AdminSidebar";
import { Topbar } from "../../widgets/admin-topbar/AdminTopbar";

interface MainAdminLayoutProps {
  children: ReactNode;
}

const MainAdminLayout: React.FC<MainAdminLayoutProps> = ({ children }) => (
  <div className="flex h-screen">
    {/* Sidebar bên trái */}
    <AdminSidebar />

    {/* Phần bên phải gồm Topbar và nội dung */}
    <div className="flex flex-col flex-1">
      {/* Topbar nằm ngang trên cùng */}
      <Topbar />

      {/* Nội dung chính */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  </div>
);

export default MainAdminLayout;

