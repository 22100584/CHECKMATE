import React from "react";

function KakaoAuth() {
  const handleKakaoLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    console.log(redirectUri);

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return <button onClick={handleKakaoLogin}>Login with Kakao</button>;
}

export default KakaoAuth;
