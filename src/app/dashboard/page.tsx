import Sidebar from "@/components/Sidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7FAF8]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-hidden">
        <DashboardContent />
      </main>
    </div>
  );
}
