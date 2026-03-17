import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EpisodesSection from "@/components/EpisodesSection";
import MeetHostSection from "@/components/MeetHostSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <EpisodesSection />
      <MeetHostSection />
    </div>
  );
};

export default Index;
