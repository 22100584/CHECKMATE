import React from "react";
import KakaoLogin from "../assets/images/kakao_login_large_wide.png";
import styled from "styled-components";

function KakaoAuth() {
  const handleKakaoLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    console.log(redirectUri);

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  const Kakaoimg = styled.img`

    width:80%;
  `;
  
  return (
     
      <Kakaoimg src={KakaoLogin} alt="카카오 로그인" onClick={handleKakaoLogin} />
   
  );
}

export default KakaoAuth;
