import React from "react";
import styled from "styled-components";
import AppBar from '../components/AppBar'
import BackImage from "../assets/images/background.jpeg";
import FindFilter from "../components//FindFilter";


function HomePage() {
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
  const HomePage = styled.div`
    @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
    }
    background-color: white;
    width: 375px;
    height: 100vh;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    overflow-y: scroll; 
  `;
  
  return (
   <>
   <BackgroundImage />
      <HomePage>
        <AppBar />
        <FindFilter />
      
      </HomePage>
   </>
    
   
  );
}

export default HomePage;
