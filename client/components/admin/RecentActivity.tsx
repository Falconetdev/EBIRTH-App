import { FileText, Calendar, FolderOpen, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  id: string;
  type: "blog" | "event" | "resource";
  title: string;
  timestamp: any;
  action: "created" | "updated";
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  // Sort by timestamp and take top 10
  const sortedActivities = [...activities]
    .sort((a, b) => {
      const timeA = a.timestamp?.toDate?.() || new Date(0);
      const timeB = b.timestamp?.toDate?.() || new Date(0);
      return timeB.getTime() - timeA.getTime();
    })
    .slice(0, 10);

  const getIcon = (type: string) => {
    switch (type) {
      case "blog":
        return FileText;
      case "event":
        return Calendar;
      case "resource":
        return FolderOpen;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "blog":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "event":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "resource":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "Recently";
    try {
      const date = timestamp.toDate();
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  if (sortedActivities.length === 0) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
        <div className="text-center text-white/40 py-8">
          No recent activity to display
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>

      <div className="space-y-4">
        {sortedActivities.map((activity) => {
          const Icon = getIcon(activity.type);
          const colorClass = getTypeColor(activity.type);

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
            >
              {/* Icon */}
              <div className={`p-2 rounded-lg border ${colorClass}`}>
                <Icon size={20} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate group-hover:text-[#FFE500] transition-colors">
                      {activity.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 capitalize">
                        {activity.type}
                      </span>
                      <span className="text-xs text-white/40">•</span>
                      <span className="text-xs text-white/60 capitalize">
                        {activity.action}
                      </span>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-1 text-white/40 text-xs whitespace-nowrap">
                    <Clock size={12} />
                    <span>{formatTimestamp(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
