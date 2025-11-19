import React from 'react'
import Hero from '@/components/trading-mentorship/hero'
import VideoSection from '@/components/trading-mentorship/VideoSection'
import PageLayout from '@/components/layout/PageLayout'
import WhatsAppBanner from '@/components/home/WhatsAppBanner'
import OurNewLessons from '@/components/trading-mentorship/OurNewLessons'
import FeedbackSection from '@/components/home/FeedbackSection'
import JoinCommunitySection from '@/components/course-details/JoinCommunitySection'

const TradingMentorship = () => {
  return (
    <div>
        <PageLayout mainClassName="pt-12">
        <Hero />
        <VideoSection />
        <WhatsAppBanner />
        <OurNewLessons />
        <FeedbackSection    />
        <JoinCommunitySection   />
        </PageLayout>
    </div>
  )
}

export default TradingMentorship