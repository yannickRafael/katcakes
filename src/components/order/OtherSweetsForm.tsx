
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

const formSchema = z.object({
  details: z.object({
    specialRequests: z.string().min(10, "Por favor forneça mais detalhes sobre seu pedido"),
    allergies: z.string().optional(),
  }),
  price: z.number().default(0),
  quantity: z.number().min(1).max(50),
});

type OtherSweetsFormValues = Omit<CustomOrder, 'id' | 'category'>;

interface OtherSweetsFormProps {
  onSubmit: (data: OtherSweetsFormValues) => void;
}

const OtherSweetsForm = ({ onSubmit }: OtherSweetsFormProps) => {
  const [showPriceNote, setShowPriceNote] = useState(false);
  
  const form = useForm<OtherSweetsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: {
        specialRequests: '',
        allergies: '',
      },
      price: 0, // Will be determined after review
      quantity: 1,
    },
  });

  const handleSubmit = (data: OtherSweetsFormValues) => {
    // Set a temporary price for the cart
    // The actual price will be determined after review
    data.price = 1000; // Minimum price placeholder
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="details.specialRequests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descreva Seu Pedido de Doces</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Por favor descreva em detalhes que tipo de doce você gostaria que criássemos para você"
                  className="min-h-[150px]"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setShowPriceNote(e.target.value.length > 10);
                  }}
                />
              </FormControl>
              <FormDescription>
                Seja o mais específico possível sobre o tipo de doce, sabor, quantidade e quaisquer requisitos especiais.
              </FormDescription>
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
                  max="50" 
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

        {showPriceNote && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-katcakes-gray text-sm">
              O preço para doces personalizados será determinado após analisarmos o seu pedido. 
              Entraremos em contato com um orçamento antes de processar o seu pedido.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <Button type="submit" className="w-full">
            Enviar Pedido
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OtherSweetsForm;
