import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";

const CourseSidebar = () => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#A78BFA] p-6 shadow-[0_25px_60px_rgba(21,5,42,0.45)]">
      <div className="mb-6 flex flex-col items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=600&q=80"
          alt="Course preview"
          className="h-50 w-100 rounded-2xl object-cover"
        />
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">Investment</p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-[#FFD700]">රු. 38,000</span>
            <span className="text-base text-white/40 line-through">රු. 48,000</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 text-sm font-medium text-white/70">
        <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
          <Clock className="h-5 w-5 text-[#FFD700]" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Duration</p>
            <p>7 consecutive days (Saturdays)</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
          <Clock className="h-5 w-5 text-[#FFD700]" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Time</p>
            <p>9.00 AM to 4.00 PM (Online)</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
          <MapPin className="h-5 w-5 text-[#FFD700]" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Mode</p>
            <p>Live Zoom Sessions + Learning Portal Access</p>
          </div>
        </div>
      </div>

      <Button className="mt-6 w-full rounded-full bg-[#FFD700] py-4 text-base font-semibold text-black transition hover:bg-[#FFC700]">
        Enroll Now
      </Button>
    </div>
  );
};

export default CourseSidebar;
