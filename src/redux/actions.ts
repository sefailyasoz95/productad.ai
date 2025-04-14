import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInWithGoogle = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signInWitApple = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signInWithEmail = createAsyncThunk(
  "auth/signInEmail",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const { error: signinError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (signinError) {
        return {
          success: false,
          message: signinError.message,
        };
      }
      return {
        success: true,
        message: "sign in success",
      };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return {
        success: false,
        message: message,
      };
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async (_, thunkAPI) => {
  try {
    await supabase.auth.signOut({ scope: "global" });
    return {
      success: true,
      message: "sign out success",
    };
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const userId = await supabase.auth.getSession().then((data) => {
        return data.data.session?.user.id;
      });
      const user = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single()
        .then((data) => {
          return data.data;
        });
      return {
        success: true,
        message: "",
        data: user,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "cannot get user",
        data: undefined,
      };
    }
  }
);
