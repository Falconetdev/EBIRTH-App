import { useState } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { User, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { user } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/60">Manage your admin account settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab("profile")}
          className={`
            px-6 py-3 font-medium transition-all duration-200
            ${
              activeTab === "profile"
                ? "text-[#FFE500] border-b-2 border-[#FFE500]"
                : "text-white/60 hover:text-white"
            }
          `}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`
            px-6 py-3 font-medium transition-all duration-200
            ${
              activeTab === "security"
                ? "text-[#FFE500] border-b-2 border-[#FFE500]"
                : "text-white/60 hover:text-white"
            }
          `}
        >
          Security
        </button>
      </div>

      {/* Content */}
      <div className="max-w-2xl">
        {activeTab === "profile" && (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm space-y-6">
            <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>

            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFE500] to-[#FFC700] flex items-center justify-center">
                <User size={32} className="text-[#090014]" />
              </div>
              <div>
                <p className="text-white font-medium">{user?.email?.split("@")[0] || "Admin"}</p>
                <p className="text-white/60 text-sm">Administrator</p>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-white/60 flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white">
                {user?.email || "Not available"}
              </div>
              <p className="text-xs text-white/40">
                This is your login email address
              </p>
            </div>

            {/* User ID */}
            <div className="space-y-2">
              <label className="text-sm text-white/60 flex items-center gap-2">
                <Shield size={16} />
                User ID
              </label>
              <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-sm">
                {user?.uid || "Not available"}
              </div>
              <p className="text-xs text-white/40">
                Your unique Firebase user identifier
              </p>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm space-y-6">
            <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>

            {/* Password Change Info */}
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-blue-400 text-sm">
                Password management is handled through Firebase Authentication. To change your password, please use the Firebase Console or contact your system administrator.
              </p>
            </div>

            {/* Account Status */}
            <div className="space-y-2">
              <label className="text-sm text-white/60">Account Status</label>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-white">Active</span>
              </div>
            </div>

            {/* Last Login - would need to implement tracking */}
            <div className="space-y-2">
              <label className="text-sm text-white/60">Last Login</label>
              <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white">
                {user?.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleString()
                  : "Not available"}
              </div>
            </div>

            {/* Account Created */}
            <div className="space-y-2">
              <label className="text-sm text-white/60">Account Created</label>
              <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white">
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleString()
                  : "Not available"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
