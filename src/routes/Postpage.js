import React from "react";
import styled from "styled-components";
import AppBar from '../components/AppBar'
import BackImage from "../assets/images/background.jpeg";
import DetailPost from "../components/DetailPost";
import { useLocation } from 'react-router-dom';



function PostPage() {
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
console.log("userInfo",userInfo);
  const PostPage = styled.div`
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
  `;


  
  return (
   
     <>
     <BackgroundImage />
      <PostPage>
        <AppBar />
       <DetailPost Id={userInfo.postId}/>
      
      </PostPage></>
   
  );
}


export default PostPage;
