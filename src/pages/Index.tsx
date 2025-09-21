import HeroSection from "@/components/HeroSection";
import SkillsAssessment from "@/components/SkillsAssessment";
import CareerRecommendations from "@/components/CareerRecommendations";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <SkillsAssessment />
      <CareerRecommendations />
    </main>
  );
};

export default Index;