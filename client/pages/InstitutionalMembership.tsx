import React from 'react'
import Packages from '@/components/institutional-membership/packages'
import PageLayout from '@/components/layout/PageLayout'
import FeedbackSection from '@/components/home/FeedbackSection'
import JoinCommunitySection from '@/components/course-details/JoinCommunitySection'

const InstitutionalMembership = () => {
  return (
    <div>
        <PageLayout mainClassName="pt-12">
          <Packages />  
          <FeedbackSection />
          <JoinCommunitySection  />
        </PageLayout>
    </div>
  )
}

export default InstitutionalMembership