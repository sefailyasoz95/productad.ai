import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Video, Mic, PlusCircle, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
	return (
		<DashboardLayout>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold'>Dashboard</h1>
					<div className='flex items-center gap-2'>
						<Button variant='outline' size='sm'>
							<Settings className='mr-2 h-4 w-4' />
							Settings
						</Button>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
					<Card className='bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 hover:shadow-lg transition-all'>
						<CardHeader>
							<CardTitle>Create AI Image</CardTitle>
							<CardDescription>Generate marketing images from your product</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='h-32 bg-background/50 rounded-md flex items-center justify-center'>
								<ImageIcon className='h-12 w-12 text-brand-purple/70' />
							</div>
						</CardContent>
						<CardFooter>
							<Button className='w-full bg-brand-purple hover:bg-brand-purple/90' asChild>
								<Link to='/generate/image'>
									<PlusCircle className='mr-2 h-4 w-4' /> New Image
								</Link>
							</Button>
						</CardFooter>
					</Card>

					<Card className='bg-gradient-to-br from-brand-blue/10 to-brand-teal/10 hover:shadow-lg transition-all'>
						<CardHeader>
							<CardTitle>Create AI Video</CardTitle>
							<CardDescription>Generate videos with virtual influencers</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='h-32 bg-background/50 rounded-md flex items-center justify-center'>
								<Video className='h-12 w-12 text-brand-blue/70' />
							</div>
						</CardContent>
						<CardFooter>
							<Button className='w-full bg-brand-blue hover:bg-brand-blue/90'>
								<PlusCircle className='mr-2 h-4 w-4' /> New Video
							</Button>
						</CardFooter>
					</Card>

					<Card className='bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 hover:shadow-lg transition-all'>
						<CardHeader>
							<CardTitle>Create Voiceover</CardTitle>
							<CardDescription>Generate lifelike voice for your content</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='h-32 bg-background/50 rounded-md flex items-center justify-center'>
								<Mic className='h-12 w-12 text-brand-teal/70' />
							</div>
						</CardContent>
						<CardFooter>
							<Button className='w-full bg-brand-purple hover:bg-brand-purple/90' asChild>
								<Link to='/generate/image'>
									<PlusCircle className='mr-2 h-4 w-4' /> New Voice
								</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>

				<h2 className='text-2xl font-semibold mb-4'>Recent Creations</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{[1, 2, 3, 4].map((item) => (
						<Card key={item} className='hover:shadow-lg transition-all'>
							<div className='aspect-square bg-muted rounded-t-lg flex items-center justify-center'>
								<ImageIcon className='h-12 w-12 text-muted-foreground/40' />
							</div>
							<CardContent className='p-3'>
								<p className='font-medium truncate'>Product Image {item}</p>
								<p className='text-xs text-muted-foreground'>Created yesterday</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Dashboard;
