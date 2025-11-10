import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Linking } from 'react-native';

export interface Order {
  id: number;
  orderer_name: string;
  orderer_type: string;
  product_name: string;
  product_id?:number;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  distributor_name: string;
  distributor_phone: string;
  status: 'placed' | 'accepted' | 'dispatched' | 'delivered';
  created_at: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'created_at' | 'status'>) => void;
  updateOrderStatus: (orderId: number, status: Order['status']) => void;
  updateOrderDetails: (orderId: number, details: Partial<Order>) => void;
  getOrdersByStatus: (status: Order['status']) => Order[];
  makeCall: (phone: string, distributorName: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [nextId, setNextId] = useState(1);

  const addOrder = (order: Omit<Order, 'id' | 'created_at' | 'status'>) => {
    const newOrder: Order = {
      ...order,
      id: nextId,
      status: 'placed',
      created_at: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setNextId((prev) => prev + 1);
  };

  const updateOrderStatus = (orderId: number, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const updateOrderDetails = (orderId: number, details: Partial<Order>) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, ...details } : order
      )
    );
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter((order) => order.status === status);
  };

  const makeCall = (phone: string, distributorName: string) => {
    // Open dialer with the phone number
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        updateOrderDetails,
        getOrdersByStatus,
        makeCall,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};