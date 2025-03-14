
import { Cake } from '@/types/cake';

export const cakes: Cake[] = [
  {
    id: '1',
    name: 'Classic Vanilla Cake',
    description: 'A timeless vanilla cake with silky buttercream frosting.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'cake',
    featured: true,
    details: {
      shape: 'round',
      size: '20cm',
      flavor: 'Vanilla',
      filling: 'Vanilla Buttercream',
      topping: 'buttercream'
    }
  },
  {
    id: '2',
    name: 'Chocolate Decadence',
    description: 'Rich chocolate cake with velvety ganache, a chocolate lover\'s dream.',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'cake',
    featured: true,
    details: {
      shape: 'round',
      size: '20cm',
      flavor: 'Chocolate',
      filling: 'Chocolate Ganache',
      topping: 'ganache'
    }
  },
  {
    id: '3',
    name: 'Strawberry Bliss',
    description: 'Light vanilla cake with fresh strawberry filling and cream cheese frosting.',
    price: 2700,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'cake',
    featured: true,
    details: {
      shape: 'round',
      size: '20cm',
      flavor: 'Vanilla',
      filling: 'Strawberry',
      topping: 'buttercream'
    }
  },
  {
    id: '4',
    name: 'Red Velvet Elegance',
    description: 'Classic red velvet cake with cream cheese frosting, beautifully decorated.',
    price: 2900,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324626f4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'cake',
    details: {
      shape: 'round',
      size: '20cm',
      flavor: 'Red Velvet',
      filling: 'Cream Cheese',
      topping: 'buttercream'
    }
  },
  {
    id: '5',
    name: 'Vanilla Cupcakes',
    description: 'Classic vanilla cupcakes with silky buttercream frosting.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'cupcake',
    featured: true,
  },
  {
    id: '6',
    name: 'Chocolate Cupcakes',
    description: 'Rich chocolate cupcakes with velvety chocolate ganache.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'cupcake',
  },
  {
    id: '7',
    name: 'Lemon Tart',
    description: 'Tangy lemon tart with a buttery crust.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'other',
  },
  {
    id: '8',
    name: 'Chocolate Chip Cookies',
    description: 'Classic chocolate chip cookies, soft in the center with crispy edges.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'other',
  }
];

export const getCakeById = (id: string): Cake | undefined => {
  return cakes.find(cake => cake.id === id);
};

export const getFeaturedCakes = (): Cake[] => {
  return cakes.filter(cake => cake.featured);
};

export const getCakesByCategory = (category: Cake['category']): Cake[] => {
  return cakes.filter(cake => cake.category === category);
};
