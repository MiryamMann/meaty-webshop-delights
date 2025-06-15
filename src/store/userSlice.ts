
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const loginWithGoogle = createAsyncThunk(
  'auth/googleLogin',
  async (googleToken: string, thunkAPI) => {
    try {
      const response = await axios.post('https://localhost:7172/api/Client/google', {
        idToken: googleToken
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload?.accessToken || null;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string;
      })
      .addCase(SignUp.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(SignUp.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false; state.user = action.payload;
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string;
      });
  }
});
export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
