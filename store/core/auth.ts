import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserType {
  access: string;
  refresh: string;
}

export type authType = {
  data?: UserType;
};

const initialState: authType = {};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.data = action.payload;
    },
    logoutUser: (state) => ({}),
  },
});

export default authSlice.reducer;
export const { setUser, logoutUser } = authSlice.actions;
