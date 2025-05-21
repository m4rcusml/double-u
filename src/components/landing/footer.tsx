import { Facebook, Instagram, Linkedin, ChevronUp, Mail, Phone } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const footerLinks = [
    {
      title: "Empresa",
      links: [
        { label: "Quem somos", href: "#" },
        { label: "Nossa história", href: "#" },
        { label: "Missão e valores", href: "#" }
      ]
    },
    {
      title: "Soluções",
      links: [
        { label: "Planejamento tributário", href: "#" },
        { label: "Sucessão familiar", href: "#" },
        { label: "Proteção patrimonial", href: "#" }
      ]
    },
    {
      title: "Contato",
      links: [
        { label: "Atendimento", href: "#" },
        { label: "Fale com um consultor", href: "#" },
        { label: "Trabalhe conosco", href: "#" }
      ]
    }
  ];

const socialIcons = [
    { icon: <Facebook className="w-5 h-5 fill-current stroke-0" />, href: "https://www.facebook.com/W1consultoria/", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5 stroke-2" />, href: "https://www.instagram.com/w1consultoria/", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5 fill-current stroke-0" />, href: "https://www.linkedin.com/company/w1-consultoria", label: "LinkedIn" }
];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* back to top button */}
      <div className="flex justify-center -mt-6">
        <button 
          onClick={scrollToTop}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>
      
      {/* main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* company logo and description */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">W1 Consultoria</h2>
            <p className="text-sm text-gray-400 mb-6">
              Transformando empresas e protegendo patrimônios desde 2010. Sua segurança é nossa prioridade.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-emerald-500 mr-2" />
                <span className="text-sm items-center">+55 (11) 4301-7007</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-emerald-500 mr-2" />
                <span className="text-sm">contato@w1.com.br</span>
              </div>
            </div>
          </div>
          
          {/* footer links */}
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-white font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-emerald-500 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* social media and copyright */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
            <div className="flex justify-center md:justify-start space-x-6">
              {socialIcons.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  className="text-gray-400 hover:text-emerald-500 transition-colors duration-300"
                  aria-label={social.label}
                  target="_blank"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="text-center md:text-right text-sm text-gray-500">
              <p>© {year} W1 Consultoria. Todos os direitos reservados.</p>
              <p className="mt-1">
                <a href="#" className="hover:text-emerald-500 transition-colors duration-300">Termos de Uso</a>
                {" • "}
                <a href="#" className="hover:text-emerald-500 transition-colors duration-300">Política de Privacidade</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;