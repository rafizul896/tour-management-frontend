import HeroSection from "@/components/modules/HomePage/HeroSection";
import PopularDivisions from "@/components/modules/HomePage/PopularDivisions";
import FeaturedTours from "@/components/modules/HomePage/FeaturedTours";
import WhyChooseUs from "@/components/modules/HomePage/WhyChooseUs";
import HowItWorks from "@/components/modules/HomePage/HowItWorks";
import CtaSection from "@/components/modules/HomePage/CtaSection";

export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <PopularDivisions />
      <FeaturedTours />
      <WhyChooseUs />
      <HowItWorks />
      <CtaSection />
    </div>
  );
}
