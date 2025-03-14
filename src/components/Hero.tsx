
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1612203985729-70726954388c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="KatCakes bakery" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 katcakes-container h-full flex flex-col justify-center items-start">
        <div className="max-w-xl animate-fade-in">
          <span className="bg-white px-3 py-1 font-medium text-sm uppercase inline-block mb-4">Homemade Bakery</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Artisanal Cakes With Love
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8">
            Delicious custom cakes and desserts made with passion in Maputo. Every creation tells a unique story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/cakes" 
              className="bg-white text-katcakes-black px-8 py-3 rounded font-medium inline-flex items-center hover:bg-katcakes-lightgray transition-colors group"
            >
              Explore Cakes
              <ChevronRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              to="/order" 
              className="border border-white text-white px-8 py-3 rounded font-medium inline-flex items-center hover:bg-white/10 transition-colors"
            >
              Custom Order
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
