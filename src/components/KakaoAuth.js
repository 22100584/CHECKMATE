import React from "react";

function KakaoAuth() {
  const handleKakaoLogin = () => {
    const clientId = "YOUR_KAKAO_APP_CLIENT_ID";
    const redirectUri = "YOUR_REDIRECT_URI";

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=4f5d143ab557ac31113b376147f3676e&redirect_uri=http://localhost:8080/api/auth/login&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return <button onClick={handleKakaoLogin}>Login with Kakao</button>;
}

export default KakaoAuth;
