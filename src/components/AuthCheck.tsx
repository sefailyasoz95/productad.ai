import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const AuthCheck = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const user = useAppSelector((state) => state.global.user);
	const isAuthenticated = useAppSelector((state) => state.global.isAuthenticated);
	console.log("isAuthenticated: ", isAuthenticated);

	useEffect(() => {
		if (isAuthenticated === true) {
			navigate("/dashboard");
		}
	}, [isAuthenticated]);
	useEffect(() => {
		if (user?.role !== "admin" && pathname.startsWith("/admin")) {
			navigate("/dashboard");
		}
	}, [user, pathname]);

	return <></>;
};

export default AuthCheck;
