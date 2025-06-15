
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  search: string;
  category: string | null;
}

const initialState: FilterState = {
  search: "",
  category: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    resetFilter: (state) => {
      state.search = "";
      state.category = null;
    }
  },
});

export const { setSearch, setCategory, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
