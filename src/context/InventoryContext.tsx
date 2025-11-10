import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface InventoryProduct {
  id: number;
  product_name: string;
  description: string;
  unit_price: number;
  quantity: number;
  moq: number;
  lead_time: string;
  service_areas: string[];
  payment_modes: string[];
  seller_note?: string;
  show_in_offers: boolean;
  distributor_id: number;
  distributor_name: string;
  distributor_phone: string;
  created_at: string;
}

export interface UserStock {
  id: number;
  product_name: string;
  quantity: number;
  distributor_name: string;
  received_date: string;
  order_id: number;
}

interface InventoryContextType {
  inventory: InventoryProduct[];
  userStocks: UserStock[];
  addProduct: (product: Omit<InventoryProduct, 'id' | 'created_at'>) => void;
  updateProduct: (productId: number, updates: Partial<InventoryProduct>) => void;
  deleteProduct: (productId: number) => void;
  reduceInventory: (productId: number, quantity: number) => void;
  addToUserStock: (stock: Omit<UserStock, 'id' | 'received_date'>) => void;
  updateUserStock: (stockId: number, updates: Partial<UserStock>) => void;
  getProductsByDistributor: (distributorId: number) => InventoryProduct[];
  getAvailableProducts: () => InventoryProduct[];
  getUserStocks: () => UserStock[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryProduct[]>([
    // Sample data - remove this in production
    // {
    //   id: 1,
    //   product_name: 'Reusable Pads - 8 pack',
    //   description: 'Eco-friendly reusable sanitary pads',
    //   unit_price: 120,
    //   quantity: 150,
    //   moq: 10,
    //   lead_time: '2-4 days',
    //   service_areas: ['Cuttack', 'Khordha', 'Rampur Block'],
    //   payment_modes: ['COD', 'UPI'],
    //   seller_note: 'Free delivery on orders above 20 packs',
    //   show_in_offers: true,
    //   distributor_id: 1,
    //   distributor_name: 'Maa Durga Enterprises',
    //   distributor_phone: '+919876543210',
    //   created_at: new Date().toISOString(),
    // },
    // {
    //   id: 2,
    //   product_name: 'Classic Lays - 52g',
    //   description: 'Crispy potato chips',
    //   unit_price: 125,
    //   quantity: 200,
    //   moq: 5,
    //   lead_time: '1-2 days',
    //   service_areas: ['Cuttack'],
    //   payment_modes: ['COD', 'UPI', 'Netbanking'],
    //   show_in_offers: true,
    //   distributor_id: 2,
    //   distributor_name: 'Sakhi Self Help Group',
    //   distributor_phone: '+919123456789',
    //   created_at: new Date().toISOString(),
    // },
  ]);

  const [userStocks, setUserStocks] = useState<UserStock[]>([]);
  const [nextProductId, setNextProductId] = useState(3);
  const [nextStockId, setNextStockId] = useState(1);

  const addProduct = (product: Omit<InventoryProduct, 'id' | 'created_at'>) => {
    const newProduct: InventoryProduct = {
      ...product,
      id: nextProductId,
      created_at: new Date().toISOString(),
    };
    setInventory((prev) => [newProduct, ...prev]);
    setNextProductId((prev) => prev + 1);
  };

  const updateProduct = (productId: number, updates: Partial<InventoryProduct>) => {
    setInventory((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (productId: number) => {
    setInventory((prev) => prev.filter((product) => product.id !== productId));
  };

  const reduceInventory = (productId: number, quantity: number) => {
    setInventory((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity - quantity) }
          : product
      )
    );
  };

  const addToUserStock = (stock: Omit<UserStock, 'id' | 'received_date'>) => {
    const newStock: UserStock = {
      ...stock,
      id: nextStockId,
      received_date: new Date().toISOString(),
    };
    
    // Check if product already exists in user stock
    const existingStockIndex = userStocks.findIndex(
      (s) => s.product_name === stock.product_name && s.distributor_name === stock.distributor_name
    );

    if (existingStockIndex !== -1) {
      // Update existing stock quantity
      setUserStocks((prev) =>
        prev.map((s, idx) =>
          idx === existingStockIndex
            ? { ...s, quantity: s.quantity + stock.quantity, received_date: new Date().toISOString() }
            : s
        )
      );
    } else {
      // Add new stock
      setUserStocks((prev) => [newStock, ...prev]);
      setNextStockId((prev) => prev + 1);
    }
  };

  const updateUserStock = (stockId: number, updates: Partial<UserStock>) => {
    setUserStocks((prev) =>
      prev.map((stock) =>
        stock.id === stockId ? { ...stock, ...updates } : stock
      )
    );
  };

  const getProductsByDistributor = (distributorId: number) => {
    return inventory.filter((product) => product.distributor_id === distributorId);
  };

  const getAvailableProducts = () => {
    return inventory.filter((product) => product.show_in_offers && product.quantity > 0);
  };

  const getUserStocks = () => {
    return userStocks;
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        userStocks,
        addProduct,
        updateProduct,
        deleteProduct,
        reduceInventory,
        addToUserStock,
        updateUserStock,
        getProductsByDistributor,
        getAvailableProducts,
        getUserStocks,
      }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};