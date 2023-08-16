import React, { useEffect } from "react";
import { kakaoLogin } from "../apis/login";

function KakaoLoginButton() {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      // 카카오 SDK 초기화
      window.Kakao.init("6c4bdeb60ddc0264b9aa001670afd774"); // 여기에 앱 키를 입력해주세요
    }
    // 로그인 버튼 생성
    window.Kakao.Auth.createLoginButton({
      container: "#kakao-login-btn",
      success: async function (authObj) {
        // 성공 시 로직. 여기에서 인가 코드를 받을 수 있습니다.
        console.log(authObj.access_token);
        try {
          const response = await kakaoLogin(authObj.access_token);
        } catch (error) {
          console.error("Error sending auth cod to backend", error);
        }
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  }, []);

  return <div id="kakao-login-btn"></div>;
}

export default KakaoLoginButton;
