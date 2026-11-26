import { lazy, Suspense } from "react";
import { Navbar } from "@/components/site/Navbar";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Hero } from "@/components/home/Hero";

// O topo carrega primeiro; o resto da página vem em seguida, em paralelo.
const IndexBelow = lazy(() => import("./IndexBelow"));

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-sans">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
        <IndexBelow />
      </Suspense>
    </main>
  );
};

export default Index;
