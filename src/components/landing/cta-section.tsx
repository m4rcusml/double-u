import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface CTASectionProps {
  title: string;
  subtitle: string | ReactNode;
  buttonText: string;
  buttonVariant?: "primary" | "light";
}

const CTASection = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonVariant = "primary" 
}: CTASectionProps) => {
  return (
    <section className={`px-4 sm:px-6 py-12 md:py-16 ${buttonVariant === "primary" ? "bg-gradient-to-br from-gray-900 to-black" : "bg-gray-100"} text-center`}>
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-xl sm:text-2xl md:text-3xl font-medium mb-4 ${buttonVariant === "primary" ? "text-white" : "text-gray-900"}`}>
          {title}
        </h2>
        <p className={`${buttonVariant === "primary" ? "text-gray-300" : "text-gray-600"} text-sm md:text-base mb-8 max-w-xl mx-auto`}>
          {subtitle}
        </p>
        <Button 
          className={`px-6 py-3 text-sm md:text-base transition-all duration-300 inline-flex items-center justify-center gap-2 rounded-md w-full sm:w-auto ${
            buttonVariant === "primary" 
              ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
              : "bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 shadow-sm"
          }`}
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </motion.div>
    </section>
  );
};

export default CTASection;