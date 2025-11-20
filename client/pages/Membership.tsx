import Pricing from '@/components/membership/Pricing'
import React from 'react'
import PageLayout from '@/components/layout/PageLayout'
import Faq from '@/components/membership/Faq'
import FeedbackSection from '@/components/home/FeedbackSection'
import JoinCommunitySection from '@/components/course-details/JoinCommunitySection'

const Membership = () => {
  return (
    <div>
        <PageLayout mainClassName="pt-24 bg-[#1a0b2e] bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent">
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
        <Pricing />
        <Faq />
        <FeedbackSection />
        <JoinCommunitySection   />



        </PageLayout>
    </div>
  )
}

export default Membership