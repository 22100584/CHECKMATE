import React from "react";
import styled from "styled-components";
import BackImage from "../assets/images/background.jpeg";
import { useLocation } from "react-router-dom";
import KakaoAuth from "../components/KakaoAuth";
import loginCheck from "../assets/images/login.png";

function Loginpage() {
  const BackgroundImage = styled.div`
    width: 100%;
    height: 100%;
    background: #A1A1A1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  `;
  const location = useLocation();
  const userInfo = { ...location.state };
  console.log(userInfo.postId);
  const PostPage = styled.div`
    @font-face {
      font-family: "Pretendard-Regular";
      src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
        format("woff");
      font-weight: 400;
      font-style: normal;
    }
    background-color: white;
    width: 375px;
    height: 100vh;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  `;

  const ColumnBase = styled.div`
  height: 100vh;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center; // 가운데 정렬을 위해 추가한 속성

  `;

const LoginCheckImage = styled.img`
margin-bottom: 100px; // 상하 간격 조정을 위해 추가 (원하시는 값으로 조절하세요)
`;

  return (
    <>
      <BackgroundImage />
      <PostPage>
        <ColumnBase>
        <LoginCheckImage src={loginCheck} alt="로그인 체크 이미지" />
        <KakaoAuth />
        </ColumnBase>
      
      </PostPage>
    </>
  );
}

export default Loginpage;
