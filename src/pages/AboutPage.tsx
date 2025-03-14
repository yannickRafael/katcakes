
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-katcakes-lightgray">
        <div className="katcakes-container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">About KatCakes</h1>
            <p className="text-katcakes-gray text-lg">
              Artisanal home bakery crafting sweet memories in Maputo.
            </p>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-16">
        <div className="katcakes-container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559620192-032c4bc4674e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="KatCakes founder" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <span className="block text-sm uppercase tracking-wider mb-2">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">The KatCakes Journey</h2>
              <p className="text-katcakes-gray mb-4">
                KatCakes began in 2018 when Kathy Da Berta Rafael started baking from her home kitchen in Maputo. 
                What started as a passion for creating delicious treats for family and friends quickly blossomed into a thriving home bakery.
              </p>
              <p className="text-katcakes-gray mb-4">
                Driven by a belief that every celebration deserves something special, Kathy honed her craft through experimentation, training, and an unwavering commitment to quality.
              </p>
              <p className="text-katcakes-gray">
                Today, KatCakes is known throughout Maputo for its artisanal approach, exceptional flavors, and beautiful designs that bring joy to every occasion.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-katcakes-lightgray">
        <div className="katcakes-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="block text-sm uppercase tracking-wider mb-2">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">What We Value</h2>
            <p className="text-katcakes-gray">
              At KatCakes, our work is guided by core principles that ensure every creation exceeds expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-4">Quality Ingredients</h3>
              <p className="text-katcakes-gray">
                We use only the finest, freshest ingredients in every creation. No compromises, no shortcuts.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-4">Artisanal Approach</h3>
              <p className="text-katcakes-gray">
                Each cake is handcrafted with meticulous attention to detail, ensuring a unique and special result.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-4">Customer Happiness</h3>
              <p className="text-katcakes-gray">
                Your satisfaction is our priority. We work closely with you to bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet the Baker */}
      <section className="py-16">
        <div className="katcakes-container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="block text-sm uppercase tracking-wider mb-2">Meet the Baker</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Kathy Da Berta Rafael</h2>
              <p className="text-katcakes-gray mb-4">
                Kathy's journey in the world of baking began in her grandmother's kitchen, where she learned traditional recipes and techniques that formed the foundation of KatCakes.
              </p>
              <p className="text-katcakes-gray mb-4">
                With formal training in pastry arts and years of experience, Kathy combines technical expertise with artistic flair to create cakes that are as beautiful as they are delicious.
              </p>
              <p className="text-katcakes-gray">
                "Baking is my form of creative expression and bringing joy through my creations is what drives me every day." - Kathy
              </p>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556911073-38141963c9e0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Kathy baking" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-katcakes-lightgray">
        <div className="katcakes-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="block text-sm uppercase tracking-wider mb-2">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Contact Us</h2>
            <p className="text-katcakes-gray">
              Have questions or want to place an order? We'd love to hear from you!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-6">Contact Information</h3>
              <ul className="space-y-4 text-katcakes-gray">
                <li className="flex items-start">
                  <span className="font-medium mr-2">Address:</span>
                  <span>123 Baker Street, Maputo, Mozambique</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Phone:</span>
                  <a href="tel:+258123456789" className="hover:text-katcakes-black transition-colors">+258 123 456 789</a>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Email:</span>
                  <a href="mailto:info@katcakes.com" className="hover:text-katcakes-black transition-colors">info@katcakes.com</a>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Hours:</span>
                  <div>
                    <p>Monday - Friday: 9am - 6pm</p>
                    <p>Saturday: 10am - 4pm</p>
                    <p>Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-serif text-xl mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-katcakes-black"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-katcakes-black"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-katcakes-black"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-katcakes-black text-white py-2 rounded hover:bg-katcakes-darkgray transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
