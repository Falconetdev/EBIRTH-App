import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#1a0b2e]/80 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Breadcrumb or Page Title - can be dynamic */}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-white/90">
            {/* This can be made dynamic based on route */}
          </h2>
        </div>

        {/* Right Side - User Info & Actions */}
        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#FFE500] flex items-center justify-center">
              <User size={16} className="text-[#090014]" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">
                {user?.email?.split("@")[0] || "Admin"}
              </p>
              <p className="text-xs text-white/50">{user?.email}</p>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-red-500/20 hover:border-red-500 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
