import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import GenerateImage from "./pages/GenerateImage";
import GenerateVideo from "./pages/GenerateVideo";
import GenerateVoice from "./pages/GenerateVoice";
import Influencers from "./pages/Influencers";
import Settings from "./pages/Settings";
import Socials from "./pages/Socials";
import { useEffect, useLayoutEffect } from "react";
import { initFirebase } from "./lib/firebase";
import { useAppDispatch, useAppSelector } from "./redux/store";
import AuthCheck from "./components/AuthCheck";
import { supabase } from "./lib/supabase";
import { getCurrentUser } from "./redux/actions";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import CreateInfluencer from "./pages/CreateInfluencer";
import { toast } from "sonner";

const queryClient = new QueryClient();

const App = () => {
	const dispatch = useAppDispatch();
	const message = useAppSelector((state) => state.global.message);
	const success = useAppSelector((state) => state.global.success);
	const loading = useAppSelector((state) => state.global.loading);
	const error = useAppSelector((state) => state.global.error);
	useEffect(() => {
		if (!loading && success) {
			toast.success(message);
		}
		if (!loading && error) {
			toast.error(message);
		}
	}, [success, message, loading, error]);

	useEffect(() => {
		(async function x() {
			await supabase.auth.getSession().then(({ data: { session } }) => {
				console.log("session: ", session);

				if (session) dispatch(getCurrentUser());
			});
		})();
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			console.log("session111: ", session);

			if (session) dispatch(getCurrentUser());
		});
		return () => subscription.unsubscribe();
	}, []);
	useLayoutEffect(() => {
		initFirebase();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<AuthCheck />
					<Routes>
						<Route path='/' element={<Index />} />
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/generate/image' element={<GenerateImage />} />
						<Route path='/generate/video' element={<GenerateVideo />} />
						<Route path='/generate/voice' element={<GenerateVoice />} />
						<Route path='/influencers' element={<Influencers />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/socials' element={<Socials />} />
						<Route path='/success' element={<PaymentSuccess />} />
						<Route path='/canceled' element={<PaymentCanceled />} />
						<Route path='/admin/create-influencer' element={<CreateInfluencer />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</TooltipProvider>
		</QueryClientProvider>
	);
};

export default App;
