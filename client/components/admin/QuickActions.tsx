import { useNavigate } from "react-router-dom";
import { Plus, FileText, Calendar, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      label: "New Blog Post",
      icon: FileText,
      path: "/admin/blogs/new",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:shadow-blue-500/50",
    },
    {
      label: "New Event",
      icon: Calendar,
      path: "/admin/events/new",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:shadow-purple-500/50",
    },
    {
      label: "New Resource",
      icon: FolderOpen,
      path: "/admin/resources/new",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:shadow-green-500/50",
    },
  ];

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className={`
                group relative overflow-hidden
                flex items-center justify-center gap-3
                p-6 rounded-xl
                bg-gradient-to-br ${action.color}
                border border-white/20
                hover:scale-105 hover:shadow-xl ${action.hoverColor}
                transition-all duration-300
                text-white font-semibold
              `}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

              <Plus size={20} className="relative z-10" />
              <span className="relative z-10">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
