// src/redux/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  pricePerKilo: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ✅ טיפוס מלא כולל quantity
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const price = Number(item.pricePerKilo);
      if (isNaN(price)) {
        console.error("❌ Invalid price:", item.pricePerKilo);
        return;
      }

      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push({ ...item, pricePerKilo: price });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },

    increaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Number(item.quantity) + 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity = Number(item.quantity) - 1;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
