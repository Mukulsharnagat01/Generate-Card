import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { BusinessCardData } from "@/components/BusinessCardForm";
import { useAuth } from './AuthContext';
import axios from 'axios';

export type CartItem = {
  id: string;
  kind: "classic" | "server";
  data: BusinessCardData;
  selectedFont: string;
  fontSize: number;
  textColor: string;
  accentColor: string;
  price: number;
  serverMeta?: {
    name?: string;
    background_url?: string | null;
    back_background_url?: string | null;
    config?: any;
  };
  saveAsTemplate?: boolean;
  templateName?: string | null;
  frontData?: any | null;
  backData?: any | null;
  frontImageUrl?: string | null;
  backImageUrl?: string | null;
  thumbnailUrl?: string | null;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'id'> & { id?: string }) => Promise<void>;
  remove: (id: string) => Promise<void>;
  update: (id: string, patch: Partial<CartItem>) => Promise<void>;
  clear: () => Promise<void>;
  total: number;
  isLoading: boolean;
  generateCardImages: (itemData: any, templateId: string) => Promise<{ frontUrl: string; backUrl: string }>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load cart from API when user changes
  useEffect(() => {
    if (!user) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    const loadCart = async () => {
      try {
        const { data } = await axios.get('/api/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load cart:', error);
        setItems([]); // Ensure we always have an array
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to API
  const saveCartToApi = async (itemsToSave: CartItem[]) => {
    if (!user) return;

    try {
      await axios.put(
        '/api/cart',
        { items: itemsToSave },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
    } catch (error) {
      console.error('Failed to save cart:', error);
      throw error;
    }
  };

  const add = async (itemData: Omit<CartItem, 'id'> & { id?: string }) => {
    const id = itemData.id || `card_${Date.now()}`;
    const newItem = {
      ...itemData as CartItem,
      id,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    await saveCartToApi(updatedItems);
  };

  const remove = async (id: string) => {
    const updatedItems = items.filter((x) => x.id !== id);
    setItems(updatedItems);
    await saveCartToApi(updatedItems);
  };

  const update = async (id: string, patch: Partial<CartItem>) => {
    const updatedItems = items.map((it) =>
      it.id === id ? { ...it, ...patch } : it
    );
    setItems(updatedItems);
    await saveCartToApi(updatedItems);
  };

  const clear = async () => {
    setItems([]);
    await saveCartToApi([]);
  };

  // const total = useMemo(() => 
  //   items.reduce((sum, item) => sum + (item.price || 0), 0), 
  //   [items]
  // );
  const total = useMemo(() => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => sum + (item?.price || 0), 0);
  }, [items]);

  // Generate card images (placeholder implementation)
  const generateCardImages = async (itemData: any, templateId: string) => {
    return {
      frontUrl: `https://via.placeholder.com/560x320/ffffff/000000?text=Front+Side`,
      backUrl: `https://via.placeholder.com/560x320/ffffff/000000?text=Back+Side`
    };
  };

  const value = useMemo(() => ({
    items,
    add,
    remove,
    update,
    clear,
    total,
    isLoading,
    generateCardImages
  }), [items, total, isLoading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}