
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
    flavor: z.string().min(1, "Please select a flavor"),
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
  "Vanilla", "Chocolate", "Red Velvet", "Lemon", "Carrot", 
  "Coffee", "Coconut", "Strawberry"
];

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
                <FormLabel>Flavor</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select flavor" />
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
                <FormLabel>Topping</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topping" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {VALID_TOPPINGS.map((topping) => (
                      <SelectItem key={topping} value={topping}>{topping}</SelectItem>
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
              <FormLabel>Quantity (Minimum 6)</FormLabel>
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
                Cupcakes are sold in minimum quantities of 6.
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
              <FormLabel>Special Requests & Decoration</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please describe any specific decorations or special requests you have for your cupcakes"
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
              <FormLabel>Allergies or Dietary Restrictions</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please list any allergies or dietary restrictions we should be aware of"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-medium">Total Price:</span>
            <span className="text-2xl font-serif font-bold">{form.getValues('price')} MT</span>
          </div>
          
          <Button type="submit" className="w-full">
            Add to Cart
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CupcakeOrderForm;
