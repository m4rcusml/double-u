import { Shield, Users, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Shield className="w-6 h-6 md:w-7 md:h-7 text-emerald-600" />,
      title: "Blindagem patrimonial",
      description: "Proteja seus ativos contra riscos financeiros e jurídicos"
    },
    {
      icon: <Users className="w-6 h-6 md:w-7 md:h-7 text-emerald-600" />,
      title: "Sucessão segura",
      description: "Planeje a transferência de patrimônio de forma eficiente"
    },
    {
      icon: <Building2 className="w-6 h-6 md:w-7 md:h-7 text-emerald-600" />,
      title: "Otimização tributária",
      description: "Reduza a carga tributária de forma legal e estratégica"
    },
  ];

  return (
    <div id="benefits-section" className="bg-white">
      <section className="bg-white text-black py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="border-l-4 border-emerald-600 pl-3 sm:pl-4 mb-8 md:mb-10">
          <h2 className="text-sm md:text-base lg:text-lg font-medium">
            Por que tantos estão migrando para o modelo de holding?
          </h2>
        </div>
        <div className="bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-zinc-50 hover:bg-zinc-100 border-zinc-100 shadow-sm p-5 h-full transition-all duration-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3">
                  <div className="p-2 bg-emerald-100 rounded-lg mb-3 sm:mb-0 sm:mr-3">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-black">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BenefitsSection;