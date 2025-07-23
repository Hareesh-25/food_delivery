import { create } from 'zustand';
import { CartItem, MenuItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addItem: (item) => {
    set((state) => {
      // Check if the item already exists with same options
      const existingItemIndex = state.items.findIndex((existingItem) => {
        if (existingItem.menuItem.id !== item.menuItem.id) return false;
        
        // Compare selected options
        if (existingItem.selectedOptions.length !== item.selectedOptions.length) return false;
        
        // Deep comparison of selected options
        const areOptionsEqual = existingItem.selectedOptions.every((existingOption) => {
          const matchingOption = item.selectedOptions.find(
            (option) => option.optionId === existingOption.optionId
          );
          
          if (!matchingOption) return false;
          
          if (existingOption.choiceIds.length !== matchingOption.choiceIds.length) return false;
          
          return existingOption.choiceIds.every(
            (choiceId) => matchingOption.choiceIds.includes(choiceId)
          );
        });
        
        return areOptionsEqual;
      });

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += item.quantity;
        updatedItems[existingItemIndex].totalPrice = 
          updatedItems[existingItemIndex].quantity * 
          updatedItems[existingItemIndex].menuItem.price;
          
        return { items: updatedItems };
      } else {
        // Add as new item
        return { items: [...state.items, item] };
      }
    });
  },
  
  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId)
    }));
  },
  
  updateQuantity: (itemId, quantity) => {
    set((state) => ({
      items: state.items.map((item) => 
        item.id === itemId 
          ? { 
              ...item, 
              quantity: quantity,
              totalPrice: quantity * item.menuItem.price 
            } 
          : item
      )
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getCartTotal: () => {
    return get().items.reduce((total, item) => total + item.totalPrice, 0);
  },
  
  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  }
}));