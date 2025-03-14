
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import { getFeaturedCakes } from "@/data/cakes";

const Index = () => {
  const featuredCakes = getFeaturedCakes();

  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts products={featuredCakes} />
      
      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="katcakes-container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="block text-sm uppercase tracking-wider mb-2">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">About KatCakes</h2>
              <p className="text-katcakes-gray mb-4">
                Founded by Kathy Da Berta Rafael in Maputo, KatCakes began as a passion project that blossomed into a home bakery known for its artisanal approach and exceptional flavors.
              </p>
              <p className="text-katcakes-gray mb-6">
                Every cake we create is made with love, using only the finest ingredients and meticulous attention to detail. From classic favorites to custom creations, we pride ourselves on delivering sweet moments of joy to our customers.
              </p>
              <a 
                href="/about" 
                className="bg-katcakes-black text-white px-6 py-3 inline-block hover:bg-katcakes-darkgray transition-colors"
              >
                Learn More
              </a>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1607478900766-efe13248b125?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="About KatCakes" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border-2 border-katcakes-black rounded-lg -z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 bg-katcakes-lightgray">
        <div className="katcakes-container text-center">
          <span className="block text-sm uppercase tracking-wider mb-2">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-serif mb-10 max-w-2xl mx-auto">Creating Your Perfect Cake in Three Simple Steps</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div className="bg-white p-8 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center border-2 border-katcakes-black rounded-full text-xl font-serif font-bold mx-auto mb-6">1</div>
              <h3 className="font-serif text-xl mb-4">Select or Customize</h3>
              <p className="text-katcakes-gray">Choose from our signature cakes or customize your own with your preferred flavors and designs.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center border-2 border-katcakes-black rounded-full text-xl font-serif font-bold mx-auto mb-6">2</div>
              <h3 className="font-serif text-xl mb-4">Place Your Order</h3>
              <p className="text-katcakes-gray">Complete your order with details about when you need it and your delivery preferences.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center border-2 border-katcakes-black rounded-full text-xl font-serif font-bold mx-auto mb-6">3</div>
              <h3 className="font-serif text-xl mb-4">Enjoy Your Cake</h3>
              <p className="text-katcakes-gray">We'll prepare your cake with love and care, ready for your special occasion.</p>
            </div>
          </div>
          
          <a href="/order" className="mt-10 inline-block px-8 py-3 bg-katcakes-black text-white hover:bg-katcakes-darkgray transition-colors">Start Your Order</a>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="katcakes-container text-center">
          <span className="block text-sm uppercase tracking-wider mb-2">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-serif mb-10">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-katcakes-lightgray p-8 rounded-lg">
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-katcakes-black">★</span>
                ))}
              </div>
              <p className="italic mb-6">
                "The cake was absolutely amazing! Not only was it beautiful, but it tasted incredible. Kathy has a real talent!"
              </p>
              <p className="font-medium">- Maria S.</p>
            </div>
            
            <div className="bg-katcakes-lightgray p-8 rounded-lg">
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-katcakes-black">★</span>
                ))}
              </div>
              <p className="italic mb-6">
                "I ordered a birthday cake for my daughter and it exceeded all expectations. The design was perfect and it tasted delicious!"
              </p>
              <p className="font-medium">- João P.</p>
            </div>
            
            <div className="bg-katcakes-lightgray p-8 rounded-lg">
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-katcakes-black">★</span>
                ))}
              </div>
              <p className="italic mb-6">
                "KatCakes made our wedding cake and it was the highlight of our reception. Professional service and outstanding quality!"
              </p>
              <p className="font-medium">- Ana & Carlos</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
