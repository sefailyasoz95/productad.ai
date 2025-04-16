import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { getProducts, updateUser } from "@/redux/actions";
import PricingItem from "@/components/PricingItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, CreditCard, Bell, Save, AlertCircle, Trash2, FileText, Building } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { UserType } from "@/lib/types";
import { AiOutlineLoading } from "react-icons/ai";

const Settings = () => {
	const user = useAppSelector((state) => state.global.user);
	const loading = useAppSelector((state) => state.global.loading);
	const products = useAppSelector((state) => state.global.products);
	const dispatch = useAppDispatch();
	const [userForm, setUserForm] = useState<UserType>(user);

	useEffect(() => {
		dispatch(getProducts());
	}, []);

	const handleInputChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;
		console.log("value: ", value);

		setUserForm({ ...userForm, [name]: value });
	};
	const handleSwitchChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.currentTarget;
		setUserForm({ ...userForm, [name]: checked });
	};

	const handleSaveChanges = () => {
		const { isSubscribed, ...rest } = userForm;
		dispatch(updateUser({ ...rest }));
	};
	return (
		<DashboardLayout>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold'>Settings</h1>
				</div>

				<Tabs defaultValue='account' className='w-full'>
					<TabsList className='grid w-full grid-cols-4'>
						<TabsTrigger value='account'>Account</TabsTrigger>
						<TabsTrigger value='billing'>Billing</TabsTrigger>
						<TabsTrigger value='notifications'>Notifications</TabsTrigger>
						<TabsTrigger value='organization'>Organization</TabsTrigger>
					</TabsList>

					<TabsContent value='account' className='mt-6 space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<UserRound className='h-5 w-5' />
									Profile Information
								</CardTitle>
								<CardDescription>Update your account information and profile settings</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex flex-col sm:flex-row gap-4'>
									<div className='space-y-2 flex-1'>
										<Label htmlFor='name'>Username</Label>
										<Input id='name' defaultValue={userForm?.username} onChange={handleInputChange} name='username' />
									</div>
									<div className='space-y-2 flex-1'>
										<Label htmlFor='email'>Email</Label>
										<Input
											id='email'
											type='email'
											defaultValue={userForm?.email}
											onChange={handleInputChange}
											name='email'
											disabled
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='company'>Company (Optional)</Label>
									<Input id='company' defaultValue={userForm?.company} onChange={handleInputChange} name='company' />
								</div>

								<div className='flex items-center space-x-2'>
									<Switch
										id='marketing-emails'
										name='marketing_emails_allowed'
										defaultChecked={userForm?.marketing_emails_allowed}
										onChange={handleSwitchChange}
									/>
									<Label htmlFor='marketing-emails'>Receive marketing emails and updates</Label>
								</div>
							</CardContent>
							<CardFooter className='flex justify-between'>
								<Button variant='outline'>Cancel</Button>
								<Button onClick={handleSaveChanges}>
									{!loading ? <Save className='mr-2 h-4 w-4' /> : <AiOutlineLoading className='mr-2 h-4 w-4' />}
									{!loading ? "Saving Changes" : "Save Changes"}
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2 text-destructive'>
									<AlertCircle className='h-5 w-5' />
									Danger Zone
								</CardTitle>
								<CardDescription>These actions are irreversible. Please proceed with caution.</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='border border-destructive/20 rounded-md p-4'>
									<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
										<div>
											<h4 className='font-medium'>Delete Account</h4>
											<p className='text-sm text-muted-foreground'>Permanently delete your account and all your data</p>
										</div>
										<Button variant='destructive' size='sm'>
											<Trash2 className='mr-2 h-4 w-4' />
											Delete Account
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value='billing' className='mt-6 space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<CreditCard className='h-5 w-5' />
									Current Plan
								</CardTitle>
								<CardDescription>Manage your subscription and billing information</CardDescription>
							</CardHeader>
							<CardContent className='grid grid-cols-1 lg:grid-cols-3'>
								{products.map((product, key) => (
									<PricingItem
										product={product}
										onItemSelect={() => {}}
										isCurrent={user.isSubscribed && user.isSubscribed.includes(product.name)}
									/>
								))}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<CreditCard className='h-5 w-5' />
									Payment Methods
								</CardTitle>
								<CardDescription>Manage your payment methods and billing details</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='border rounded-md p-4 flex justify-between items-center'>
									<div className='flex items-center gap-3'>
										<div className='bg-muted rounded-md p-2'>
											<CreditCard className='h-5 w-5' />
										</div>
										<div>
											<p className='font-medium'>•••• •••• •••• 4242</p>
											<p className='text-sm text-muted-foreground'>Expires 12/25</p>
										</div>
									</div>
									<Badge>Default</Badge>
								</div>

								<Button variant='outline' className='w-full'>
									Add Payment Method
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<FileText className='h-5 w-5' />
									Billing History
								</CardTitle>
								<CardDescription>View your past invoices and billing history</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='rounded-md border'>
									<div className='grid grid-cols-4 p-4 font-medium border-b'>
										<div>Date</div>
										<div>Description</div>
										<div>Amount</div>
										<div>Status</div>
									</div>
									<div className='grid grid-cols-4 p-4 border-b'>
										<div>Apr 1, 2025</div>
										<div>Pro Plan Subscription</div>
										<div>$24.99</div>
										<div>
											<Badge variant='outline' className='bg-green-100 text-green-800 border-green-200'>
												Paid
											</Badge>
										</div>
									</div>
									<div className='grid grid-cols-4 p-4 border-b'>
										<div>Mar 1, 2025</div>
										<div>Pro Plan Subscription</div>
										<div>$24.99</div>
										<div>
											<Badge variant='outline' className='bg-green-100 text-green-800 border-green-200'>
												Paid
											</Badge>
										</div>
									</div>
									<div className='grid grid-cols-4 p-4'>
										<div>Feb 1, 2025</div>
										<div>Pro Plan Subscription</div>
										<div>$24.99</div>
										<div>
											<Badge variant='outline' className='bg-green-100 text-green-800 border-green-200'>
												Paid
											</Badge>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value='notifications' className='mt-6 space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Bell className='h-5 w-5' />
									Notification Preferences
								</CardTitle>
								<CardDescription>Control how and when you receive notifications</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-4'>
									<h3 className='text-sm font-medium'>Email Notifications</h3>
									<div className='space-y-2'>
										<div className='flex items-center justify-between'>
											<Label htmlFor='email-marketing'>Marketing and updates</Label>
											<Switch id='email-marketing' defaultChecked />
										</div>
										<div className='flex items-center justify-between'>
											<Label htmlFor='email-usage'>Usage reports</Label>
											<Switch id='email-usage' defaultChecked />
										</div>
										<div className='flex items-center justify-between'>
											<Label htmlFor='email-billing'>Billing and receipts</Label>
											<Switch id='email-billing' defaultChecked />
										</div>
										<div className='flex items-center justify-between'>
											<Label htmlFor='email-security'>Security alerts</Label>
											<Switch id='email-security' defaultChecked />
										</div>
									</div>
								</div>

								<div className='space-y-4'>
									<h3 className='text-sm font-medium'>In-App Notifications</h3>
									<div className='space-y-2'>
										<div className='flex items-center justify-between'>
											<Label htmlFor='app-completion'>Content generation completion</Label>
											<Switch id='app-completion' defaultChecked />
										</div>
										<div className='flex items-center justify-between'>
											<Label htmlFor='app-updates'>New features and updates</Label>
											<Switch id='app-updates' defaultChecked />
										</div>
										<div className='flex items-center justify-between'>
											<Label htmlFor='app-tips'>Tips and recommendations</Label>
											<Switch id='app-tips' defaultChecked />
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button>Save Preferences</Button>
							</CardFooter>
						</Card>
					</TabsContent>

					<TabsContent value='organization' className='mt-6 space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Building className='h-5 w-5' />
									Organization Settings
								</CardTitle>
								<CardDescription>Manage your organization's profile and team members</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='org-name'>Organization Name</Label>
									<Input id='org-name' value='Acme Corporation' />
								</div>

								<div className='space-y-2'>
									<Label htmlFor='org-address'>Business Address</Label>
									<Input id='org-address' value='123 Main St, City, Country' />
								</div>

								<div className='space-y-2'>
									<Label htmlFor='org-tax'>Tax ID / VAT Number (Optional)</Label>
									<Input id='org-tax' value='US123456789' />
								</div>

								<div className='space-y-2 pt-4 border-t'>
									<div className='flex justify-between items-center'>
										<Label>Team Members</Label>
										<Button variant='outline' size='sm'>
											Invite Member
										</Button>
									</div>

									<div className='border rounded-md divide-y'>
										<div className='p-4 flex justify-between items-center'>
											<div className='flex items-center gap-3'>
												<div className='h-8 w-8 rounded-full bg-brand-purple/20 flex items-center justify-center'>
													<span className='text-sm font-medium'>JD</span>
												</div>
												<div>
													<p className='font-medium'>John Doe</p>
													<p className='text-sm text-muted-foreground'>john@example.com</p>
												</div>
											</div>
											<Badge>Admin</Badge>
										</div>

										<div className='p-4 flex justify-between items-center'>
											<div className='flex items-center gap-3'>
												<div className='h-8 w-8 rounded-full bg-brand-blue/20 flex items-center justify-center'>
													<span className='text-sm font-medium'>JS</span>
												</div>
												<div>
													<p className='font-medium'>Jane Smith</p>
													<p className='text-sm text-muted-foreground'>jane@example.com</p>
												</div>
											</div>
											<Badge variant='outline'>Member</Badge>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button>Save Organization</Button>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</DashboardLayout>
	);
};

export default Settings;
