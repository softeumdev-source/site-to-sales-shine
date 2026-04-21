import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Problems } from "@/components/site/Problems";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Benefits } from "@/components/site/Benefits";
import { Features } from "@/components/site/Features";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { FloatingCTA } from "@/components/site/FloatingCTA";
import { ScrollProgress } from "@/components/site/ScrollProgress";

const Index = () => {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Softeum",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Plataforma SaaS que utiliza IA para ler pedidos em PDF recebidos por e-mail e lançá-los automaticamente no ERP.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL", description: "Piloto gratuito de 15 dias" },
  };

  return (
    <main className="min-h-screen bg-background font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Problems />
      <HowItWorks />
      <Benefits />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
};

export default Index;
