import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090014] via-[#1a0b2e] to-[#2c0f42]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <TopBar />

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
