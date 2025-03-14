
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CustomOrder } from '@/types/cake';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the valid topping types
const VALID_TOPPINGS = [
  "Vanilla Buttercream", "Chocolate Ganache", "Cream Cheese Frosting", 
  "Chocolate Buttercream", "Whipped Cream", "Caramel"
] as const;

// Create a type from the array of valid toppings
type ValidTopping = typeof VALID_TOPPINGS[number];

const formSchema = z.object({
  details: z.object({
    flavor: z.string().min(1, "Por favor selecione um sabor"),
    topping: z.enum(VALID_TOPPINGS), // Use the enum to restrict values
    specialRequests: z.string().optional(),
    allergies: z.string().optional(),
  }),
  price: z.number().min(150),
  quantity: z.number().min(6).max(100),
});

type CupcakeOrderFormValues = Omit<CustomOrder, 'id' | 'category'>;

interface CupcakeOrderFormProps {
  onSubmit: (data: CupcakeOrderFormValues) => void;
}

const FLAVORS = [
  "Baunilha", "Chocolate", "Red Velvet", "Limão", "Cenoura", 
  "Café", "Coco", "Morango"
];

// Portuguese translations for toppings
const PORTUGUESE_TOPPINGS: Record<ValidTopping, string> = {
  "Vanilla Buttercream": "Creme de Baunilha",
  "Chocolate Ganache": "Ganache de Chocolate",
  "Cream Cheese Frosting": "Cobertura de Cream Cheese",
  "Chocolate Buttercream": "Creme de Chocolate",
  "Whipped Cream": "Chantilly",
  "Caramel": "Caramelo"
};

// Base price per cupcake
const BASE_PRICE = 150;

const CupcakeOrderForm = ({ onSubmit }: CupcakeOrderFormProps) => {
  const [calculatedPrice, setCalculatedPrice] = useState(BASE_PRICE * 6);
  
  const form = useForm<CupcakeOrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: {
        flavor: FLAVORS[0],
        topping: VALID_TOPPINGS[0],  // Use the first valid topping
        specialRequests: '',
        allergies: '',
      },
      price: BASE_PRICE * 6, // Minimum 6 cupcakes
      quantity: 6,
    },
  });

  const handleQuantityChange = (qty: number) => {
    const newPrice = BASE_PRICE * qty;
    setCalculatedPrice(newPrice);
    form.setValue('price', newPrice);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="details.flavor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sabor</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o sabor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FLAVORS.map((flavor) => (
                      <SelectItem key={flavor} value={flavor}>{flavor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="details.topping"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cobertura</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cobertura" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {VALID_TOPPINGS.map((topping) => (
                      <SelectItem key={topping} value={topping}>
                        {PORTUGUESE_TOPPINGS[topping]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade (Mínimo 6)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="6" 
                  max="100" 
                  {...field} 
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    field.onChange(value);
                    handleQuantityChange(value);
                  }} 
                />
              </FormControl>
              <FormDescription>
                Cupcakes são vendidos em quantidades mínimas de 6.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details.specialRequests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pedidos Especiais & Decoração</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Por favor descreva quaisquer decorações específicas ou pedidos especiais que você tenha para seus cupcakes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details.allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alergias ou Restrições Alimentares</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Por favor liste quaisquer alergias ou restrições alimentares que devemos considerar"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-medium">Preço Total:</span>
            <span className="text-2xl font-serif font-bold">{form.getValues('price')} MT</span>
          </div>
          
          <Button type="submit" className="w-full">
            Adicionar ao Carrinho
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CupcakeOrderForm;
