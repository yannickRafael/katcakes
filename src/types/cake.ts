
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
    topping?: 'marzipan' | 'ganache' | 'buttercream';
  };
}
