import { Footer } from "@/components/site/Footer";
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

/** Tudo abaixo do topo. Fica num arquivo separado para o topo aparecer mais rápido. */
const IndexBelow = () => (
  <>
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
  </>
);

export default IndexBelow;
