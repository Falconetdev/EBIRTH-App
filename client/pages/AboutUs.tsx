import WhoWeAreSection from "@/components/home/WhoWeAreSection";
import StatsSection from "@/components/home/StatsSection";
import JoinCommunitySection from "@/components/course-details/JoinCommunitySection";
import ContactSection from "@/components/home/ContactSection";
import MissionComponent from "@/components/about-us/Mission";
import PageLayout from "@/components/layout/PageLayout";
import FeedbackSection from "@/components/home/FeedbackSection";

const AboutUs = () => {
  return (
    <PageLayout mainClassName="pt-24">
      
      <WhoWeAreSection />
      <StatsSection />
      <MissionComponent />
      <JoinCommunitySection />
      <FeedbackSection />
      <ContactSection />
    </PageLayout>
  );
};

export default AboutUs;