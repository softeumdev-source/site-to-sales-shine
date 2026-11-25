import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Hero } from "@/components/home/Hero";
import { Formats } from "@/components/home/Formats";
import { Integrations } from "@/components/home/Integrations";
import { Segments } from "@/components/home/Segments";
import { Steps } from "@/components/home/Steps";
import { Faq } from "@/components/home/Faq";
import { Demo } from "@/components/home/Demo";
import { WhyAutomate } from "@/components/home/WhyAutomate";
import { EmailShowcase, WhatsAppShowcase } from "@/components/home/Channels";
import { CtaBand } from "@/components/home/CtaBand";
import { Features } from "@/components/home/Features";

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-sans">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <WhyAutomate />
      <Steps />
      <EmailShowcase />
      <CtaBand />
      <Formats />
      <WhatsAppShowcase />
      <Features />
      <Integrations />
      <Segments />
      <Faq />
      <Demo />
      <Footer />
    </main>
  );
};

export default Index;
