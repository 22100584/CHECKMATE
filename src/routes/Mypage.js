import React from "react";
import styled from "styled-components";
import MyBar from "../components/MyBar";
import BackImage from "../assets/images/background.jpeg";
import MyPost from "../components/MyPost";

function MyPage() {
  

  const MyPage = styled.div`
    @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
    }
    background-color: white;
    width: 375px;
    height: auto;
    min-height: 100vh;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    
  `;
  
  return (
   
      <MyPage>
          <MyBar />
          <MyPost />

      </MyPage>
   
  );
}

export default MyPage;
