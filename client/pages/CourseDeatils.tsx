import { useState } from "react";

import CourseHero from "@/components/course-details/CourseHero";
import CourseTabs from "@/components/course-details/CourseTabs";
import CourseSidebar from "@/components/course-details/CourseSidebar";
import OtherCoursesSection from "@/components/course-details/OtherCoursesSection";
import CourseFeedbackSection from "@/components/course-details/CourseFeedbackSection";
import JoinCommunitySection from "@/components/course-details/JoinCommunitySection";
import type { TabKey } from "@/components/course-details/types";
import PageLayout from "@/components/layout/PageLayout";

const highlights = [
  "Complete Training: Fundamentals to Advanced Trading concepts with spot focus",
  "Knowledge Packs: Recordings, notes, tools, and strategy models",
  "Mentorship: Live Q&A, community guidance, and weekly sessions",
  "Trading Labs: Live market case studies, signal breakdowns, and real-time feedback",
  "Bonus Access: VIP events, trading clubs, and exclusive partner sessions",
];

const courseContent = [
  {
    program: "Basic Course: Trading Foundations Membership",
    days: [
      {
        title: "Day 1: Introduction to Trading",
        points: [
          "Overview of trading basics and course expectations",
          "Introduction to Trading View for market analysis",
          "Market structure: Understanding market structure and its importance",
          "Binance: Setting up and navigating a Binance account",
        ],
      },
      {
        title: "Day 2: Advanced Market Analysis",
        description: "Macro and micro structure mapping with guided live chart breakdowns.",
      },
      {
        title: "Day 3: Technical Analysis and Indicators",
        description: "Indicator stacking, momentum confirmation, and backtesting workflows.",
      },
      {
        title: "Day 4: Fibonacci Techniques",
        description: "Applying Fibonacci ratios for precision entries and exits.",
      },
      {
        title: "Day 5: RSI, Volume, and Supply & Demand",
        description: "Volume profiling, divergence spotting, and liquidity zone identification.",
      },
      {
        title: "Day 6: Management Techniques",
        description: "Risk allocation templates, trade journaling, and review cadences.",
      },
      {
        title: "Day 7: Advanced Concepts and Psychology",
        description: "Mindset calibration for sustainable growth and disciplined execution.",
      },
      {
        title: "Day 8: Advanced Concepts and Psychology",
        description: "Scenario planning, stress testing, and bias mitigation drills.",
      },
      {
        title: "Day 9: Advanced Concepts and Psychology",
        description: "Live coaching on emotional resilience and post-trade analysis loops.",
      },
      {
        title: "Day 10: Advanced Concepts and Psychology",
        description: "Capstone huddles, strategy refinements, and performance targets.",
      },
    ],
  },
  {
    program: "Advanced Course: Advanced Trading Membership",
    days: [
      {
        title: "Day 11: Advanced Market Analysis",
        description: "High-timeframe confluence mapping with institutional order flow cues.",
      },
      {
        title: "Day 12: Technical Analysis and Indicators",
        description: "Algorithmic confirmation stacks and rule-based execution frameworks.",
      },
      {
        title: "Day 13: Fibonacci Techniques",
        description: "Advanced Fibonacci clusters and harmonic pattern validation.",
      },
      {
        title: "Day 14: RSI, Volume, and Supply & Demand",
        description: "Liquidity hunt recognition and volume delta decision-making.",
      },
      {
        title: "Day 15: Management Techniques",
        description: "Portfolio hedging, scaling protocols, and KPI scorecards.",
      },
      {
        title: "Day 16: Advanced Concepts and Psychology",
        description: "Peak-performance routines and mindset audits for consistency.",
      },
      {
        title: "Day 17: Advanced Concepts and Psychology",
        description: "Edge refinement through scenario simulation and debrief playbooks.",
      },
      {
        title: "Day 18: Advanced Concepts and Psychology",
        description: "Collaborative trade reviews with mentor-led improvement plans.",
      },
      {
        title: "Day 19: Advanced Concepts and Psychology",
        description: "Automation readiness checks and decision-tree reinforcement.",
      },
      {
        title: "Day 20: Advanced Concepts and Psychology",
        description: "Resilience conditioning, recovery strategies, and focus sprints.",
      },
      {
        title: "Day 21: Advanced Concepts and Psychology",
        description: "Showcase day: Present strategy, receive mentor feedback, and set next milestones.",
      },
    ],
  },
];

