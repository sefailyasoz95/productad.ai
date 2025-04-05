import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Search, ArrowRight, MessageCircle, FileText, Play, Lightbulb, Mail } from "lucide-react";

const faqs = [
	{
		question: "How many images can I generate per month?",
		answer:
			"The number of images you can generate depends on your subscription plan. The Plus plan includes 5 images per month, the Pro plan includes 10 images per month, and the Pro Max plan includes 20 images per month.",
	},
	{
		question: "How do I select an AI influencer for my video?",
		answer:
			"To select an AI influencer, navigate to the Video Generation page and use the 'Select Influencer' dropdown. You can also browse our influencers collection on the Influencers page and select one that fits your brand.",
	},
	{
		question: "Can I customize the AI voice for my content?",
		answer:
			"Yes, on the Voice Generation page, you can customize the voice by selecting different options for voice type, gender, accent, speed, and pitch to match your content needs.",
	},
	{
		question: "How long does it take to generate content?",
		answer:
			"Image generation typically takes 10-30 seconds, while video generation can take 1-3 minutes depending on complexity and length. Voice generation usually takes less than 30 seconds.",
	},
	{
		question: "Can I use the generated content commercially?",
		answer:
			"Yes, all content you generate with your subscription is licensed for commercial use, including marketing, advertising, and social media.",
	},
	{
		question: "How do I upgrade my subscription plan?",
		answer:
			"To upgrade your plan, go to Settings > Billing, and select the plan you want to upgrade to. Click the 'Upgrade' button to complete the process.",
	},
	{
		question: "Can I download my content in different formats?",
		answer: "Yes, images are available in PNG and JPG formats, videos in MP4, and audio in MP3 and WAV formats.",
	},
	{
		question: "How do I access my generation history?",
		answer:
			"Your generation history is automatically saved and can be accessed from the Dashboard page under the 'Recent Creations' section.",
	},
];

const tutorials = [
	{
		title: "Getting Started with ProductAd",
		description: "Learn the basics of generating content with ProductAd",
		icon: Play,
	},
	{
		title: "Creating Effective Product Images",
		description: "Tips and tricks for generating compelling product images",
		icon: Lightbulb,
	},
	{
		title: "Working with AI Influencers",
		description: "How to select and use AI influencers in your videos",
		icon: MessageCircle,
	},
	{
		title: "Writing Effective Voice Scripts",
		description: "Guidelines for writing scripts that sound natural and engaging",
		icon: FileText,
	},
];

interface HelpDialogProps {
	children?: React.ReactNode;
}

const HelpDialog = ({ children }: HelpDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{children || (
					<Button variant='ghost' size='icon'>
						<HelpCircle className='h-5 w-5' />
						<span className='sr-only'>Help</span>
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className='max-w-3xl max-h-[80vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='text-2xl'>Help Center</DialogTitle>
					<DialogDescription>Find answers to common questions or learn how to use ProductAd</DialogDescription>
				</DialogHeader>

				<div className='relative my-4'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
					<Input placeholder='Search for help...' className='pl-10' />
				</div>

				<Tabs defaultValue='faq' className='mt-4'>
					<TabsList className='grid w-full grid-cols-3'>
						<TabsTrigger value='faq'>FAQ</TabsTrigger>
						<TabsTrigger value='tutorials'>Tutorials</TabsTrigger>
						<TabsTrigger value='contact'>Contact Us</TabsTrigger>
					</TabsList>

					<TabsContent value='faq' className='mt-4 space-y-4'>
						<Accordion type='single' collapsible className='w-full'>
							{faqs.map((faq, index) => (
								<AccordionItem key={index} value={`item-${index}`}>
									<AccordionTrigger className='text-left'>{faq.question}</AccordionTrigger>
									<AccordionContent>{faq.answer}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</TabsContent>

					<TabsContent value='tutorials' className='mt-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{tutorials.map((tutorial, index) => (
								<div
									key={index}
									className='border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer flex items-start gap-3'>
									<div className='bg-brand-purple/10 p-2 rounded-md'>
										<tutorial.icon className='h-5 w-5 text-brand-purple' />
									</div>
									<div>
										<h3 className='font-medium'>{tutorial.title}</h3>
										<p className='text-sm text-muted-foreground mt-1'>{tutorial.description}</p>
										<Button variant='link' className='px-0 py-1 h-auto mt-1 flex items-center gap-1'>
											Watch tutorial <ArrowRight className='h-3 w-3 ml-1' />
										</Button>
									</div>
								</div>
							))}
						</div>
					</TabsContent>

					<TabsContent value='contact' className='mt-4 space-y-4'>
						<div className='bg-muted/30 rounded-lg p-4 flex items-start gap-3'>
							<div className='bg-brand-blue/10 p-2 rounded-md'>
								<Mail className='h-5 w-5 text-brand-blue' />
							</div>
							<div>
								<h3 className='font-medium'>Email Support</h3>
								<p className='text-sm text-muted-foreground mt-1'>Our team typically responds within 24 hours</p>
								<p className='font-medium mt-2'>support@ProductAd.app</p>
							</div>
						</div>

						<div className='border rounded-lg p-6 space-y-4'>
							<h3 className='font-medium text-lg'>Send us a message</h3>
							<div className='space-y-3'>
								<div className='grid grid-cols-2 gap-3'>
									<div className='space-y-2'>
										<label htmlFor='name' className='text-sm font-medium'>
											Name
										</label>
										<Input id='name' placeholder='Your name' />
									</div>
									<div className='space-y-2'>
										<label htmlFor='email' className='text-sm font-medium'>
											Email
										</label>
										<Input id='email' type='email' placeholder='Your email' />
									</div>
								</div>

								<div className='space-y-2'>
									<label htmlFor='subject' className='text-sm font-medium'>
										Subject
									</label>
									<Input id='subject' placeholder='How can we help you?' />
								</div>

								<div className='space-y-2'>
									<label htmlFor='message' className='text-sm font-medium'>
										Message
									</label>
									<textarea
										id='message'
										rows={4}
										className='w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none'
										placeholder='Describe your issue or question...'></textarea>
								</div>

								<Button className='w-full'>Send Message</Button>
							</div>
						</div>
					</TabsContent>
				</Tabs>

				<div className='flex justify-end mt-4'>
					<DialogClose asChild>
						<Button variant='outline'>Close</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default HelpDialog;
