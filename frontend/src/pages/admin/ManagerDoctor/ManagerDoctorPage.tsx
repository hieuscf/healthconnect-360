import { User } from "lucide-react";
import Header from "../../../shared/ui/AdminHeader/AdminHeader";
import ManagerDoctor from "../../../features/Admin/manager/Doctor/ui/ManagerDoctor";

const ManagerDoctorPage = () => {
  return (
    <div className=" bg-white space-y-6">
      <Header
        title="Quản lý Bác sĩ"
        icon={User}
        onImport={() => console.log("Import doctor data")}
        onExport={() => console.log("Export doctor data")}
      />
      <ManagerDoctor />
    </div>
  );
};

export default ManagerDoctorPage;
