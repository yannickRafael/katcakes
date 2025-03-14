
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  details: z.object({
    shape: z.enum(['round', 'rectangle']),
    size: z.enum(['15cm', '18cm', '20cm', '22cm', '30cm']),
    flavor: z.string().min(1, "Por favor selecione um sabor"),
    filling: z.string().min(1, "Por favor selecione um recheio"),
    topping: z.enum(['marzipan', 'ganache', 'buttercream']),
    specialRequests: z.string().optional(),
    allergies: z.string().optional(),
  }),
  price: z.number().min(1000),
  quantity: z.number().min(1).max(10),
});

type CakeOrderFormValues = Omit<CustomOrder, 'id' | 'category'>;

interface CakeOrderFormProps {
  onSubmit: (data: CakeOrderFormValues) => void;
}

const FLAVORS = [
  "Baunilha", "Chocolate", "Red Velvet", "Limão", "Cenoura", 
  "Café", "Coco", "Morango", "Laranja", "Banana"
];

const FILLINGS = [
  "Creme de Baunilha", "Ganache de Chocolate", "Cream Cheese", "Doce de Leite",
  "Creme de Limão", "Geléia de Morango", "Geléia de Framboesa", "Creme de Chocolate", "Creme de Café"
];

// Price calculation based on size
const SIZE_PRICES = {
  '15cm': 2500,
  '18cm': 3000,
  '20cm': 3500,
  '22cm': 4000,
  '30cm': 5500,
};

const CakeOrderForm = ({ onSubmit }: CakeOrderFormProps) => {
  const [calculatedPrice, setCalculatedPrice] = useState(SIZE_PRICES['20cm']);
  
  const form = useForm<CakeOrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: {
        shape: 'round',
        size: '20cm',
        flavor: FLAVORS[0],
        filling: FILLINGS[0],
        topping: 'buttercream',
        specialRequests: '',
        allergies: '',
      },
      price: SIZE_PRICES['20cm'],
      quantity: 1,
    },
  });

  const handleSizeChange = (size: string) => {
    const newPrice = SIZE_PRICES[size as keyof typeof SIZE_PRICES];
    setCalculatedPrice(newPrice);
    form.setValue('price', newPrice * form.getValues('quantity'));
  };

  const handleQuantityChange = (qty: number) => {
    const size = form.getValues('details.size');
    const basePrice = SIZE_PRICES[size as keyof typeof SIZE_PRICES];
    setCalculatedPrice(basePrice);
    form.setValue('price', basePrice * qty);
  };

  const translateToppingOptions = (option: string): string => {
    const translations: Record<string, string> = {
      'marzipan': 'Pasta Americana',
      'ganache': 'Ganache',
      'buttercream': 'Creme de Manteiga'
    };
    
    return translations[option] || option;
  };

  const translateShape = (shape: string): string => {
    const translations: Record<string, string> = {
      'round': 'Redondo',
      'rectangle': 'Retangular'
    };
    
    return translations[shape] || shape;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="details.shape"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Formato do Bolo</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="round" id="shape-round" />
                        <FormLabel htmlFor="shape-round" className="font-normal cursor-pointer">Redondo</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rectangle" id="shape-rectangle" />
                        <FormLabel htmlFor="shape-rectangle" className="font-normal cursor-pointer">Retangular</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details.size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleSizeChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="15cm">15cm</SelectItem>
                      <SelectItem value="18cm">18cm</SelectItem>
                      <SelectItem value="20cm">20cm</SelectItem>
                      <SelectItem value="22cm">22cm</SelectItem>
                      <SelectItem value="30cm">30cm</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </div>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="details.filling"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recheio</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o recheio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FILLINGS.map((filling) => (
                        <SelectItem key={filling} value={filling}>{filling}</SelectItem>
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
                <FormItem className="space-y-3">
                  <FormLabel>Cobertura</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="marzipan" id="topping-marzipan" />
                        <FormLabel htmlFor="topping-marzipan" className="font-normal cursor-pointer">Pasta Americana</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ganache" id="topping-ganache" />
                        <FormLabel htmlFor="topping-ganache" className="font-normal cursor-pointer">Ganache</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="buttercream" id="topping-buttercream" />
                        <FormLabel htmlFor="topping-buttercream" className="font-normal cursor-pointer">Creme de Manteiga</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      max="10" 
                      {...field} 
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        field.onChange(value);
                        handleQuantityChange(value);
                      }} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="details.specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pedidos Especiais & Decoração</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Por favor descreva quaisquer decorações específicas ou pedidos especiais que você tenha para o seu bolo"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Informe-nos sobre quaisquer decorações, temas ou mensagens que você gostaria em seu bolo.
                </FormDescription>
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
        </div>

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

export default CakeOrderForm;
