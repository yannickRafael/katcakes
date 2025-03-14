
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
              <span className="block text-sm uppercase tracking-wider mb-2">Nossa História</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Sobre KatCakes</h2>
              <p className="text-katcakes-gray mb-4">
                Fundada por Kathy Da Berta Rafael em Maputo, KatCakes começou como um projeto de paixão que floresceu em uma confeitaria caseira conhecida por sua abordagem artesanal e sabores excepcionais.
              </p>
              <p className="text-katcakes-gray mb-6">
                Cada bolo que criamos é feito com amor, usando apenas os melhores ingredientes e com atenção meticulosa aos detalhes. De favoritos clássicos a criações personalizadas, nos orgulhamos de entregar doces momentos de alegria aos nossos clientes.
              </p>
              <a 
                href="/about" 
                className="bg-katcakes-black text-white px-6 py-3 inline-block hover:bg-katcakes-darkgray transition-colors"
              >
                Saiba Mais
              </a>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1607478900766-efe13248b125?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Sobre KatCakes" 
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
          <span className="block text-sm uppercase tracking-wider mb-2">Como Funciona</span>
          <h2 className="text-3xl md:text-4xl font-serif mb-10 max-w-2xl mx-auto">Criando Seu Bolo Perfeito em Três Simples Passos</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div className="bg-white p-8 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center border-2 border-katcakes-black rounded-full text-xl font-serif font-bold mx-auto mb-6">1</div>
              <h3 className="font-serif text-xl mb-4">Selecione ou Personalize</h3>
              <p className="text-katcakes-gray">Escolha entre nossos bolos de assinatura ou personalize o seu com seus sabores e designs preferidos.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center border-2 border-katcakes-black rounded-full text-xl font-serif font-bold mx-auto mb-6">2</div>
              <h3 className="font-serif text-xl mb-4">Faça Seu Pedido</h3>
              <p className="text-katcakes-gray">Complete seu pedido com detalhes sobre quando você precisa dele e suas preferências de entrega.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center border-2 border-katcakes-black rounded-full text-xl font-serif font-bold mx-auto mb-6">3</div>
              <h3 className="font-serif text-xl mb-4">Aproveite Seu Bolo</h3>
              <p className="text-katcakes-gray">Prepararemos seu bolo com amor e cuidado, pronto para sua ocasião especial.</p>
            </div>
          </div>
          
          <a href="/order" className="mt-10 inline-block px-8 py-3 bg-katcakes-black text-white hover:bg-katcakes-darkgray transition-colors">Faça Seu Pedido</a>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="katcakes-container text-center">
          <span className="block text-sm uppercase tracking-wider mb-2">Depoimentos</span>
          <h2 className="text-3xl md:text-4xl font-serif mb-10">O Que Nossos Clientes Dizem</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-katcakes-lightgray p-8 rounded-lg">
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-katcakes-black">★</span>
                ))}
              </div>
              <p className="italic mb-6">
                "O bolo foi absolutamente incrível! Não apenas era bonito, mas tinha um sabor maravilhoso. Kathy tem um talento real!"
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
                "Encomendei um bolo de aniversário para minha filha e superou todas as expectativas. O design estava perfeito e o sabor estava delicioso!"
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
                "KatCakes fez nosso bolo de casamento e foi o destaque da nossa recepção. Serviço profissional e qualidade excepcional!"
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
