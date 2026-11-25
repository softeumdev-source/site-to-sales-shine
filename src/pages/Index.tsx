import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Hero } from "@/components/home/Hero";
import { Formats } from "@/components/home/Formats";
import { Validators } from "@/components/home/Validators";
import { AiSeller } from "@/components/home/AiSeller";
import { Integrations } from "@/components/home/Integrations";
import { Segments } from "@/components/home/Segments";
import { Steps } from "@/components/home/Steps";
import { EmailFlow } from "@/components/home/EmailFlow";
import { Faq } from "@/components/home/Faq";
import { Demo } from "@/components/home/Demo";

const Index = () => {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Softeum",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "A Softeum automatiza o recebimento de pedidos por e-mail e WhatsApp: lê PDF, planilha, XML, texto, foto e áudio, valida cada pedido e lança no ERP via API ou arquivo de importação. Inclui uma IA vendedora que atende clientes no WhatsApp.",
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
      <Formats />
      <Steps />
      <Validators />
      <EmailFlow />
      <AiSeller />
      <Integrations />
      <Segments />
      <Faq />
      <Demo />
      <Footer />
    </main>
  );
};

export default Index;
