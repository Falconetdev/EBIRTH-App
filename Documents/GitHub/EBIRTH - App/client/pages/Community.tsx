import FeedbackSection from '@/components/community/Feedback'
import CommunityHero from '@/components/community/hero'
import JoinCommunitySection from '@/components/course-details/JoinCommunitySection'
import EventsSection from '@/components/home/EventsSection'
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
        <CommunityHero />
        <JoinCommunitySection />
        <FeedbackSection />
        <EventsSection events={events} />
    </div>
  )
}

export default Community