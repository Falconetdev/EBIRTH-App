import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import StatsCards from "@/components/admin/StatsCards";
import RecentActivity from "@/components/admin/RecentActivity";
import QuickActions from "@/components/admin/QuickActions";

interface ActivityItem {
  id: string;
  type: "blog" | "event" | "resource";
  title: string;
  timestamp: any;
  action: "created" | "updated";
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogs: { total: 0, recent: 0 },
    events: { total: 0, recent: 0 },
    resources: { total: 0, recent: 0 },
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get one week ago timestamp
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Listen to blogs
    const blogsQuery = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubBlogs = onSnapshot(blogsQuery, (snapshot) => {
      const total = snapshot.docs.length;
      const recent = snapshot.docs.filter((doc) => {
        const createdAt = doc.data().createdAt?.toDate();
        return createdAt && createdAt >= oneWeekAgo;
      }).length;

      setStats((prev) => ({ ...prev, blogs: { total, recent } }));

      // Add to activity
      const blogActivities = snapshot.docs.slice(0, 5).map((doc) => ({
        id: doc.id,
        type: "blog" as const,
        title: doc.data().title,
        timestamp: doc.data().createdAt,
        action: "created" as const,
      }));

      setRecentActivity((prev) => {
        const filtered = prev.filter((item) => item.type !== "blog");
        return [...filtered, ...blogActivities];
      });
    });

    // Listen to events
    const eventsQuery = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const unsubEvents = onSnapshot(eventsQuery, (snapshot) => {
      const total = snapshot.docs.length;
      const recent = snapshot.docs.filter((doc) => {
        const createdAt = doc.data().createdAt?.toDate();
        return createdAt && createdAt >= oneWeekAgo;
      }).length;

      setStats((prev) => ({ ...prev, events: { total, recent } }));

      // Add to activity
      const eventActivities = snapshot.docs.slice(0, 5).map((doc) => ({
        id: doc.id,
        type: "event" as const,
        title: doc.data().title,
        timestamp: doc.data().createdAt,
        action: "created" as const,
      }));

      setRecentActivity((prev) => {
        const filtered = prev.filter((item) => item.type !== "event");
        return [...filtered, ...eventActivities];
      });
    });

    // Listen to resources
    const resourcesQuery = query(collection(db, "resources"), orderBy("createdAt", "desc"));
    const unsubResources = onSnapshot(resourcesQuery, (snapshot) => {
      const total = snapshot.docs.length;
      const recent = snapshot.docs.filter((doc) => {
        const createdAt = doc.data().createdAt?.toDate();
        return createdAt && createdAt >= oneWeekAgo;
      }).length;

      setStats((prev) => ({ ...prev, resources: { total, recent } }));

      // Add to activity
      const resourceActivities = snapshot.docs.slice(0, 5).map((doc) => ({
        id: doc.id,
        type: "resource" as const,
        title: doc.data().title,
        timestamp: doc.data().createdAt,
        action: "created" as const,
      }));

      setRecentActivity((prev) => {
        const filtered = prev.filter((item) => item.type !== "resource");
        return [...filtered, ...resourceActivities];
      });

      setLoading(false);
    });

    return () => {
      unsubBlogs();
      unsubEvents();
      unsubResources();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/60">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/60">Welcome back! Here's your content overview.</p>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity */}
      <RecentActivity activities={recentActivity} />
    </div>
  );
}
