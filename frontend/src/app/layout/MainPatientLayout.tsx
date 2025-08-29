import { type ReactNode } from "react";
import { Header } from "../../widgets/header";
import Footer from "../../widgets/footer/ui/Footer";

interface MainPatientLayoutProps {
  children: ReactNode;
}

const MainPatientLayout: React.FC<MainPatientLayoutProps> = ({ children }) => (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
)

export default MainPatientLayout;

