import { FloatingChatBot } from "@/components/FloatingChatBot";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>

      <div className="flex h-screen overflow-hidden bg-[#F7FAF8]">
        <FloatingChatBot />
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
