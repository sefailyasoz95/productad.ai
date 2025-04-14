import { InitialState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createCheckoutSession,
  getCurrentUser,
  getProducts,
  signInWithGoogle,
  signOut,
} from "./actions";

export const initialState: InitialState = {
  error: false,
  success: false,
  message: "",
  loading: false,
  isAuthenticated: undefined,
  user: undefined,
  products: [],
  checkoutUrl: undefined,
};

export const reducer = createSlice({
  name: "global",
  initialState,
  reducers: {
    authCheck: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder // *********** Login START *********** \\
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        // *********** Login END *********** \\
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isAuthenticated = true;
          state.user = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.products = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.checkoutUrl = action.payload.data;
        }
        state.loading = false;
      });
  },
});

export const { authCheck } = reducer.actions;

export default reducer.reducer;
