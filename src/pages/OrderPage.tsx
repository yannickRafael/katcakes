
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomOrder } from '@/types/cake';
import CakeOrderForm from '@/components/order/CakeOrderForm';
import CupcakeOrderForm from '@/components/order/CupcakeOrderForm';
import OtherSweetsForm from '@/components/order/OtherSweetsForm';
import { v4 as uuidv4 } from 'uuid';

const OrderPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'cake' | 'cupcake' | 'other'>('cake');

  const handleAddToCart = (order: CustomOrder) => {
    // Get existing cart from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('katcakesCart') || '[]');
    
    // Add new order to cart
    const updatedCart = [...existingCart, order];
    
    // Save back to localStorage
    localStorage.setItem('katcakesCart', JSON.stringify(updatedCart));
    
    // Show success message
    toast({
      title: "Added to cart",
      description: `Your custom ${order.category} has been added to your cart.`,
    });
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
    if (window.confirm('Item added to cart. Would you like to view your cart?')) {
      navigate('/cart');
    }
  };

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="katcakes-container max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Create Your Custom Order</h1>
        <p className="text-katcakes-gray mb-8">
          Design your perfect cake, cupcakes, or other sweet treats exactly how you want them.
        </p>

        <Tabs defaultValue="cake" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="cake">Cakes</TabsTrigger>
            <TabsTrigger value="cupcake">Cupcakes</TabsTrigger>
            <TabsTrigger value="other">Other Sweets</TabsTrigger>
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
