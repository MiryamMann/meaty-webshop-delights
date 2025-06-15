import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  clientId: string | null;
  addressId: string | null;
  token: string | null;
  refreshToken: string | null;
  client: any;
  isAuthenticated: boolean;
  redirectTarget: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  clientId: null,
  addressId: null,
  token: localStorage.getItem("token") || null,
  refreshToken: null,
  client: null,
  isAuthenticated: false,
  redirectTarget: null,
  loading: false,
  error: null,
};

// Async Thunks
export const loginWithGoogle = createAsyncThunk(
  'auth/googleLogin',
  async (googleToken: string, thunkAPI) => {
    try {
      const response = await axios.post('https://localhost:7172/api/Client/google', {
        idToken: googleToken,
      });
      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const SignUp = createAsyncThunk(
  'auth/signUp',
  async (form: any, thunkAPI) => {
    try {
      const response = await axios.post('https://localhost:7172/api/auth/SignUp', form);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<Partial<UserState>>) => {
      const { clientId, token, refreshToken, addressId, client } = action.payload;
      state.clientId = clientId ?? null;
      state.token = token ?? null;
      state.refreshToken = refreshToken ?? null;
      state.addressId = addressId ?? null;
      state.client = client ?? null;
      state.isAuthenticated = true;
    },
    clearClient: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("token");
    },
    setAuthRedirectTarget: (state, action: PayloadAction<string>) => {
      state.redirectTarget = action.payload;
    },
    clearRedirectTarget: (state) => {
      state.redirectTarget = null;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.client = action.payload;
    },
    logout: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.client = action.payload;
        state.token = action.payload?.accessToken || null;
        state.isAuthenticated = true;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(SignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SignUp.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  setClient,
  clearClient,
  setAuthRedirectTarget,
  clearRedirectTarget,
  setUser,
  logout
} = userSlice.actions;

export default userSlice.reducer;
