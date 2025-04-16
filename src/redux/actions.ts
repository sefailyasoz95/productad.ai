import { Buffer } from "buffer";
import { gemini } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";
import { UserType } from "@/lib/types";
import { ContentListUnion, Modality, Content } from "@google/genai";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const signInWithGoogle = createAsyncThunk("auth/login", async (data, thunkAPI) => {
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
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const signInWitApple = createAsyncThunk("auth/login", async (data, thunkAPI) => {
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
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

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
				(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
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
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, thunkAPI) => {
	try {
		const userId = await supabase.auth.getSession().then((data) => {
			return data.data.session?.user.id;
		});
		console.log("userId:", userId);

		const user = await supabase
			.from("users")
			.select("*")
			.eq("id", userId)
			.single()
			.then((data) => {
				return data.data;
			});
		let subscription: any = null;
		if (userId) {
			subscription = await supabase
				.from("subscriptions")
				.select("plan")
				.eq("user_id", userId)
				.gt("end_date", new Date().toISOString())
				.single();
		}
		return {
			success: true,
			message: "",
			data: { ...user, isSubscribed: subscription?.data?.plan || "" },
		};
	} catch (error: any) {
		return {
			success: false,
			message: "cannot get user",
			data: undefined,
		};
	}
});

export const createCheckoutSession = createAsyncThunk(
	"stripe/createCheckoutSession",
	async (data: { userId: string; priceId: string; planType: string }, thunkAPI) => {
		try {
			const response = await axios.post(import.meta.env.VITE_MOBILE_API_URL + "create-checkout-session", data);
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
		const response = await axios.get(import.meta.env.VITE_MOBILE_API_URL + "products");

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
		const response = await axios.get(import.meta.env.VITE_MOBILE_API_URL + "session/" + sessionId);
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

export const getAllInfluencers = createAsyncThunk("influencers/getAllInfluencers", async () => {
	try {
		const { data, error } = await supabase.from("influencers").select("*").order("name");

		if (error) {
			console.error("Error fetching influencers:", error);
			return { data: [], success: false, message: "" };
		}

		return { data, success: true, message: "" };
	} catch (error) {
		return { data: [], success: false, message: "" };
	}
});
export const createInfluencer = createAsyncThunk("influencers/createInfluencer", async (influencerData: any) => {
	try {
		const response = await supabase.storage
			.from("images")
			.upload("influencers/" + influencerData.name, influencerData.images, {
				cacheControl: "3600",
				upsert: false,
			});
		if (response.error) {
			return { data: undefined, success: false, message: response.error.message };
		}
		const { data: imageData } = await supabase.storage
			.from("images")
			.getPublicUrl("influencers/" + influencerData.name);
		const { images, ...rest } = influencerData;
		const { data, error } = await supabase
			.from("influencers")
			.insert([{ ...influencerData, images: [imageData.publicUrl] }])
			.select();

		if (error) {
			return { data: undefined, success: false, message: error.message };
		}

		return { data: undefined, success: true, message: "created successfully" };
	} catch (error) {
		return { data: undefined, success: false, message: "create failed" };
	}
});
export const updateInfluencer = createAsyncThunk(
	"influencers/updateInfluencer",
	async (id: string, updateData: any) => {
		try {
			const { data, error } = await supabase.from("influencers").update(updateData).eq("id", id).select();

			if (error) {
				return { data: undefined, success: false, message: error.message };
			}

			return { data: undefined, success: true, message: "updated successfully" };
		} catch (error) {
			return { data: undefined, success: false, message: "update failed" };
		}
	}
);

export const updateUser = createAsyncThunk("users/updateUser", async (updateData: Partial<UserType>) => {
	try {
		const { id, ...rest } = updateData;

		const { data, error } = await supabase
			.from("users")
			.update({ ...rest })
			.eq("id", id);
		console.log("error: ", error);
		console.log("data: ", data);

		if (error) {
			return { data: undefined, success: false, message: error.message };
		}

		return { data: undefined, success: true, message: "updated successfully" };
	} catch (error) {
		return { data: undefined, success: false, message: "update failed" };
	}
});

export const generateImage = createAsyncThunk("ai/generateImage", async (data: { file?: File; prompt: string }) => {
	try {
		const base64Image = await convertToBase64(data.file);

		// Prepare the content parts
		const contents: ContentListUnion = [
			{ text: data.prompt },
			{
				inlineData: {
					mimeType: "image/png",
					data: base64Image,
				},
			},
		];
		const response = await gemini.models.generateContent({
			model: "gemini-2.0-flash-exp-image-generation",
			contents,
			config: {
				responseModalities: [Modality.TEXT, Modality.IMAGE],
			},
		});
		for (const part of response.candidates[0].content.parts) {
			// Based on the part type, either show the text or save the image
			if (part.inlineData) {
				const imageData = part.inlineData.data;
				return {
					data: `data:image/png;base64,${imageData}`,
					success: true,
					message: "image generated successfully",
				};
			} else {
				return {
					data: "",
					success: false,
					message: "image generation failed",
				};
			}
		}
	} catch (error) {
		console.log("error:", error);

		return {
			data: "",
			success: false,
			message: "cannot generate image",
		};
	}
});
const convertToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			const result = reader.result as string;
			const base64String = result.split(",")[1]; // Remove the data URL prefix
			resolve(base64String);
		};

		reader.onerror = () => {
			reject(new Error("Failed to read file"));
		};

		reader.readAsDataURL(file);
	});
};
// Example 11: Add an image to an influencer's image array
// export async function addInfluencerImage(id: string, imageUrl: string) {
//   // First get the current images array
//   const { data: influencer, error: fetchError } = await supabase
//     .from('influencers')
//     .select('images')
//     .eq('id', id)
//     .single();

//   if (fetchError) {
//     console.error(`Error fetching influencer images for ID ${id}:`, fetchError);
//     throw fetchError;
//   }

//   // Append the new image URL to the existing array
//   const updatedImages = [...(influencer.images || []), imageUrl];

//   // Update the record with the new images array
//   const { error: updateError } = await supabase
//     .from('influencers')
//     .update({ images: updatedImages })
//     .eq('id', id);

//   if (updateError) {
//     console.error(`Error adding image to influencer ID ${id}:`, updateError);
//     throw updateError;
//   }

//   return updatedImages;
// }
