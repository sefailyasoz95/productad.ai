import { createWriteStream } from "fs";
import { Readable } from "stream";
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
			return {
				data: undefined,
				success: false,
				message: response.error.message,
			};
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

		return {
			data: undefined,
			success: true,
			message: "created successfully",
		};
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

			return {
				data: undefined,
				success: true,
				message: "updated successfully",
			};
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

		return {
			data: undefined,
			success: true,
			message: "updated successfully",
		};
	} catch (error) {
		return { data: undefined, success: false, message: "update failed" };
	}
});

export const generateImage = createAsyncThunk(
	"ai/generateImage",
	async (data: {
		file: File;
		description: string;
		photoStyle: string;
		productName: string;
		sceneDescription: string;
		publicAllowed: boolean;
		influencerImage: string | null;
		influencer_id: string | null;
	}) => {
		try {
			const prompt = `You're a professional ad and commercial photographer, the best advertiser in the whole universe. 
      Based on shared product image and this scene description: "${data.description}" and this photo style: "${
				data.photoStyle
			}" generate an image. ${
				data.influencerImage ? "The person in the given image must be introducing the product." : ""
			} Product called "${data.productName}" and this is product description: "${
				data.sceneDescription
			}". Make sure product and product name clearly visible in the image. 
      If request is NSFW or irrelevant with commercials / ads, generate a black backgrounded image and with white text that says "CANNOT GENERATE IRRELEVANT CONTENT" `;
			let base64Image = "";
			let originalImageURL = "";
			let influencerImageBase64 = "";
			if (data.influencerImage) {
				influencerImageBase64 = await imageUrlToBase64(data.influencerImage);
				console.log("influencerImageBase64: ", influencerImageBase64);
			}
			if (data.file) {
				base64Image = await convertToBase64(data.file);
				originalImageURL =
					(await uploadBase64ImageToSupabase(base64Image, "original-images", data.productName.replace(" ", ""))).data ??
					"";
			}

			// Prepare the content parts
			let contents: ContentListUnion = [{ text: prompt }];
			if (data.file) {
				contents.push({
					inlineData: {
						mimeType: "image/png",
						data: base64Image,
					},
				});
			}
			if (influencerImageBase64) {
				contents.push({
					inlineData: {
						mimeType: "image/png",
						data: influencerImageBase64,
					},
				});
			}
			const response = await gemini.models.generateContent({
				model: "gemini-2.0-flash-exp-image-generation",
				contents,
				config: {
					responseModalities: [Modality.TEXT, Modality.IMAGE],
				},
			});
			let responseMessage = "";
			if (response.candidates[0].finishReason === "IMAGE_SAFETY") {
				return {
					data: "",
					success: false,
					message: "due to safety issues, image could not be genereated",
				};
			}
			for (const part of response.candidates[0].content.parts) {
				// Based on the part type, either show the text or save the image
				if (part.inlineData) {
					const imageData = part.inlineData.data;
					responseMessage = "image generated successfully";
					const generatedUpload = await uploadBase64ImageToSupabase(
						imageData,
						"images",
						data.productName.replace(" ", "")
					);
					if (generatedUpload.success) {
						const user_id = (await supabase.auth.getSession()).data.session.user.id;
						const insertGeneratedImageResponse = await supabase
							.from("images")
							.insert({
								user_id,
								image_url: generatedUpload.data,
								description: prompt,
								original_image_url: originalImageURL,
								public_allowed: data.publicAllowed,
								product_name: data.productName,
								influencer_id: data.influencer_id,
							})
							.select();
						if (insertGeneratedImageResponse.error) {
							responseMessage += " but it could not be saved into the history";
						} else {
							const insertGeneratedHistoryResponse = await supabase.from("history").insert({
								user_id,
								action_type: "image_generation",
								image_id: insertGeneratedImageResponse.data[0].image_id,
							});
							if (insertGeneratedHistoryResponse.error) {
								responseMessage += " but it could not be saved into the history";
							}
						}
					} else {
						responseMessage += " but it could not be saved into the history";
					}
					return {
						data: generatedUpload.data,
						success: true,
						message: responseMessage,
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
	}
);
// Things to try
// To get the most out of Veo, incorporate video-specific terminology into your prompts. Veo understands a wide range of terms related to:

// Shot composition: Specify the framing and number of subjects in the shot (e.g., "single shot," "two shot," "over-the-shoulder shot").
// Camera positioning and movement: Control the camera's location and movement using terms like "eye level," "high angle," "worms eye," "dolly shot," "zoom shot," "pan shot," and "tracking shot."
// Focus and lens effects: Use terms like "shallow focus," "deep focus," "soft focus," "macro lens," and "wide-angle lens" to achieve specific visual effects.
// Overall style and subject: Guide Veo's creative direction by specifying styles like "sci-fi," "romantic comedy," "action movie," or "animation." You can also describe the subjects and backgrounds you want, such as "cityscape," "nature," "vehicles," or "animals."
export const generateVideo = createAsyncThunk(
	"ai/generateVideo",
	async (data: {
		productImage: string;
		description: string;
		productName: string;
		sceneDescription: string;
		publicAllowed: boolean;
		influencerId?: string;
		aspectRatio: "16:9" | "9:16";
	}) => {
		try {
			let image = "";
			if (!data.influencerId) {
				const generatedUpload = await uploadBase64ImageToSupabase(
					data.productImage,
					"images",
					data.productName.replace(" ", "")
				);
				if (generatedUpload.success) image = generatedUpload.data;
			} else image = data.productImage;
			const response = await axios.post(import.meta.env.VITE_MOBILE_API_URL_LOCAL + "generate-video", {
				...data,
				productImage: image,
			});
			if (response.status === 200) {
				return {
					data: response.data,
					success: true,
					message: "",
				};
			}
			return {
				data: undefined,
				success: false,
				message: "video generation failed",
			};
		} catch (error) {
			console.log("error:", error);

			return {
				data: undefined,
				success: false,
				message: "video generation failed",
			};
		}
	}
);

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

export const getRecentGenerations = createAsyncThunk("recent/getRecentGenerations", async (limit?: number) => {
	try {
		const user_id = (await supabase.auth.getSession()).data.session.user.id;
		const { data, error } = await supabase
			.from("history")
			.select(
				`
        *,
        images:image_id (*)
      `
			)
			.eq("user_id", user_id)
			.order("history_id", { ascending: false })
			.limit(limit === undefined ? 1000 : limit);

		if (error) {
			return { data: [], success: false, message: error.message };
		}

		return {
			data,
			success: true,
			message: "",
		};
	} catch (error) {
		return {
			data: [],
			success: false,
			message: "could not get the recent generations!",
		};
	}
});

export const updateImageLike = createAsyncThunk(
	"image/updateImageLike",
	async (updateData: { liked: boolean; image_url: string }) => {
		try {
			const { data, error } = await supabase
				.from("images")
				.update({ liked: updateData.liked })
				.eq("image_url", updateData.image_url);

			if (error) {
				return { data: undefined, success: false, message: error.message };
			}

			return {
				data: undefined,
				success: true,
				message: "thanks for the feedback!",
			};
		} catch (error) {
			return { data: undefined, success: false, message: "update failed" };
		}
	}
);

async function uploadBase64ImageToSupabase(base64Image: string, bucketName: string, fileName: string) {
	// Use provided client or default supabase client

	// Strip the data URI prefix if present (e.g., "data:image/jpeg;base64,")
	const base64Data = base64Image.includes("base64,") ? base64Image.split("base64,")[1] : base64Image;

	// Determine file extension from data URI or default to .png
	let fileExtension = ".png";
	if (base64Image.includes("data:image/")) {
		const mimeType = base64Image.split(";")[0].split(":")[1];
		if (mimeType === "image/jpeg") fileExtension = ".jpg";
		else if (mimeType === "image/png") fileExtension = ".png";
		else if (mimeType === "image/gif") fileExtension = ".gif";
		else if (mimeType === "image/webp") fileExtension = ".webp";
	}

	// Generate a random filename if not provided
	const actualFileName = `${fileName}-${Date.now()}-${fileExtension}`;

	// Convert base64 to Blob
	const byteCharacters = atob(base64Data);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
		const slice = byteCharacters.slice(offset, offset + 512);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: "image/png" });

	// Upload to Supabase Storage
	const { data, error } = await supabase.storage.from(bucketName).upload(`${actualFileName}`, blob, {
		contentType: blob.type,
		upsert: false,
	});

	if (error) {
		return {
			success: false,
			message: `Error uploading image: ${error.message}`,
			data: null,
		};
	}

	// Get the public URL
	const {
		data: { publicUrl },
	} = supabase.storage.from(bucketName).getPublicUrl(`${actualFileName}`);
	return {
		success: true,
		message: "",
		data: publicUrl,
	};
}

/**
 * Converts an image URL to a base64 encoded string using fetch
 *
 * @param {string} imageUrl - The URL of the image to convert
 * @returns {Promise<string|null>} - A promise that resolves with the base64 string or null if conversion fails
 */
async function imageUrlToBase64(imageUrl: string): Promise<string | null> {
	try {
		// Fetch the image
		const response = await fetch(imageUrl);

		// Check if the fetch was successful
		if (!response.ok) {
			console.error("Failed to fetch image:", response.status, response.statusText);
			return null;
		}

		// Get the image data as a blob
		const blob = await response.blob();

		// Convert the blob to base64
		return new Promise((resolve) => {
			const reader = new FileReader();

			reader.onloadend = () => {
				// Check if the result is a string
				if (typeof reader.result === "string") {
					// Get just the base64 part (remove the data URI prefix)
					const base64String = reader.result.split(",")[1];
					resolve(base64String);
				} else {
					console.error("FileReader result is not a string");
					resolve(null);
				}
			};

			reader.onerror = () => {
				console.error("Error reading the blob");
				resolve(null);
			};

			reader.readAsDataURL(blob);
		});
	} catch (error) {
		console.error("Error converting image to base64:", error);
		return null;
	}
}

// export const generateVideo2 = async () => {
// 	try {
// 		const response = await fetch("https://api.aimlapi.com/v2/generate/video/kling/generation", {
// 			method: "POST",
// 			headers: {
// 				Authorization: "Bearer " + import.meta.env.VITE_AIML_API_KEY,
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				model: "kling-video/v1/standard/image-to-video",
// 				prompt: "Woman preparing coffee in the kitchen and pouring it into a cup",
// 				image_url:
// 					"https://ahzlcevtbhbborvkiczm.supabase.co/storage/v1/object/public/images//BIALETTI-1744882131549-.png",
// 				duration: "5",
// 			}),
// 		}).then((res) => res.json());

// 		// "742452fc-377f-44d6-a03b-8d219694a66a:kling-video/v1.6/standard/text-to-video"

// 		console.log("Generation:", response);
// 	} catch (error) {
// 		console.log("error: ", error);
// 	}
// };
export const getGeneratedContent = async () => {
	try {
		const params = new URLSearchParams({
			generation_id: "63d686e6-2104-4afe-8e0e-1ed15d2f72e1:kling-video/v1/standard/image-to-video",
		});
		const response = await fetch(`https://api.aimlapi.com/v2/generate/video/kling/generation?${params.toString()}`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + import.meta.env.VITE_AIML_API_KEY,
				"Content-Type": "application/json",
			},
		}).then((res) => res.json());

		console.log("Generation:", response);
	} catch (error) {
		console.log("error: ", error);
	}
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
