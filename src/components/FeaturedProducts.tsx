
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Cake } from '@/types/cake';
import { Link } from 'react-router-dom';

interface FeaturedProductsProps {
  products: Cake[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = 320; // Approximate width of a card + gap
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (direction === 'left') {
      const newPosition = Math.max(0, scrollPosition - scrollAmount);
      setScrollPosition(newPosition);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    } else {
      const newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
      setScrollPosition(newPosition);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleNativeScroll = () => {
      setScrollPosition(container.scrollLeft);
    };

    container.addEventListener('scroll', handleNativeScroll);
    return () => {
      container.removeEventListener('scroll', handleNativeScroll);
    };
  }, []);

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollContainerRef.current
    ? scrollPosition < scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
    : false;

  return (
    <section className="py-16 bg-katcakes-lightgray">
      <div className="katcakes-container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="block text-sm uppercase tracking-wider mb-1">Hand-picked</span>
            <h2 className="text-3xl md:text-4xl font-serif">Our Signature Cakes</h2>
          </div>
          <Link to="/cakes" className="hidden md:inline-block px-4 py-2 border border-katcakes-black text-sm hover:bg-katcakes-black hover:text-white transition-colors">
            View All
          </Link>
        </div>
        
        <div className="relative">
          {/* Scroll Buttons */}
          {canScrollLeft && (
            <button 
              onClick={() => handleScroll('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-katcakes-lightgray transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={22} />
            </button>
          )}
          
          {canScrollRight && (
            <button 
              onClick={() => handleScroll('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-katcakes-lightgray transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={22} />
            </button>
          )}
          
          {/* Products Slider */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto py-2 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex gap-6 pl-1 pr-6">
              {products.map((product) => (
                <div key={product.id} className="min-w-[280px] sm:min-w-[320px]">
                  <ProductCard cake={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/cakes" className="inline-block px-4 py-2 border border-katcakes-black text-sm hover:bg-katcakes-black hover:text-white transition-colors">
            View All Cakes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
