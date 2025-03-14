import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, X } from 'lucide-react';
import Logo from './ui/Logo';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('katcakesCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItemCount(parsedCart.length);
      } else {
        setCartItemCount(0);
      }
    };

    updateCartCount();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'katcakesCart') {
        updateCartCount();
      }
    };

    const handleCustomStorageEvent = () => updateCartCount();
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCustomStorageEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCustomStorageEvent);
    };
  }, []);

  const navLinks = [
    { label: 'Início', to: '/' },
    { label: 'Bolos', to: '/cakes' },
    { label: 'Encomenda', to: '/order' },
    { label: 'Sobre', to: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="katcakes-container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`hover:text-katcakes-black transition-colors ${
                  location.pathname === link.to 
                    ? 'text-katcakes-black font-medium' 
                    : 'text-katcakes-gray'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/login" 
              className="px-3 py-2 hover:bg-katcakes-lightgray rounded transition-colors"
            >
              Entrar
            </Link>
            <Link to="/cart" className="relative p-2 hover:bg-katcakes-lightgray rounded-full transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-katcakes-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3 md:hidden">
            <Link to="/cart" className="relative p-2 hover:bg-katcakes-lightgray rounded-full transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-katcakes-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 hover:bg-katcakes-lightgray rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="katcakes-container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`py-2 ${
                    location.pathname === link.to 
                      ? 'text-katcakes-black font-medium' 
                      : 'text-katcakes-gray'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/login" 
                className="py-2 text-katcakes-gray"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Entrar
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
