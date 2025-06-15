
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const processPayment = createAsyncThunk(
  'payment/process',
  async (orderData: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("https://localhost:7172/api/Client/Payment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error("Error in payment process");
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface PaymentState {
  loading: boolean;
  error: string | null;
  result: any;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  result: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.result = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});
export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
