import JoinCommunitySection from '@/components/course-details/JoinCommunitySection'
import Explore from '@/components/course/Explore'
import PublicCoursesSection from '@/components/course/PublicCoursesSection'
import FeedbackSection from '@/components/home/FeedbackSection'
import PageLayout from '@/components/layout/PageLayout'
import Faq from '@/components/membership/Faq'
import React from 'react'

const Course = () => {
  return (
    <div>
        <PageLayout mainClassName="pt-12">
          <PublicCoursesSection />
          <Explore />
          <Faq />
          <FeedbackSection />
          <JoinCommunitySection   />
        </PageLayout>
    </div>
  )
}

export default Course