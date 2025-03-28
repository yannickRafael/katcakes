
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCakeById } from '@/data/cakes';
import Footer from '@/components/Footer';
import { ChevronLeft, ShoppingCart, Heart } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const CakeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cake = getCakeById(id || '');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  if (!cake) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Produto Não Encontrado</h2>
          <p className="text-katcakes-gray mb-6">O produto que você está procurando não existe ou foi removido.</p>
          <Link 
            to="/cakes" 
            className="bg-katcakes-black text-white px-6 py-2 inline-block hover:bg-katcakes-darkgray transition-colors"
          >
            Voltar para Bolos
          </Link>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const addToCart = () => {
    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('katcakesCart') || '[]');
    
    // Check if this cake is already in the cart
    const existingIndex = existingCart.findIndex((item: any) => item.id === cake.id);
    
    if (existingIndex >= 0) {
      // Update quantity if already in cart
      existingCart[existingIndex].quantity = (existingCart[existingIndex].quantity || 0) + quantity;
    } else {
      // Add new item with specified quantity
      existingCart.push({
        ...cake,
        quantity: quantity
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('katcakesCart', JSON.stringify(existingCart));
    
    // Dispatch a custom event to notify the Navbar component
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success message
    toast({
      title: "Adicionado ao carrinho",
      description: `${cake.name} foi adicionado ao seu carrinho.`,
    });
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const formatPrice = (price: number) => {
    return `${price} MT`;
  };
  
  const translateDetail = (detail: string): string => {
    const translations: Record<string, string> = {
      'Shape': 'Formato',
      'Size': 'Tamanho',
      'Flavor': 'Sabor',
      'Filling': 'Recheio',
      'Topping': 'Cobertura'
    };
    
    return translations[detail] || detail;
  };
  
  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-katcakes-lightgray py-4">
        <div className="katcakes-container">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-sm text-katcakes-gray hover:text-katcakes-black transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Voltar
          </button>
        </div>
      </div>
      
      {/* Product Detail */}
      <section className="py-10">
        <div className="katcakes-container">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <img 
                src={cake.image} 
                alt={cake.name} 
                className="w-full h-[400px] sm:h-[500px] object-cover object-center"
              />
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif mb-2">{cake.name}</h1>
                <p className="text-2xl font-medium mb-4">{formatPrice(cake.price)}</p>
                <div className="w-20 h-0.5 bg-katcakes-black mb-6"></div>
                <p className="text-katcakes-gray mb-6">{cake.description}</p>
                
                {/* Product Details */}
                {cake.details && (
                  <div className="mb-8">
                    <h3 className="font-medium mb-3">Detalhes do Produto:</h3>
                    <ul className="space-y-2 text-katcakes-gray">
                      {cake.details.shape && (
                        <li><span className="font-medium text-katcakes-black">Formato:</span> {cake.details.shape}</li>
                      )}
                      {cake.details.size && (
                        <li><span className="font-medium text-katcakes-black">Tamanho:</span> {cake.details.size}</li>
                      )}
                      {cake.details.flavor && (
                        <li><span className="font-medium text-katcakes-black">Sabor:</span> {cake.details.flavor}</li>
                      )}
                      {cake.details.filling && (
                        <li><span className="font-medium text-katcakes-black">Recheio:</span> {cake.details.filling}</li>
                      )}
                      {cake.details.topping && (
                        <li><span className="font-medium text-katcakes-black">Cobertura:</span> {cake.details.topping}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="mt-auto">
                {/* Quantity Selector */}
                <div className="mb-6">
                  <label htmlFor="quantity" className="block font-medium mb-2">Quantidade:</label>
                  <div className="flex items-center">
                    <button 
                      onClick={decrementQuantity}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-katcakes-lightgray transition-colors"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      id="quantity" 
                      value={quantity} 
                      onChange={handleQuantityChange}
                      min="1"
                      className="w-16 h-10 border-t border-b border-gray-300 text-center"
                    />
                    <button 
                      onClick={incrementQuantity}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-katcakes-lightgray transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={addToCart}
                    className="flex-1 bg-katcakes-black text-white px-6 py-3 rounded flex items-center justify-center hover:bg-katcakes-darkgray transition-colors"
                  >
                    <ShoppingCart size={18} className="mr-2" /> 
                    Adicionar ao Carrinho
                  </button>
                  <button 
                    onClick={toggleFavorite}
                    className={`w-12 h-12 flex items-center justify-center border rounded ${
                      isFavorite 
                        ? 'bg-red-50 border-red-200 text-katcakes-red' 
                        : 'border-gray-300 hover:bg-katcakes-lightgray'
                    } transition-colors`}
                    aria-label="Adicionar aos favoritos"
                  >
                    <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                {/* Custom Order Link */}
                <div className="mt-6 text-center sm:text-left">
                  <p className="text-katcakes-gray mb-2">Quer personalizar este bolo?</p>
                  <Link 
                    to="/order" 
                    className="text-katcakes-black underline hover:text-katcakes-darkgray transition-colors"
                  >
                    Criar uma encomenda personalizada
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CakeDetail;
