
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cake } from '@/types/cake';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  cake: Cake;
  className?: string;
}

const ProductCard = ({ cake, className = '' }: ProductCardProps) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const formatPrice = (price: number) => {
    return `${price} MT`;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    // Add to cart logic
    const existingCart = JSON.parse(localStorage.getItem('katcakesCart') || '[]');
    
    // Check if this cake is already in the cart
    const existingIndex = existingCart.findIndex((item: Cake) => item.id === cake.id);
    
    if (existingIndex >= 0) {
      // Update quantity if already in cart
      existingCart[existingIndex].quantity = (existingCart[existingIndex].quantity || 1) + 1;
    } else {
      // Add new item with quantity 1
      existingCart.push({
        ...cake,
        quantity: 1
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('katcakesCart', JSON.stringify(existingCart));
    
    // Dispatch a custom event to notify the Navbar component
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success message
    toast({
      title: "Added to cart",
      description: `${cake.name} has been added to your cart.`,
    });
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className={`group bg-white border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      <div className="image-hover-zoom h-56 sm:h-64 w-full">
        <img 
          src={cake.image} 
          alt={cake.name} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl font-medium mb-2">{cake.name}</h3>
        <p className="text-katcakes-gray text-sm mb-4 line-clamp-2">{cake.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-medium text-lg">{formatPrice(cake.price)}</span>
          <div className="flex gap-2">
            <Link
              to={`/cakes/${cake.id}`}
              className="text-sm px-4 py-2 border border-katcakes-black text-katcakes-black rounded hover:bg-katcakes-black hover:text-white transition-colors"
            >
              Details
            </Link>
            <button 
              className={`${
                isAdding ? 'bg-green-600' : 'bg-katcakes-black'
              } text-white p-2 rounded flex items-center justify-center hover:bg-katcakes-darkgray transition-colors`}
              aria-label="Add to cart"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
