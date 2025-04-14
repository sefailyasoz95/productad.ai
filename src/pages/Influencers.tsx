import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle, Users } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { cn } from "@/lib/utils";
import { getAllInfluencers } from "@/redux/actions";

const categoryColors: Record<string, string> = {
	Lifestyle: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
	Tech: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
	Fitness: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
	Beauty: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
	Food: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
	Gaming: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const Influencers = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const influencers = useAppSelector((state) => state.global.influencers);
	const loading = useAppSelector((state) => state.global.loading);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getAllInfluencers());
	}, []);

	const user = useAppSelector((state) => state.global.user);
	const filteredInfluencers = influencers.filter((influencer) => {
		const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase());
		// influencer.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
		// influencer.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

		return matchesSearch;
	});

	return (
		<DashboardLayout>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold'>AI Influencers</h1>
					<Button
						variant='outline'
						className={cn("flex items-center gap-2", user?.role !== "admin" && "hidden")}
						onClick={() => {
							navigate("/admin/create-influencer");
						}}>
						<PlusCircle className='h-4 w-4' />
						Create Influencer
					</Button>
				</div>

				<div className='flex flex-col md:flex-row gap-4'>
					<div className='relative flex-1'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
						<Input
							placeholder='Search influencers by name, category, or tags...'
							className='pl-10'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					<div className='flex gap-2'>
						<Button variant='outline' className='flex items-center gap-2'>
							<Filter className='h-4 w-4' />
							Filters
						</Button>
					</div>
				</div>

				<div className='flex gap-2 overflow-x-auto pb-2'>
					<Button
						variant={selectedCategory === null ? "secondary" : "outline"}
						className='rounded-full'
						onClick={() => setSelectedCategory(null)}>
						All
					</Button>
					{/* {categories.map((category) => (
						<Button
							key={category}
							variant={selectedCategory === category ? "secondary" : "outline"}
							className='rounded-full'
							onClick={() => setSelectedCategory(category)}>
							{category}
						</Button>
					))} */}
				</div>

				<Tabs defaultValue='grid'>
					<div className='flex justify-between items-center mb-4'>
						<TabsList>
							<TabsTrigger value='grid'>Grid</TabsTrigger>
							<TabsTrigger value='list'>List</TabsTrigger>
						</TabsList>
						<p className='text-sm text-muted-foreground'>
							Showing {filteredInfluencers.length} of {influencers.length} influencers
						</p>
					</div>

					<TabsContent value='grid' className='mt-0'>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
							{filteredInfluencers.map((influencer) => (
								<Card key={influencer.id} className='overflow-hidden hover:shadow-md transition-all'>
									<div className='aspect-[3/4] relative'>
										<img src={influencer.images[0]} alt={influencer.name} className='w-full h-full object-cover' />
										<div className='absolute top-2 right-2'>
											{/* {influencer.featured && ( */}
											<Badge variant='outline' className='text-black backdrop-blur-md border-none bg-white/30'>
												Age: {influencer.age}
											</Badge>
											{/* )} */}
										</div>
									</div>
									<CardContent className='p-4'>
										<h3 className='font-semibold text-lg'>{influencer.name}</h3>
										<div className='flex flex-wrap gap-1 mt-2'>
											<Badge key={"bio"} className='px-2 py-1 text-xs font-normal' variant='outline'>
												{influencer.social_media_bio}
											</Badge>
										</div>
									</CardContent>
									<CardFooter className='p-4 pt-0 flex justify-between'>
										{/* <p className='text-sm text-muted-foreground'>{influencer.videos} videos available</p> */}
										<Button size='sm' variant='outline'>
											Select
										</Button>
										<Button size='sm'>Details</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value='list' className='mt-0'>
						<Card>
							{filteredInfluencers.map((influencer, index) => (
								<React.Fragment key={influencer.id}>
									<CardContent className={`p-4 flex items-center gap-4 ${index !== 0 ? "border-t" : ""}`}>
										<div className='w-16 h-16 rounded-md overflow-hidden'>
											<img src={influencer.images[0]} alt={influencer.name} className='w-full h-full object-cover' />
										</div>
										<div className='flex-1'>
											<div className='flex items-center gap-2'>
												<h3 className='font-semibold'>{influencer.name}</h3>
												{/* {influencer.featured && ( */}
												<Badge variant='outline' className='text-black backdrop-blur-md border-none bg-white/30'>
													Age: {influencer.age}
												</Badge>
												{/* )} */}
											</div>
											<div className='flex flex-wrap gap-1 mt-2'>
												<Badge key={"bio"} variant='outline' className='text-xs'>
													{influencer.social_media_bio}
												</Badge>
											</div>
										</div>
										<Button size='sm'>Select</Button>
										<Button size='sm'>Details</Button>
									</CardContent>
								</React.Fragment>
							))}
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</DashboardLayout>
	);
};

export default Influencers;
