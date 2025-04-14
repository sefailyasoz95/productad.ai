import { InitialState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser, signInWithGoogle, signOut } from "./actions";
import { supabase } from "@/lib/supabase";

export const initialState: InitialState = {
  error: false,
  success: false,
  message: "",
  loading: false,
  isAuthenticated: undefined,
  user: undefined,
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
      });
  },
});

export const { authCheck } = reducer.actions;

export default reducer.reducer;
