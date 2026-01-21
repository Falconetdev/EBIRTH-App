import WhoWeAreSection from "@/components/home/WhoWeAreSection";
import StatsSection from "@/components/home/StatsSection";
import JoinCommunitySection from "@/components/course-details/JoinCommunitySection";
import ContactSection from "@/components/home/ContactSection";
import MissionComponent from "@/components/about-us/Mission";
import PageLayout from "@/components/layout/PageLayout";
import FeedbackSection from "@/components/home/FeedbackSection";
import ScrollReveal from "@/components/ScrollReveal";

const AboutUs = () => {
  return (
    <PageLayout mainClassName="pt-24">
      
      <ScrollReveal>
        <WhoWeAreSection />
      </ScrollReveal>

      <ScrollReveal>
        <StatsSection />
      </ScrollReveal>

      <ScrollReveal>
        <MissionComponent />
      </ScrollReveal>

      <ScrollReveal>
        <JoinCommunitySection />
      </ScrollReveal>

      <ScrollReveal>
        <FeedbackSection />
      </ScrollReveal>

      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
    </PageLayout>
  );
};

export default AboutUs;