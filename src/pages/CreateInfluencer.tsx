import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Save, UserPlus, XCircle, Plus, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { Influencer } from "@/lib/types";
import JsonImporter from "@/components/JsonImporter";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createInfluencer } from "@/redux/actions";
import { useNavigate } from "react-router-dom";

const CreateInfluencer = () => {
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const { toast } = useToast();
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	// Basic info state
	const [name, setName] = useState("");
	const navigate = useNavigate();
	const [age, setAge] = useState("");
	const [profession, setProfession] = useState("");
	const [socialMediaBio, setSocialMediaBio] = useState("");
	const loading = useAppSelector((state) => state.global.loading);
	const sueccess = useAppSelector((state) => state.global.success);
	// Physical appearance state
	const [appearance, setAppearance] = useState({
		hair: "",
		eyes: "",
		skin: "",
		features: "",
	});
	useEffect(() => {
		if (!loading && sueccess) {
			toast({
				title: "Success",
				description: "Influencer created successfully",
				variant: "default",
			});
			navigate("/influencers");
		}
	}, [loading, sueccess]);

	// Personality traits state
	const [personalityTraits, setPersonalityTraits] = useState<string[]>([""]);

	// Background state
	const [background, setBackground] = useState({
		birthplace: "",
		family: {
			father: "",
			mother: "",
		},
		early_interests: "",
		education: "",
	});

	// Career highlights state
	const [careerHighlights, setCareerHighlights] = useState<string[]>([""]);

	// Tone and speech style state
	const [toneAndSpeech, setToneAndSpeech] = useState({
		style: "",
		quirks: [""],
		common_phrases: [""],
	});

	// Habits and mannerisms state
	const [habitsAndMannerisms, setHabitsAndMannerisms] = useState<string[]>([""]);

	// Import JSON data into the form
	const handleImportData = (data: Partial<Influencer>) => {
		// Update basic info fields
		if (data.name) setName(data.name);
		if (data.age) setAge(data.age.toString());
		if (data.profession) setProfession(data.profession);
		if (data.social_media_bio) setSocialMediaBio(data.social_media_bio);

		// Update physical appearance
		if (data.physical_appearance) {
			setAppearance({
				hair: data.physical_appearance.hair || "",
				eyes: data.physical_appearance.eyes || "",
				skin: data.physical_appearance.skin || "",
				features: data.physical_appearance.features || "",
			});
		}

		// Update personality traits (ensure at least one empty field exists)
		if (data.personality && data.personality.length > 0) {
			setPersonalityTraits(data.personality);
		}

		// Update background info
		if (data.background) {
			setBackground({
				birthplace: data.background.birthplace || "",
				family: {
					father: data.background.family?.father || "",
					mother: data.background.family?.mother || "",
				},
				early_interests: data.background.early_interests || "",
				education: data.background.education || "",
			});

			// Handle career highlights separately
			if (data.background.career_highlights && data.background.career_highlights.length > 0) {
				setCareerHighlights(data.background.career_highlights);
			}
		}

		// Update tone and speech style
		if (data.tone_and_speech_style) {
			setToneAndSpeech({
				style: data.tone_and_speech_style.style || "",
				quirks: data.tone_and_speech_style.quirks?.length ? data.tone_and_speech_style.quirks : [""],
				common_phrases: data.tone_and_speech_style.common_phrases?.length
					? data.tone_and_speech_style.common_phrases
					: [""],
			});
		}

		// Update habits and mannerisms
		if (data.habits_and_mannerisms && data.habits_and_mannerisms.length > 0) {
			setHabitsAndMannerisms(data.habits_and_mannerisms);
		}

		// Handle images if present
		if (data.images && data.images.length > 0) {
			setProfileImage(data.images[0]); // Just use the first image for profile
		}
	};

	const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedImage(file);
			const reader = new FileReader();
			reader.onload = (e) => {
				setProfileImage(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	// Helper functions for array fields
	const handleArrayFieldChange = (
		index: number,
		value: string,
		array: string[],
		setArray: React.Dispatch<React.SetStateAction<string[]>>
	) => {
		const newArray = [...array];
		newArray[index] = value;
		setArray(newArray);
	};

	const addArrayField = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>) => {
		setArray([...array, ""]);
	};

	const removeArrayField = (
		index: number,
		array: string[],
		setArray: React.Dispatch<React.SetStateAction<string[]>>
	) => {
		if (array.length === 1) {
			setArray([""]);
		} else {
			const newArray = [...array];
			newArray.splice(index, 1);
			setArray(newArray);
		}
	};
	const dispatch = useAppDispatch();
	const handleSubmit = () => {
		// Prepare the influencer data object
		const influencerData = {
			name,
			age: parseInt(age),
			profession,
			physical_appearance: appearance,
			personality: personalityTraits.filter((trait) => trait.trim() !== ""),
			background: {
				...background,
				career_highlights: careerHighlights.filter((highlight) => highlight.trim() !== ""),
			},
			tone_and_speech_style: {
				style: toneAndSpeech.style,
				quirks: toneAndSpeech.quirks.filter((quirk) => quirk.trim() !== ""),
				common_phrases: toneAndSpeech.common_phrases.filter((phrase) => phrase.trim() !== ""),
			},
			habits_and_mannerisms: habitsAndMannerisms.filter((habit) => habit.trim() !== ""),
			social_media_bio: socialMediaBio,
			images: selectedImage,
		};
		dispatch(createInfluencer(influencerData));
	};

	return (
		<DashboardLayout>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold'>Create Influencer Profile</h1>
					<div className='flex gap-3'>
						<JsonImporter onImport={handleImportData} />
						<Button variant='outline' size='sm' onClick={() => window.location.reload()}>
							Clear Form
						</Button>
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Left Column - Basic Info */}
					<div>
						<Card className='mb-6'>
							<CardContent className='p-6 space-y-4'>
								<h2 className='text-xl font-semibold'>Basic Information</h2>

								<div className='space-y-2'>
									<Label htmlFor='profile-image'>Profile Image</Label>
									{profileImage ? (
										<div className='relative aspect-square rounded-full overflow-hidden border border-border w-32 h-32 mx-auto'>
											<img src={profileImage} alt='Profile' className='w-full h-full object-cover' />
											<Button
												size='icon'
												variant='destructive'
												className='absolute top-1 right-1'
												onClick={() => setProfileImage(null)}>
												<XCircle className='h-4 w-4' />
											</Button>
										</div>
									) : (
										<div
											className='border-2 border-dashed border-muted-foreground/20 rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-all'
											onClick={() => document.getElementById("profile-image")?.click()}>
											<Upload className='h-8 w-8 mx-auto mb-2 text-muted-foreground' />
											<p className='text-sm text-muted-foreground'>Upload profile image</p>
											<Input
												id='profile-image'
												type='file'
												accept='image/*'
												className='hidden'
												onChange={handleProfileImageUpload}
											/>
										</div>
									)}
								</div>

								<div className='space-y-2'>
									<Label htmlFor='name'>Name</Label>
									<Input id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Full name' />
								</div>

								<div className='space-y-2'>
									<Label htmlFor='age'>Age</Label>
									<Input
										id='age'
										type='number'
										value={age}
										onChange={(e) => setAge(e.target.value)}
										placeholder='Age'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='profession'>Profession</Label>
									<Input
										id='profession'
										value={profession}
										onChange={(e) => setProfession(e.target.value)}
										placeholder='e.g. Fashion Blogger, Tech Reviewer'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='social-media-bio'>Social Media Bio</Label>
									<Textarea
										id='social-media-bio'
										value={socialMediaBio}
										onChange={(e) => setSocialMediaBio(e.target.value)}
										placeholder='A catchy, emoji-friendly bio for social profiles'
										rows={3}
									/>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className='p-6 space-y-4'>
								<h2 className='text-xl font-semibold'>Physical Appearance</h2>

								<div className='space-y-2'>
									<Label htmlFor='hair'>Hair</Label>
									<Input
										id='hair'
										value={appearance.hair}
										onChange={(e) => setAppearance({ ...appearance, hair: e.target.value })}
										placeholder='Hair description'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='eyes'>Eyes</Label>
									<Input
										id='eyes'
										value={appearance.eyes}
										onChange={(e) => setAppearance({ ...appearance, eyes: e.target.value })}
										placeholder='Eye description'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='skin'>Skin</Label>
									<Input
										id='skin'
										value={appearance.skin}
										onChange={(e) => setAppearance({ ...appearance, skin: e.target.value })}
										placeholder='Skin description'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='features'>Notable Features</Label>
									<Textarea
										id='features'
										value={appearance.features}
										onChange={(e) => setAppearance({ ...appearance, features: e.target.value })}
										placeholder='Distinctive features or style characteristics'
										rows={2}
									/>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Middle Column - Background & Personality */}
					<div className='space-y-6'>
						<Card>
							<CardContent className='p-6 space-y-4'>
								<h2 className='text-xl font-semibold'>Personality Traits</h2>

								{personalityTraits.map((trait, index) => (
									<div key={`trait-${index}`} className='flex items-center gap-2'>
										<Input
											value={trait}
											onChange={(e) =>
												handleArrayFieldChange(index, e.target.value, personalityTraits, setPersonalityTraits)
											}
											placeholder='e.g. Confident, Analytical, Empathetic'
										/>
										<Button
											variant='ghost'
											size='icon'
											onClick={() => removeArrayField(index, personalityTraits, setPersonalityTraits)}>
											<Trash className='h-4 w-4' />
										</Button>
									</div>
								))}

								<Button
									variant='outline'
									size='sm'
									className='w-full'
									onClick={() => addArrayField(personalityTraits, setPersonalityTraits)}>
									<Plus className='h-4 w-4 mr-2' />
									Add Trait
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardContent className='p-6 space-y-4'>
								<h2 className='text-xl font-semibold'>Background</h2>

								<div className='space-y-2'>
									<Label htmlFor='birthplace'>Birthplace</Label>
									<Input
										id='birthplace'
										value={background.birthplace}
										onChange={(e) => setBackground({ ...background, birthplace: e.target.value })}
										placeholder='City, Country'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='father'>Father</Label>
									<Input
										id='father'
										value={background.family.father}
										onChange={(e) =>
											setBackground({
												...background,
												family: { ...background.family, father: e.target.value },
											})
										}
										placeholder="Father's profession or background"
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='mother'>Mother</Label>
									<Input
										id='mother'
										value={background.family.mother}
										onChange={(e) =>
											setBackground({
												...background,
												family: { ...background.family, mother: e.target.value },
											})
										}
										placeholder="Mother's profession or background"
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='early-interests'>Early Interests</Label>
									<Textarea
										id='early-interests'
										value={background.early_interests}
										onChange={(e) => setBackground({ ...background, early_interests: e.target.value })}
										placeholder='Interests during childhood and adolescence'
										rows={2}
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='education'>Education</Label>
									<Input
										id='education'
										value={background.education}
										onChange={(e) => setBackground({ ...background, education: e.target.value })}
										placeholder='Highest degree and institution'
									/>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className='p-6 space-y-4'>
								<h2 className='text-xl font-semibold'>Career Highlights</h2>

								{careerHighlights.map((highlight, index) => (
									<div key={`career-${index}`} className='flex items-center gap-2'>
										<Input
											value={highlight}
											onChange={(e) =>
												handleArrayFieldChange(index, e.target.value, careerHighlights, setCareerHighlights)
											}
											placeholder='Notable career achievement'
										/>
										<Button
											variant='ghost'
											size='icon'
											onClick={() => removeArrayField(index, careerHighlights, setCareerHighlights)}>
											<Trash className='h-4 w-4' />
										</Button>
									</div>
								))}

								<Button
									variant='outline'
									size='sm'
									className='w-full'
									onClick={() => addArrayField(careerHighlights, setCareerHighlights)}>
									<Plus className='h-4 w-4 mr-2' />
									Add Career Highlight
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* Right Column - Speech & Habits */}
					<div className='space-y-6'>
						<Card>
							<CardContent className='p-6 space-y-4'>
								<h2 className='text-xl font-semibold'>Tone and Speech</h2>

								<div className='space-y-2'>
									<Label htmlFor='speech-style'>Speech Style</Label>
									<Textarea
										id='speech-style'
										value={toneAndSpeech.style}
										onChange={(e) => setToneAndSpeech({ ...toneAndSpeech, style: e.target.value })}
										placeholder='Describe their manner of speaking'
										rows={2}
									/>
								</div>

								<h3 className='font-medium mt-4'>Speech Quirks</h3>
								{toneAndSpeech.quirks.map((quirk, index) => (
									<div key={`quirk-${index}`} className='flex items-center gap-2'>
										<Input
											value={quirk}
											onChange={(e) => {
												const newQuirks = [...toneAndSpeech.quirks];
												newQuirks[index] = e.target.value;
												setToneAndSpeech({ ...toneAndSpeech, quirks: newQuirks });
											}}
											placeholder='Speaking quirk or habit'
										/>
										<Button
											variant='ghost'
											size='icon'
											onClick={() => {
												if (toneAndSpeech.quirks.length === 1) {
													setToneAndSpeech({ ...toneAndSpeech, quirks: [""] });
												} else {
													const newQuirks = [...toneAndSpeech.quirks];
													newQuirks.splice(index, 1);
													setToneAndSpeech({ ...toneAndSpeech, quirks: newQuirks });
												}
											}}>
											<Trash className='h-4 w-4' />
										</Button>
									</div>
								))}

								<Button
									variant='outline'
									size='sm'
									className='w-full'
									onClick={() =>
										setToneAndSpeech({
											...toneAndSpeech,
											quirks: [...toneAndSpeech.quirks, ""],
										})
									}>
									<Plus className='h-4 w-4 mr-2' />
									Add Quirk
								</Button>

								<h3 className='font-medium mt-4'>Common Phrases</h3>
								{toneAndSpeech.common_phrases.map((phrase, index) => (
									<div key={`phrase-${index}`} className='flex items-center gap-2'>
										<Input
											value={phrase}
											onChange={(e) => {
												const newPhrases = [...toneAndSpeech.common_phrases];
												newPhrases[index] = e.target.value;
												setToneAndSpeech({ ...toneAndSpeech, common_phrases: newPhrases });
											}}
											placeholder='Frequently used phrase or saying'
										/>
										<Button
											variant='ghost'
											size='icon'
											onClick={() => {
												if (toneAndSpeech.common_phrases.length === 1) {
													setToneAndSpeech({ ...toneAndSpeech, common_phrases: [""] });
												} else {
													const newPhrases = [...toneAndSpeech.common_phrases];
													newPhrases.splice(index, 1);
													setToneAndSpeech({ ...toneAndSpeech, common_phrases: newPhrases });
												}
											}}>
											<Trash className='h-4 w-4' />
										</Button>
									</div>
								))}

								<Button
									variant='outline'
									size='sm'
									className='w-full'
									onClick={() =>
										setToneAndSpeech({
											...toneAndSpeech,
											common_phrases: [...toneAndSpeech.common_phrases, ""],
										})
									}>
									<Plus className='h-4 w-4 mr-2' />
									Add Phrase
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardContent className='p-6 space-y-4'>
								<h2 className='text-xl font-semibold'>Habits & Mannerisms</h2>

								{habitsAndMannerisms.map((habit, index) => (
									<div key={`habit-${index}`} className='flex items-center gap-2'>
										<Input
											value={habit}
											onChange={(e) =>
												handleArrayFieldChange(index, e.target.value, habitsAndMannerisms, setHabitsAndMannerisms)
											}
											placeholder='Physical habit or distinct mannerism'
										/>
										<Button
											variant='ghost'
											size='icon'
											onClick={() => removeArrayField(index, habitsAndMannerisms, setHabitsAndMannerisms)}>
											<Trash className='h-4 w-4' />
										</Button>
									</div>
								))}

								<Button
									variant='outline'
									size='sm'
									className='w-full'
									onClick={() => addArrayField(habitsAndMannerisms, setHabitsAndMannerisms)}>
									<Plus className='h-4 w-4 mr-2' />
									Add Habit
								</Button>
							</CardContent>
						</Card>

						<Button
							className='w-full bg-gradient-to-r from-brand-purple to-brand-teal h-12 text-lg'
							onClick={handleSubmit}
							disabled={loading || !name || !profession}>
							{loading ? (
								<>
									<Save className='mr-2 h-5 w-5 animate-pulse' />
									Saving...
								</>
							) : (
								<>
									<UserPlus className='mr-2 h-5 w-5' />
									Create Influencer
								</>
							)}
						</Button>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default CreateInfluencer;
