
import { useAuth } from "@/contexts/AuthContext";
import { saveOrder, getUserOrders, OrderData } from "@/lib/firebase";
import { toast } from "sonner";
import { useCallback } from "react";

export function useFirestoreOrders() {
  const { currentUser } = useAuth();

  // Add an order to Firestore
  const addOrderToFirestore = useCallback(async (orderData: Omit<OrderData, 'userId' | 'createdAt' | 'status'>) => {
    if (!currentUser) {
      toast.error("Você precisa estar logado para fazer um pedido");
      return null;
    }

    try {
      const result = await saveOrder(currentUser.uid, orderData);
      return result;
    } catch (error: any) {
      toast.error(`Erro ao salvar pedido: ${error.message}`);
      console.error("Error saving order:", error);
      return null;
    }
  }, [currentUser]);

  // Get all orders for the current user
  const getUserOrdersFromFirestore = useCallback(async (): Promise<Array<OrderData & { id: string }>> => {
    if (!currentUser) {
      return [];
    }

    try {
      const orders = await getUserOrders(currentUser.uid);
      return orders;
    } catch (error: any) {
      toast.error(`Erro ao buscar pedidos: ${error.message}`);
      console.error("Error fetching orders:", error);
      return [];
    }
  }, [currentUser]);

  return {
    addOrderToFirestore,
    getUserOrdersFromFirestore
  };
}
