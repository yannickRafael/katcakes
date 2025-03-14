
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomOrder } from '@/types/cake';
import CakeOrderForm from '@/components/order/CakeOrderForm';
import CupcakeOrderForm from '@/components/order/CupcakeOrderForm';
import OtherSweetsForm from '@/components/order/OtherSweetsForm';
import { v4 as uuidv4 } from 'uuid';
import { useFirestoreOrders } from '@/hooks/useFirestoreOrders';
import { useAuth } from '@/contexts/AuthContext';

const OrderPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'cake' | 'cupcake' | 'other'>('cake');
  const { addOrderToFirestore } = useFirestoreOrders();
  const { currentUser } = useAuth();

  const handleAddToCart = async (order: CustomOrder) => {
    // Get existing cart from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('katcakesCart') || '[]');
    
    // Add new order to cart
    const updatedCart = [...existingCart, order];
    
    // Save back to localStorage
    localStorage.setItem('katcakesCart', JSON.stringify(updatedCart));
    
    // Dispatch a custom event to notify the Navbar component
    window.dispatchEvent(new Event('cartUpdated'));
    
    // If user is logged in, also save order to Firestore
    if (currentUser) {
      try {
        await addOrderToFirestore({
          orderDetails: order,
          addedToCart: new Date().toISOString(),
          status: 'cart'
        });
      } catch (error) {
        console.error("Error saving order to Firestore:", error);
      }
    }
    
    // Show success message
    toast({
      title: "Adicionado ao carrinho",
      description: `Seu ${translateCategory(order.category)} personalizado foi adicionado ao carrinho.`,
    });
  };

  const translateCategory = (category: string): string => {
    const translations: Record<string, string> = {
      'cake': 'bolo',
      'cupcake': 'cupcake',
      'other': 'doce'
    };
    
    return translations[category] || category;
  };

  const handleOrderSubmit = (formData: Omit<CustomOrder, 'id'>) => {
    // Create a complete order object with a unique ID
    const completeOrder: CustomOrder = {
      ...formData,
      id: uuidv4(),
    };
    
    // Add to cart
    handleAddToCart(completeOrder);
    
    // Optionally navigate to cart
    if (window.confirm('Item adicionado ao carrinho. Gostaria de ver seu carrinho?')) {
      navigate('/cart');
    }
  };

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="katcakes-container max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Crie Sua Encomenda Personalizada</h1>
        <p className="text-katcakes-gray mb-8">
          Desenhe seu bolo perfeito, cupcakes ou outros doces exatamente como você deseja.
        </p>

        <Tabs defaultValue="cake" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="cake">Bolos</TabsTrigger>
            <TabsTrigger value="cupcake">Cupcakes</TabsTrigger>
            <TabsTrigger value="other">Outros Doces</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cake">
            <CakeOrderForm onSubmit={(data) => handleOrderSubmit({ ...data, category: 'cake' })} />
          </TabsContent>
          
          <TabsContent value="cupcake">
            <CupcakeOrderForm onSubmit={(data) => handleOrderSubmit({ ...data, category: 'cupcake' })} />
          </TabsContent>
          
          <TabsContent value="other">
            <OtherSweetsForm onSubmit={(data) => handleOrderSubmit({ ...data, category: 'other' })} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrderPage;
