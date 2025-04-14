import { supabase } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
      let subscription = false;
      if (userId) {
        subscription =
          (
            await supabase
              .from("subscriptions")
              .select("subscription_id")
              .eq("user_id", userId)
          ).data.length > 0;
      }
      return {
        success: true,
        message: "",
        data: { ...user, isSubscribed: subscription },
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

export const createCheckoutSession = createAsyncThunk(
  "stripe/createCheckoutSession",
  async (
    data: { userId: string; priceId: string; planType: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_MOBILE_API_URL + "create-checkout-session",
        data
      );
      if (response.status === 200) {
        return {
          success: true,
          message: "",
          data: response.data.url,
        };
      } else {
        return {
          success: false,
          message: "cannot proceed with the payment, try again later",
          data: "",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: "cannot proceed with the payment, try again later",
        data: "",
      };
    }
  }
);

export const getProducts = createAsyncThunk("stripe/products", async () => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_MOBILE_API_URL + "products"
    );
    if (response.status === 200) {
      return {
        success: true,
        message: "",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "plans could not be displayed at the moment",
        data: [],
      };
    }
  } catch (error) {}
});

export const checkSessionId = async (sessionId: string) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_MOBILE_API_URL + "session/" + sessionId
    );
    console.log("response: ", response);

    if (response.status === 200) {
      return {
        success: true,
        message: "",
        data: response.data.paymentSuccess,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
        data: response.data.paymentSuccess,
      };
    }
  } catch (error) {}
};
