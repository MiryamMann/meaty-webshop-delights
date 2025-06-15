// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import clientReducer from './clientSlice';
import filterReducer from './filterSlice';
import orderReducer from './orderSlice';
import paymentReducer from './paymentSlice';
import productsReducer from './productsSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    client: clientReducer,
    filter: filterReducer,
    order: orderReducer,
    payment: paymentReducer,
    products: productsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
