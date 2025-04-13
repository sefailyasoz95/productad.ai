import { supabase } from "@/lib/supabase";
import { signOut } from "@/redux/actions";
import { authCheck, getCurrentUser } from "@/redux/reducers";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthCheck = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector((state) => state.global.isAuthenticated);
	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
			console.log("event: ", event);

			if (session && event === "SIGNED_IN") {
				dispatch(authCheck(true));
			} else if (event === "SIGNED_OUT") {
				dispatch(authCheck(false));
			}
		});

		return () => {
			authListener?.subscription.unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(getCurrentUser());
			navigate("/dashboard");
		} else {
			dispatch(signOut());
			navigate("/");
		}
	}, [isAuthenticated]);

	return <></>;
};

export default AuthCheck;
