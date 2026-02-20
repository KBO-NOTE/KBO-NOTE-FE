import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken ?? "");
      navigate("/");
    } else {
      navigate("/login?error=true");
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default OAuthRedirect;
