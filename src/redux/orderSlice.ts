
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: string;
  status: "pending" | "done" | "paused";
  [key: string]: any;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    markAsDone: (state, action: PayloadAction<string>) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) order.status = "done";
    },
    markAsPaused: (state, action: PayloadAction<string>) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) order.status = "paused";
    },
  }
});
export const { addOrder, setOrders, markAsDone, markAsPaused } = orderSlice.actions;
export default orderSlice.reducer;
