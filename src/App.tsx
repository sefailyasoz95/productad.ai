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
import { Provider } from "react-redux";
import store from "./redux/store";
import AuthCheck from "./components/AuthCheck";

const queryClient = new QueryClient();

const App = () => {
	useLayoutEffect(() => {
		initFirebase();
	}, []);

	return (
		<Provider store={store}>
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
							<Route path='*' element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</TooltipProvider>
			</QueryClientProvider>
		</Provider>
	);
};

export default App;
