
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartItem, Cake, CustomOrder } from '@/types/cake';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2, Plus, Minus, AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      const savedCart = localStorage.getItem('katcakesCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        setIsEmpty(parsedCart.length === 0);
      }
    };

    loadCartItems();
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    setIsEmpty(updatedCart.length === 0);
    localStorage.setItem('katcakesCart', JSON.stringify(updatedCart));
    
    // Dispatch event to notify the Navbar component
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
    
    toast({
      title: "Item removido",
      description: "O item foi removido do seu carrinho.",
    });
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, quantity: newQuantity };
        
        // Recalculate price for custom orders
        if ('details' in item && item.category) {
          // This is a CustomOrder
          if (item.category === 'cake') {
            const sizePrice = {
              '15cm': 2500,
              '18cm': 3000,
              '20cm': 3500,
              '22cm': 4000,
              '30cm': 5500,
            };
            const size = (item as CustomOrder).details.size || '20cm';
            updatedItem.price = sizePrice[size as keyof typeof sizePrice] * newQuantity;
          } else if (item.category === 'cupcake') {
            updatedItem.price = 150 * newQuantity;
          }
        }
        
        return updatedItem;
      }
      return item;
    });
    
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + (item.price * quantity);
    }, 0);
  };

  const isCake = (item: CartItem): item is Cake => {
    return (item as Cake).name !== undefined;
  };

  const isCustomOrder = (item: CartItem): item is CustomOrder => {
    return (item as CustomOrder).category !== undefined && !(item as Cake).name;
  };

  const handleCheckout = () => {
    // This would typically navigate to checkout page or payment flow
    // For now, we'll just show a toast message
    toast({
      title: "Checkout",
      description: "Prosseguindo para o checkout...",
    });
    // In a real app, you would navigate to checkout page
    // navigate('/checkout');
  };

  const translateCategory = (category: string): string => {
    const translations: Record<string, string> = {
      'cake': 'Bolo',
      'cupcake': 'Cupcake',
      'other': 'Doce'
    };
    
    return translations[category] || category;
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

  const renderItemDetails = (item: CartItem) => {
    if (isCake(item)) {
      // Regular cake product
      return (
        <>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div>
              <h3 className="font-medium text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            </div>
          </div>
        </>
      );
    } else if (isCustomOrder(item)) {
      // Custom order
      return (
        <div>
          <h3 className="font-medium text-lg">
            {translateCategory(item.category)} Personalizado
          </h3>
          <div className="text-sm text-gray-600 mt-2 space-y-1">
            {item.details.shape && <p>Formato: {item.details.shape}</p>}
            {item.details.size && <p>Tamanho: {item.details.size}</p>}
            {item.details.flavor && <p>Sabor: {item.details.flavor}</p>}
            {item.details.filling && <p>Recheio: {item.details.filling}</p>}
            {item.details.topping && <p>Cobertura: {item.details.topping}</p>}
            {item.category === 'other' && item.details.specialRequests && (
              <div className="mt-2">
                <p className="font-medium">Pedido Especial:</p>
                <p className="text-gray-600">{item.details.specialRequests}</p>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="katcakes-container max-w-5xl mx-auto">
        <div className="flex items-center mb-8">
          <ShoppingCart size={24} className="mr-2" />
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Seu Carrinho</h1>
        </div>

        {isEmpty ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-serif mb-2">Seu carrinho está vazio</h2>
            <p className="text-katcakes-gray mb-8">Parece que você ainda não adicionou nenhum item ao seu carrinho.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/cakes">
                <Button variant="default">Explorar Bolos</Button>
              </Link>
              <Link to="/order">
                <Button variant="outline">Criar Encomenda Personalizada</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`p-4 md:p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex flex-col md:flex-row justify-between">
                      {renderItemDetails(item)}
                      
                      <div className="flex flex-col md:items-end justify-between mt-4 md:mt-0">
                        <div className="flex items-center">
                          <button 
                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                            className="p-1 border border-gray-300 rounded"
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <Input 
                            type="number" 
                            min="1" 
                            value={item.quantity || 1}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 text-center mx-2"
                          />
                          <button 
                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                            className="p-1 border border-gray-300 rounded"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 md:mt-auto w-full md:justify-end">
                          <span className="font-medium text-lg">{item.price} MT</span>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="ml-4 p-2 text-katcakes-gray hover:text-katcakes-red transition-colors"
                            aria-label="Remover item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link to="/order" className="text-katcakes-black hover:underline inline-flex items-center">
                  <Plus size={16} className="mr-1" /> Adicionar Outro Item
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                <h2 className="font-serif text-xl font-medium mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-katcakes-gray">Subtotal</span>
                    <span>{calculateTotal()} MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-katcakes-gray">Entrega</span>
                    <span>A definir</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{calculateTotal()} MT</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button onClick={handleCheckout} className="w-full">
                    Finalizar Compra
                  </Button>
                  
                  <div className="flex items-center text-sm text-katcakes-gray justify-center">
                    <AlertCircle size={14} className="mr-1" />
                    <span>Detalhes de entrega serão confirmados no checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
