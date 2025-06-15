import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  street: string;
  city: string;
  zipCode: string;
  buildingNumber: string;
}

interface Client {
  clientId: number | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: Address;
}
export type AddressKeys = keyof Address; 
export type ClientPrimitiveKeys = Exclude<{
  [K in keyof Client]: Client[K] extends object ? never : K
}[keyof Client], undefined>;

interface ClientState {
  client: Client;
}

const initialState: ClientState = {
  client: {
    clientId: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
      buildingNumber: "",
    },
  },
  
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<Client>) => {
      state.client = action.payload;
    },
    setClientField: <K extends ClientPrimitiveKeys>(state: ClientState, action: PayloadAction<{ field: K; value: Client[K] }>) => {
  const { field, value } = action.payload;
  state.client[field] = value;
    },
    setAddressField: (state, action: PayloadAction<{ field: keyof Address; value: string }>) => {
      const { field, value } = action.payload;
      state.client.address[field] = value;
    },
  },
});

export const { setClient, setClientField, setAddressField } = clientSlice.actions;
export default clientSlice.reducer;
