
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import filterReducer from './filterSlice';
import userReducer from './userSlice';
import customerReducer from './clientSlice';
import orderReducer from './orderSlice';
import paymentReducer from './paymentSlice';
import productsReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
    user: userReducer,
    customer: customerReducer,
    order: orderReducer,
    payment: paymentReducer,
    products: productsReducer,
  },
});

// Persist state to localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("reduxState", JSON.stringify(state));
  } catch (e) {
    console.warn("Failed to persist Redux state", e);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
