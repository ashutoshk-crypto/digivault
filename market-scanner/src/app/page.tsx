import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import DefenseInDepth from "@/components/DefenseInDepth";
import OperationsExcellence from "@/components/OperationsExcellence";
import WhoWeServe from "@/components/WhoWeServe";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <Hero />
      <WhyChooseUs />
      <DefenseInDepth />
      <OperationsExcellence />
      <WhoWeServe />
      <CTABanner />
      <Footer />
    </div>
  );
}