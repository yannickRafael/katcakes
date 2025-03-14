
export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'cake' | 'cupcake' | 'other';
  featured?: boolean;
  details?: {
    shape?: 'round' | 'rectangle';
    size?: '15cm' | '18cm' | '20cm' | '22cm' | '30cm';
    flavor?: string;
    filling?: string;
    topping?: 'marzipan' | 'ganache' | 'buttercream' | 'Vanilla Buttercream' | 'Chocolate Ganache' | 'Cream Cheese Frosting' | 'Chocolate Buttercream' | 'Whipped Cream' | 'Caramel';
  };
  quantity?: number;
}

export interface CustomOrder {
  id: string;
  category: 'cake' | 'cupcake' | 'other';
  details: {
    shape?: 'round' | 'rectangle';
    size?: '15cm' | '18cm' | '20cm' | '22cm' | '30cm';
    flavor?: string;
    filling?: string;
    topping?: 'marzipan' | 'ganache' | 'buttercream' | 'Vanilla Buttercream' | 'Chocolate Ganache' | 'Cream Cheese Frosting' | 'Chocolate Buttercream' | 'Whipped Cream' | 'Caramel';
    specialRequests?: string;
    allergies?: string;
  };
  price: number;
  quantity: number;
}

export type CartItem = Cake | CustomOrder;
