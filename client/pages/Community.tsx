import FeedbackSection from '@/components/community/Feedback'
import CommunityHero from '@/components/community/hero'
import JoinCommunitySection from '@/components/course-details/JoinCommunitySection'
import EventsSection from '@/components/home/EventsSection'
import PageLayout from '@/components/layout/PageLayout'
import React from 'react'

const Community = () => {
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
    <div>
      <PageLayout mainClassName="pt-12">
          {/* Decorative background coins */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Left large peeking coin */}
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float absolute left-[-90px] top-[38%] hidden md:block h-64 w-64 -rotate-[14deg] opacity-35"
          style={{ animationDelay: '0.6s' }}
        />
        {/* Mid-right floating coin */}
        
        {/* Small accent above tabs */}
        <img
          src="/coin2.webp"
          alt="Decorative coin"
          className="coin-float absolute left-[54%] top-[22%] h-16 w-16 -translate-x-1/2 rotate-[22deg] opacity-25"
          style={{ animationDelay: '1.8s' }}
        />
        {/* Bottom subtle coin near parachute */}
        <img
          src="/coin2.webp"
          alt="Decorative coin"
          className="coin-float absolute left-[52%] bottom-[18%] h-14 w-14 -translate-x-1/2 rotate-[12deg] opacity-20"
          style={{ animationDelay: '2.2s' }}
        />
        {/* Lower-left faint coin */}
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float absolute left-[6%] bottom-[30%] h-24 w-24 rotate-[26deg] opacity-18"
          style={{ animationDelay: '1.4s' }}
        />
        {/* Top-right corner large coin */}
        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float absolute right-[-70px] top-[80px] hidden lg:block h-40 w-40 rotate-[-12deg] opacity-40"
          style={{ animationDelay: '0.9s' }}
        />
       
        {/* Top-left medium coin */}
        <img
          src="/coin2.webp"
          alt="Decorative coin"
          className="coin-float absolute left-[0%] top-[15%] h-[180px] w-[180px]  "
          style={{ animationDelay: '1.3s' }}
        />
        {/* Top center subtle small coin */}
        <img
          src="/coin4.webp"
          alt="Decorative coin"
          className="coin-float absolute left-1/2 top-[40%] h-25 w-25 -translate-x-1/2 rotate-[8deg] opacity-22"
          style={{ animationDelay: '1.9s' }}
        />

        <img
          src="/Bitcoin-PNG-removebg-preview.png"
          alt="Decorative coin"
          className="coin-float absolute right-[-70px] bottom-[70%] hidden lg:block h-60 w-60 rotate-[-12deg] opacity-40"
          style={{ animationDelay: '0.9s' }}
        />
      </div>
        <CommunityHero />
        <JoinCommunitySection />
        <FeedbackSection />
        <EventsSection events={events} />
      </PageLayout>
    </div>
  )
}

export default Community