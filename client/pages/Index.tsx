import HeroSection from "@/components/home/HeroSection";
import WhoWeAreSection from "@/components/home/WhoWeAreSection";
import StatsSection from "@/components/home/StatsSection";
import NewLessonsSection from "@/components/home/NewLessonsSection";
import WhatsAppBanner from "@/components/home/WhatsAppBanner";
import LearningOpportunitiesSection from "@/components/home/LearningOpportunitiesSection";
import EventsSection from "@/components/home/EventsSection";
import FeedbackSection from "@/components/home/FeedbackSection";
import ContactSection from "@/components/home/ContactSection";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import PageLayout from "@/components/layout/PageLayout";
import DecorativeCoins from "@/components/layout/DecorativeCoins";

export default function Index() {
  const images = [
    "/students/s1.svg",
    "/students/s2.svg",
    "/students/s3.svg",
    "/students/s4.svg",
    "/students/s5.svg",
  ];
  const lessons = [
    {
      id: 1,
      title: "Business Startup Masterclass",
      description:
        "business එකක් scratch එකෙන් build කරන්න සහ scale කිරීමේ සරලම උපදෙස් ලබාගන්න.",
      lessonTag: "Lesson 01",
      platform: "Watch on YouTube",
    },
    {
      id: 2,
      title: "Business Startup Masterclass",
      description:
        "business growth road map එකක් සහ actionable trading frameworks එකටම ලබාගන්න.",
      lessonTag: "Lesson 02",
      platform: "Watch on YouTube",
    },
  ];
  const memberships = [
    {
      id: "online",
      title: "Foundations + Advanced Trading Membership - Online",
      price: "රු. 38,000",
      oldPrice: "රු. 48,000",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
      description:
        "Online membership package එක තුළින් trading fundamentals සිට pro level strategies දක්වා පියවරෙන් පියවර ඉගෙන ගන්න.",
    },
    {
      id: "lifetime",
      title: "Foundations + Advanced Trading Membership - Online",
      price: "රු. 38,000",
      oldPrice: "රු. 48,000",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
      description:
        "Real-time coaching sessions, signal breakdowns සහ lifetime community access එකත් සමඟ consistency එක ගොඩන්න.",
    },
  ];
  const events = [
    {
      id: "event-1",
      title: "INNER RACERS YOUTUBE LIVE LESSONS & LIVE TRADING",
      description:
        "ඔබත් \"INNER RACERS\" YouTube එකට සම්බන්ධ වෙලා අපේ LIVE TRADING sessions වලින් real-time දැනුම ලබාගන්න.",
      schedule: "Every Saturday",
      time: "8.00 PM",
      location: "YouTube Live",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "event-2",
      title: "INNER RACERS YOUTUBE LIVE LESSONS & LIVE TRADING",
      description:
        "අපගේ LIVE TRADING sessions join වෙලා strategy breakdowns, Q&A සහ mentorship එකක් එක්වරටම ලබාගන්න.",
      schedule: "Every Saturday",
      time: "8.00 PM",
      location: "Hybrid Studio",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "event-3",
      title: "INNER RACERS YOUTUBE LIVE LESSONS & LIVE TRADING",
      description:
        "Trading community එකක් වෙලා එකට ඉගෙන ගන්න අපේ mentorship crew එකත් සමඟ hands-on market reviews එකට connect වෙන්න.",
      schedule: "Every Saturday",
      time: "8.00 PM",
      location: "eBirth HQ",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    },
  ];
  return (
    <PageLayout className="bg-[#1a0b2e] bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent">
      {/* <DecorativeCoins /> */}
      <HeroSection images={images} />

      <WhoWeAreSection />
 
      <StatsSection />

      <NewLessonsSection lessons={lessons} />

      <WhatsAppBanner />

      <LearningOpportunitiesSection memberships={memberships} />

      <EventsSection events={events} />

      <div className="bg-[#1a0b2e]">
        <FeedbackSection />
      </div>

      <ContactSection />

      <WhatsAppButton />
    </PageLayout>
  );
}
