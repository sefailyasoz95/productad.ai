import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import PricingItem from "./PricingItem";
import { createCheckoutSession } from "@/redux/actions";
import { useEffect } from "react";

type Props = {};

const SubscriptionModal = (props: Props) => {
	const loading = useAppSelector((state) => state.global.loading);
	const products = useAppSelector((state) => state.global.products);
	const checkoutUrl = useAppSelector((state) => state.global.checkoutUrl);

	const user = useAppSelector((state) => state.global.user);
	const dispatch = useAppDispatch();
	const handlePayment = (priceId: string, planType: string) => {
		dispatch(
			createCheckoutSession({
				priceId,
				planType,
				userId: user.id,
			})
		);
	};

	useEffect(() => {
		if (checkoutUrl) {
			window.open(checkoutUrl, "_blank");
		}
	}, [checkoutUrl]);

	return (
		<Dialog open>
			<DialogContent className='min-w-[80vw] max-h-[90vh] overflow-y-auto'>
				<DialogHeader className='text-center pb-6'>
					<DialogTitle className='text-2xl font-bold text-violet-800'>Choose Your Plan</DialogTitle>
					<DialogDescription className='text-gray-600 font-medium text-base'>
						Welcome to ProductAd.ai, to continue you need to subscribe to one of our plans.
					</DialogDescription>
				</DialogHeader>

				{loading ? (
					<div className='flex justify-center py-12'>
						<div className='w-8 h-8 border-4 border-violet-200 border-t-violet-500 rounded-full animate-spin'></div>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{products?.map((product, index) => (
							<PricingItem key={product.id} product={product} onItemSelect={handlePayment} />
						))}
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default SubscriptionModal;
