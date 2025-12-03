import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const AppLayout = ({ children, showSidebar = true }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {showSidebar && <Sidebar />}
      <TopBar />
      <main className={showSidebar ? "lg:ml-64 pt-16 lg:pt-0" : "pt-16"}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
