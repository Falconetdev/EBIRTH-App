import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  FolderOpen,
  Settings,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Blogs",
    path: "/admin/blogs",
    icon: FileText,
  },
  {
    name: "Events",
    path: "/admin/events",
    icon: Calendar,
  },
  {
    name: "Resources",
    path: "/admin/resources",
    icon: FolderOpen,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64
          bg-gradient-to-b from-[#1a0b2e] to-[#0d0520]
          border-r border-white/10
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-[#FFE500]">
            eBirth Admin
          </h1>
          <p className="text-sm text-white/60 mt-1">Content Management</p>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${
                    active
                      ? "bg-[#FFE500] text-[#090014] font-semibold shadow-lg shadow-[#FFE500]/20"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <p className="text-xs text-white/40 text-center">
            eBirth LMS © 2025
          </p>
        </div>
      </aside>
    </>
  );
}