const benefitGrid = [
  {
    heading: "Community Access",
    detail: "Private Discord, signal rooms, and daily mentor huddles to keep momentum going.",
  },
  {
    heading: "Resource Vault",
    detail: "Downloadable playbooks, execution checklists, and indicator packs updated every month.",
  },
  {
    heading: "Accountability Pods",
    detail: "Weekly performance reviews with senior traders to refine risk and mindset disciplines.",
  },
  {
    heading: "Career Pathways",
    detail: "Introductions to prop desks, internship briefs, and partner brokerage onboarding support.",
  },
];

const additionalBenefits = {
  lead: "Advanced Course එක complete කරන ඔබට Lifetime Access ලබාදෙන exclusive benefits මෙන්න:",
  bullets: [
    {
      title: "Live Trading Club",
      detail:
        "Real-time live trading sessions සහ discussions වල join වෙන්න! Community එකේ එකට grow වන්න!",
    },
    {
      title: "Physical Revisions",
      detail:
        "Weekly in-person revision sessions එකතු කරලා තියෙන නිසා. Knowledge එක refresh කරන best way එක.",
    },
    {
      title: "VIP Signals & Market Updates",
      detail:
        "Exclusive trading signals සහ market insights ලබාගන්න. Smart trading decisions වලට.",
    },
    {
      title: "Support and Call Center Help",
      detail:
        "Ongoing support එක assistance එකක් ලබාගන්න access තියෙනවා. You're never alone in your trading journey!",
    },
  ],
};

const testimonials = [
  {
    id: "student-1",
    sinhala:
      "eBirth Academy එකේ practical approach එක සහ real-world examples හරහා මගේම business එකක් නිවැරදිව start කරන්න confident feel වුණා.",
    english:
      "The practical guidance and relatable case studies helped me launch my own business successfully.",
    name: "Dinuka Herath Hulugalla",
    role: "Business Student",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-2",
    sinhala:
      "Trading එකක් දැනට start කරනවානම් හෝ dream එකක් තියෙනවානම් eBirth Academy එකෙන් ලැබෙන mentorship එකෙන් real confidence එකක් හදාගන්න පුළුවන්.",
    english:
      "Practical sessions and knowledge-packed tools gave me the courage to take my business idea live.",
    name: "Dinuka Herath Hulugalla",
    role: "Business Student",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "student-3",
    sinhala:
      "eBirth ටෙ mentorship එකෙන් daily guide එකක් ලැබුවා. Advanced strategies explain කරලා trading journey එකත් power up වෙලා.",
    english:
      "Big thanks to the eBirth team for showing the roadmap to scale my journey with confidence.",
    name: "Dinuka Herath Hulugalla",
    role: "Business Student",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
];

const otherCourses = [
  { price: 38000, originalPrice: 50000, discount: 24 },
  { price: 38000, originalPrice: 50000, discount: 24 },
  { price: 38000, originalPrice: 50000, discount: 24 },
  { price: 38000, originalPrice: 50000, discount: 24 },
];

const CourseDeatils = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <PageLayout
      className="bg-[#120625] text-white"
      mainClassName="relative isolate overflow-hidden px-4 pb-24 pt-24 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2f0c54] via-[#190636] to-[#0a021c]"></div>
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(255,215,0,0.25),_rgba(18,6,37,0))] blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-[-10%] left-[-8%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(140,82,255,0.25),_rgba(18,6,37,0))] blur-3xl"></div>

      <div className="mx-auto max-w-6xl space-y-14">
        <CourseHero />

        <div className="grid w-full gap-2 lg:grid-cols-[1.7fr_1fr]">
          <CourseTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            highlights={highlights}
            courseContent={courseContent}
            additionalBenefits={additionalBenefits}
            benefitGrid={benefitGrid}
          />

          <aside className="space-y-8 lg:pl-4 lg:max-w-sm">
            <CourseSidebar />
          </aside>
        </div>

        <OtherCoursesSection otherCourses={otherCourses} />
      </div>

      <CourseFeedbackSection testimonials={testimonials} />

      <JoinCommunitySection />
    </PageLayout>
  );
};

export default CourseDeatils;