import { lazy, Suspense } from "react";
import Loader from "@/components/landing/loader";

// lazy-loaded components for better performance
const HeroSection = lazy(() => import("@/components/landing/hero-section"));
const BenefitsSection = lazy(() => import("@/components/landing/benefits-section"));
const TestimonialSection = lazy(() => import("@/components/landing/testimonial-section"));
const CTASection = lazy(() => import("@/components/landing/cta-section"));

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow">
        <Suspense fallback={<Loader />}>
          <HeroSection />
          <BenefitsSection />
          <CTASection 
            title="Quer saber como isso se aplica ao seu caso?"
            subtitle="Responda poucas perguntas e receba um plano personalizado para sua empresa"
            buttonText="Quero minha simulação gratuita"
            buttonVariant="primary"
            redirect="/not-logged/simulations"
          />
          <TestimonialSection />
          <CTASection 
            title="Está pronto para proteger o que você construiu?"
            subtitle={<>Solicite agora sua <span className="text-emerald-500 font-medium">simulação gratuita</span> e descubra como a W1 pode ajudar você a economizar, crescer e proteger o seu patrimônio.</>}
            buttonText="Começar agora"
            buttonVariant="light"
            redirect="/auth/first-access"
          />
        </Suspense>
      </main>
    </div>
  );
};

export default Landing;