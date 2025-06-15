
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
  info: any;
}
const initialState: CustomerState = {
  info: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<any>) => {
      state.info = action.payload;
    },
    clearCustomer: (state) => {
      state.info = null;
    }
  }
});

export const { setCustomer, clearCustomer } = customerSlice.actions;
export default customerSlice.reducer;
