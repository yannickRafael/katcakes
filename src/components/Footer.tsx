
import Logo from './ui/Logo';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-katcakes-black text-white pt-16 pb-8">
      <div className="katcakes-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/20">
          <div>
            <Logo className="mb-4" textClassName="text-white" />
            <p className="text-white/70 mb-6">
              Confeccionado com amor em Maputo, Moçambique. Especializado em bolos personalizados, cupcakes e doces para todas as ocasiões.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="mailto:info@katcakes.com" className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                <Mail size={18} />
              </a>
              <a href="tel:+258123456789" className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                <Phone size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">Início</Link>
              </li>
              <li>
                <Link to="/cakes" className="text-white/70 hover:text-white transition-colors">Bolos</Link>
              </li>
              <li>
                <Link to="/order" className="text-white/70 hover:text-white transition-colors">Encomenda Personalizada</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link to="/login" className="text-white/70 hover:text-white transition-colors">Entrar / Registrar</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg mb-6">Contacte-nos</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="font-medium mr-2">Endereço:</span>
                <span>Rua 123, Maputo, Moçambique</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Telefone:</span>
                <a href="tel:+258123456789" className="hover:text-white transition-colors">+258 123 456 789</a>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Email:</span>
                <a href="mailto:info@katcakes.com" className="hover:text-white transition-colors">info@katcakes.com</a>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">Horário:</span>
                <span>Seg-Sáb: 9h - 18h</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 text-center text-white/50 text-sm">
          <p>&copy; {currentYear} KatCakes por Kathy Da Berta Rafael. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
