import { InitialState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInWithGoogle, signOut } from "./actions";
import { supabase } from "@/lib/supabase";

export const initialState: InitialState = {
	error: false,
	success: false,
	message: "",
	loading: false,
	isAuthenticated: false,
	user: undefined,
};

export const reducer = createSlice({
	name: "global",
	initialState,
	reducers: {
		authCheck: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		},
		getCurrentUser: (state) => {
			const userId = supabase.auth.getSession().then((data) => {
				return data.data.session?.user.id;
			});
			state.user = supabase
				.from("users")
				.select("*")
				.eq("id", userId)
				.then((data) => {
					return data.data;
				});
			if (state.user) {
				state.isAuthenticated = true;
			} else {
				state.isAuthenticated = false;
			}
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
			.addCase(signOut.pending, (state) => {});
	},
});

export const { authCheck, getCurrentUser } = reducer.actions;

export default reducer.reducer;
