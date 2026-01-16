import { FileText, Calendar, FolderOpen, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  stats: {
    blogs: { total: number; recent: number };
    events: { total: number; recent: number };
    resources: { total: number; recent: number };
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Blog Posts",
      total: stats.blogs.total,
      recent: stats.blogs.recent,
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      bgGlow: "bg-blue-500/10",
    },
    {
      title: "Events",
      total: stats.events.total,
      recent: stats.events.recent,
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      bgGlow: "bg-purple-500/10",
    },
    {
      title: "Resources",
      total: stats.resources.total,
      recent: stats.resources.recent,
      icon: FolderOpen,
      color: "from-green-500 to-green-600",
      bgGlow: "bg-green-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
          >
            {/* Glow effect */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 ${card.bgGlow} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500`} />

            <div className="relative z-10">
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.color} mb-4`}>
                <Icon size={24} className="text-white" />
              </div>

              {/* Stats */}
              <div className="space-y-1">
                <p className="text-sm text-white/60">{card.title}</p>
                <p className="text-4xl font-bold text-white">{card.total}</p>

                {/* Recent count */}
                {card.recent > 0 && (
                  <div className="flex items-center gap-1 text-[#FFE500] text-sm font-medium">
                    <TrendingUp size={16} />
                    <span>+{card.recent} this week</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
