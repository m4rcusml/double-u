import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  avatar?: string;
  rating: number;
}

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      quote: "A W1 mudou o jogo. Antes, eu achava que holding era só para grandes empresas. Hoje pago menos impostos e minha família dorme tranquila.",
      author: "Marcus Valente",
      company: "Grupo Valente",
      rating: 5
    },
    {
      quote: "Em apenas 3 meses, reorganizamos toda a estrutura empresarial. O retorno do investimento foi absurdamente rápido. A equipe é super atenciosa e sempre disposta a ajudar.",
      author: "Nicole Riedla",
      company: "Riedla Arquitetura",
      rating: 5
    },
    {
      quote: "A segurança jurídica que ganhei com a holding familiar é impressionante. Recomendo para qualquer empresa que pensa no longo prazo.",
      author: "José Lima",
      company: "Lima Automação",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-4 sm:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-600 font-bold">+200</span> empresas já transformaram sua estrutura com a W1
          </motion.h2>
          
          {/* Desktop navigation */}
          <div className="hidden sm:flex space-x-2">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              initial={false}
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <Quote className="w-6 h-6 stroke-none fill-emerald-600" />
                      <div className="flex">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-gray-700 text-lg mb-6">
                      {testimonial.quote}
                    </blockquote>
                    <div className="flex items-center">
                      {testimonial.avatar ? (
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="w-12 h-12 rounded-full mr-4"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-medium text-lg mr-4">
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{testimonial.author}</div>
                        <div className="text-sm text-gray-500">{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Mobile navigation */}
          <div className="flex justify-center mt-6 sm:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 mx-1 rounded-full ${
                  index === currentIndex ? "bg-emerald-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Junte-se aos nossos clientes satisfeitos e transforme o futuro do seu negócio
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;