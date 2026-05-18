import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Problems } from "@/components/site/Problems";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Benefits } from "@/components/site/Benefits";
import { Features } from "@/components/site/Features";
import { DocumentTypes } from "@/components/site/DocumentTypes";
import { WhatsAppSection } from "@/components/site/WhatsApp";

import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";

const Index = () => {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Softeum",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "O Softeum automatiza o processamento de pedidos recebidos por e-mail. Empresas que recebem pedidos em PDF transformam esses arquivos em pedidos prontos para o ERP em segundos, com IA, validação automática, integração via API e exportação personalizada.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL", description: "Demo gratuita e sem compromisso" },
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
      <WhatsAppSection />
      <Benefits />
      <Features />
      <DocumentTypes />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
