
import { Link } from 'react-router-dom';
import { Cake } from '@/types/cake';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  cake: Cake;
  className?: string;
}

const ProductCard = ({ cake, className = '' }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return `${price} MT`;
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
              className="bg-katcakes-black text-white p-2 rounded flex items-center justify-center hover:bg-katcakes-darkgray transition-colors"
              aria-label="Add to cart"
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
