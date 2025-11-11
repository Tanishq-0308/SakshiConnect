// src/api/client.ts
import { getApiUrl } from "../config/ApiConfig";
// const API_BASE_URL = 'http://192.168.1.42:8000'; // Replace with YOUR laptop IP

let cachedBaseUrl: string | null = null;

const getBaseUrl = async (): Promise<string> => {
  if (!cachedBaseUrl) {
    cachedBaseUrl = await getApiUrl();
  }
  return cachedBaseUrl;
};


export interface Product {
  id: number;
  distributor_id: string;
  product_name: string;
  category?: string;
  price: number;
  moq: number;
  lead_time?: string;
  service_areas: string[];
  payment_modes: string[];
  stock_quantity: number;
  is_enabled: boolean;
  image_url?: string;
  created_at: string;
}

export interface Order {
  id: number;
  order_id: string;
  user_id: string;
  distributor_id: string;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  total_amount: number;
  status: 'pending' | 'accepted' | 'dispatched' | 'delivered';
  payment_mode: string;
  delivery_address: string;
  created_at: string;
}

export interface Stock {
  id: number;
  user_id: string;
  product_name: string;
  category?: string;
  quantity: number;
  last_updated: string;
}

// ============================================
// INVENTORY APIs
// ============================================

export const addProductToInventory = async (product: {
  distributor_id: string;
  product_name: string;
  category?: string;
  price: number;
  moq: number;
  lead_time?: string;
  service_areas: string[];
  payment_modes: string[];
  stock_quantity: number;
  is_enabled: boolean;
  image_url?: string;
}): Promise<Product> => {
  const API_BASE_URL = await getBaseUrl();
  const response = await fetch(`${API_BASE_URL}/api/inventory/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add product');
  }
  
  return response.json();
};

export const getInventory = async (
  distributorId?: string,
  enabledOnly: boolean = false
): Promise<Product[]> => {
  const API_BASE_URL = await getBaseUrl();
  let url = `${API_BASE_URL}/api/inventory?`;
  if (distributorId) url += `distributor_id=${distributorId}&`;
  if (enabledOnly) url += `enabled_only=true`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch inventory');
  }
  
  return response.json();
};

export const updateProduct = async (
  productId: number,
  updates: Partial<Product>
): Promise<Product> => {
  const API_BASE_URL = await getBaseUrl();
  const response = await fetch(`${API_BASE_URL}/api/inventory/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  
  return response.json();
};

export const deleteProduct = async (productId: number): Promise<void> => {
  const API_BASE_URL = await getBaseUrl();
  const response = await fetch(`${API_BASE_URL}/api/inventory/${productId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};

// ============================================
// ORDER APIs
// ============================================

export const createOrder = async (order: {
  user_id: string;
  distributor_id: string;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  payment_mode: string;
  delivery_address: string;
}): Promise<Order> => {
  const API_BASE_URL = await getBaseUrl();
  const response = await fetch(`${API_BASE_URL}/api/orders/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create order');
  }
  
  return response.json();
};

export const getOrders = async (
  distributorId?: string,
  userId?: string,
  status?: string
): Promise<Order[]> => {
  const API_BASE_URL = await getBaseUrl();
  let url = `${API_BASE_URL}/api/orders?`;
  if (distributorId) url += `distributor_id=${distributorId}&`;
  if (userId) url += `user_id=${userId}&`;
  if (status) url += `status=${status}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  
  return response.json();
};

export const acceptOrder = async (orderId: string): Promise<Order> => {
  const API_BASE_URL = await getBaseUrl();
  const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/accept`, {
    method: 'PUT',
  });
  
  if (!response.ok) {
    throw new Error('Failed to accept order');
  }
  
  return response.json();
};

export const dispatchOrder = async (orderId: string): Promise<Order> => {
  const API_BASE_URL = await getBaseUrl();
  const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/dispatch`, {
    method: 'PUT',
  });
  
  if (!response.ok) {
    throw new Error('Failed to dispatch order');
  }
  
  return response.json();
};

export const deliverOrder = async (orderId: string): Promise<Order> => {
  const API_BASE_URL = await getBaseUrl();
  const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/deliver`, {
    method: 'PUT',
  });
  
  if (!response.ok) {
    throw new Error('Failed to deliver order');
  }
  
  return response.json();
};

// ============================================
// STOCK APIs
// ============================================

export const getUserStock = async (userId: string): Promise<Stock[]> => {
  const API_BASE_URL = await getBaseUrl();
  const response = await fetch(`${API_BASE_URL}/api/stock?user_id=${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch stock');
  }
  
  return response.json();
};

export const updateStock = async (
  stockId: number,
  quantity: number
): Promise<Stock> => {
  const API_BASE_URL = await getBaseUrl();
  const response = await fetch(`${API_BASE_URL}/api/stock/${stockId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update stock');
  }
  
  return response.json();
};