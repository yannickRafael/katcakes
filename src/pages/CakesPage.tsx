
import { useState } from 'react';
import { cakes, getCakesByCategory } from '@/data/cakes';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { Cake } from '@/types/cake';

const CakesPage = () => {
  const [activeCategory, setActiveCategory] = useState<Cake['category'] | 'all'>('all');
  
  const filteredCakes = activeCategory === 'all' 
    ? cakes 
    : getCakesByCategory(activeCategory);
  
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 bg-katcakes-lightgray">
        <div className="katcakes-container text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Nossas Deliciosas Criações</h1>
          <p className="text-katcakes-gray max-w-2xl mx-auto">
            Explore nossa coleção de bolos artesanais, cupcakes e outros doces. Cada criação é feita com os melhores ingredientes e confeccionada com amor.
          </p>
        </div>
      </section>
      
      {/* Category Tabs */}
      <section className="py-8 border-b border-gray-200">
        <div className="katcakes-container">
          <div className="flex justify-center space-x-2 sm:space-x-8 overflow-x-auto pb-2">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 whitespace-nowrap ${
                activeCategory === 'all' 
                  ? 'font-medium border-b-2 border-katcakes-black' 
                  : 'text-katcakes-gray hover:text-katcakes-black transition-colors'
              }`}
            >
              Todos os Produtos
            </button>
            <button 
              onClick={() => setActiveCategory('cake')}
              className={`px-4 py-2 whitespace-nowrap ${
                activeCategory === 'cake' 
                  ? 'font-medium border-b-2 border-katcakes-black' 
                  : 'text-katcakes-gray hover:text-katcakes-black transition-colors'
              }`}
            >
              Bolos
            </button>
            <button 
              onClick={() => setActiveCategory('cupcake')}
              className={`px-4 py-2 whitespace-nowrap ${
                activeCategory === 'cupcake' 
                  ? 'font-medium border-b-2 border-katcakes-black' 
                  : 'text-katcakes-gray hover:text-katcakes-black transition-colors'
              }`}
            >
              Cupcakes
            </button>
            <button 
              onClick={() => setActiveCategory('other')}
              className={`px-4 py-2 whitespace-nowrap ${
                activeCategory === 'other' 
                  ? 'font-medium border-b-2 border-katcakes-black' 
                  : 'text-katcakes-gray hover:text-katcakes-black transition-colors'
              }`}
            >
              Outros Doces
            </button>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-12">
        <div className="katcakes-container">
          {filteredCakes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-katcakes-gray">Nenhum produto encontrado nesta categoria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCakes.map((cake) => (
                <ProductCard key={cake.id} cake={cake} className="h-full" />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-katcakes-lightgray">
        <div className="katcakes-container text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Não Encontrou o Que Procura?</h2>
          <p className="text-katcakes-gray max-w-2xl mx-auto mb-8">
            Nós nos especializamos em criações personalizadas. Conte-nos sobre o bolo dos seus sonhos e nós o tornaremos realidade.
          </p>
          <a 
            href="/order" 
            className="bg-katcakes-black text-white px-8 py-3 inline-block hover:bg-katcakes-darkgray transition-colors"
          >
            Criar Encomenda Personalizada
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CakesPage;
