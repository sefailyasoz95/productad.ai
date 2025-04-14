import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthCheck = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(
    (state) => state.global.isAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/dashboard");
    }
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return <></>;
};

export default AuthCheck;
