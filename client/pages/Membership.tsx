import Pricing from '@/components/membership/Pricing'
import React from 'react'
import PageLayout from '@/components/layout/PageLayout'
import Faq from '@/components/membership/Faq'
import FeedbackSection from '@/components/home/FeedbackSection'
import JoinCommunitySection from '@/components/course-details/JoinCommunitySection'

const Membership = () => {
  return (
    <div>
        <PageLayout mainClassName="pt-24">
        <Pricing />
        <Faq />
        <FeedbackSection />
        <JoinCommunitySection   />



        </PageLayout>
    </div>
  )
}

export default Membership