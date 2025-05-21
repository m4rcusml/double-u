import { Button } from "@/components/ui/button";
import { Shield, ChevronRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToNextSection = () => {
    // Smooth scroll to the benefits section
    const benefitsSection = document.querySelector('#benefits-section');
    if (benefitsSection) {
      benefitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-emerald-900 to-gray-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-600 rounded-full" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-600 rounded-full transform translate-x-1/3 translate-y-1/2" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center bg-emerald-900/50 text-emerald-300 px-4 py-2 rounded-full text-sm mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Proteja seu futuro empresarial
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Transforme sua empresa em uma holding e proteja seu patrimônio com inteligência.
          </h1>
          
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Expanda com inteligência e preserve seu legado. Menos riscos, mais controle e economia tributária para seu negócio.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button 
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 text-base rounded-md flex items-center justify-center"
              onClick={() => window.open("#simulation", "_self")}
            >
              Faça uma simulação. É grátis
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline"
              className="w-full sm:w-auto bg-white border-white/30 text-gray-900 hover:bg-white/10 py-3 px-8 text-base"
              onClick={() => window.open("#saiba-mais", "_self")}
            >
              Saiba mais
            </Button>
          </div>
          
          <motion.div
            className="cursor-pointer mt-4"
            onClick={scrollToNextSection}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-6 h-6 text-white/70 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;