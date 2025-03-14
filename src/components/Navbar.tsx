
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './ui/Logo';
import { Menu, X, ShoppingCart } from 'lucide-react';

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

  // Effect to load cart count on initial render and listen for storage changes
  useEffect(() => {
    // Function to update cart count from localStorage
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('katcakesCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItemCount(parsedCart.length);
      } else {
        setCartItemCount(0);
      }
    };

    // Update count on initial render
    updateCartCount();

    // Listen for storage events (when localStorage changes in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'katcakesCart') {
        updateCartCount();
      }
    };

    // Custom event for same-tab updates
    const handleCustomStorageEvent = () => updateCartCount();
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCustomStorageEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCustomStorageEvent);
    };
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Cakes', path: '/cakes' },
    { label: 'Order', path: '/order' },
    { label: 'About', path: '/about' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="katcakes-container flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${isActivePath(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-sm font-medium hover:text-katcakes-gray transition-colors">
            Log In
          </Link>
          <Link to="/cart" className="relative p-2 hover:bg-katcakes-lightgray rounded-full transition-colors">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-katcakes-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
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
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 md:hidden animate-fade-in">
          <nav className="flex flex-col p-8 space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-xl font-serif ${isActivePath(link.path) ? 'font-medium' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-serif"
            >
              Log In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
