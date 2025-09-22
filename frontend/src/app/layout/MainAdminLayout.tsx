import { type ReactNode } from "react";
import AdminSidebar from "../../widgets/admin-sidebar/ui/AdminSidebar";
import { Topbar } from "../../widgets/admin-topbar/AdminTopbar";

interface MainAdminLayoutProps {
  children: ReactNode;
}

const MainAdminLayout: React.FC<MainAdminLayoutProps> = ({ children }) => (
  <div className="flex h-screen overflow-hidden">
    {/* Sidebar cố định full height */}
    <div className="h-full">
      <AdminSidebar />
    </div>

    {/* Phần bên phải */}
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      {/* Topbar */}
      <Topbar />

      {/* Nội dung chính có scroll riêng */}
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  </div>
);

export default MainAdminLayout;
