
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  price: number;
  available: boolean;
  [key: string]: any;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchDataAsyncAction = createAsyncThunk(
  'products/fetchData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://localhost:7172/api/Product/GetAllProducts');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const idx = state.items.findIndex(p => p.id === action.payload.id);
      if (idx >= 0) {
        state.items[idx] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsyncAction.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchDataAsyncAction.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDataAsyncAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setProducts, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
