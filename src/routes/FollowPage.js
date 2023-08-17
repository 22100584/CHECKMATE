import React from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import followData from "../follow.json";
import ProfileImage from "../assets/images/profile.png";

const userID=123;

function FollowPage() {
    const location = useLocation();
    const userInfo = { ...location.state };
   

    const [follow,setFollow]=useState(followData);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    

    const followerCount = follow.follower.length;
    const followingCount = follow.following.length;
    
    useEffect(() => {
      setFollow(followData);
    }, []);

    const FollowList = styled.div`
    padding-top:15px;
    display: flex;
    flex-direction: row;
    width: 100%;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-items: center;
    justify-content: start;
    
    .nickname{
      flex-grow:1;
    }
`;

const UserProfile = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
margin-right: 20px;
padding-left:20px;
`;


 const DeleteButton =styled.div`
 background-color: transparent;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: #000;
  cursor: pointer;
  padding-right:20px

  

 `;
function deletefollow(followId) {
  console.log(followId);
  console.log(userID);
}


    const FoFollowing= follow.following.map((post)=>(
      
        <FollowList>
      <UserProfile src={ProfileImage} alt="프로필사진"  />
          <p className="nickname">{post.nickname}</p>

          <DeleteButton onClick={() => deletefollow(post.userId)}>삭제</DeleteButton>

        </FollowList>
    ));



    
    const FoFollower= follow.follower.map((post)=>(
      <FollowList>
      <UserProfile src={ProfileImage} alt="프로필사진"  />
          <p className="nickname">{post.nickname}</p>

          <DeleteButton onClick={() => deletefollow(post.userId)}>삭제</DeleteButton>

        </FollowList>
    ));
 



    function Tab({ title, active, onClick }) {


    const GetPost = styled.div`
    padding:10px;
    display:flex;
    flex-direction: Column;
    width: 50%;
    height:40px;
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-items: center;
    justify-content: center;
    `;


        return (

          <GetPost
            style={{ fontWeight: active ? "bold" : "", 
            color: active ? "#000" : "#999",
            borderBottom: active ? "1px solid #000" : "none",
            cursor: 'pointer' }}
            onClick={onClick}
          >
            {title}
          
          </GetPost>
        );
      }

    function TabsContent({ activeTabIndex }) {
        switch (activeTabIndex) {
            case 0:
              return (
                <div>{FoFollower}</div>
             );
            case 1:
              return (
                <div>{FoFollowing}</div>
              );
            default:
              return null;
        }
    }

    const FollowPage = styled.div`
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
        display: flex;
        flex-direction: column;
    `;

    const NickName =styled.div`
        font-family: "Pretendard";
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        padding-top: 18px;
        position: relative;
        color: #000;
        text-align: center;
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    `;
    const FilterPost = styled.div`

width: 100%;
font-family: "Pretendard";
display: flex;
flex-direction: row;
height:40px;
margin-bottom:20px;

`;


    return (
        <FollowPage>
            <NickName>{userInfo.nickname}</NickName>
            
           <FilterPost>
           <Tab
  title={`${followerCount} 팔로워`}
  active={activeTabIndex === 0}
  onClick={() => setActiveTabIndex(0)}
/>
<Tab
  title={`${followingCount} 팔로잉`}
  active={activeTabIndex === 1}
  onClick={() => setActiveTabIndex(1)}
/>

        </FilterPost>

        <TabsContent activeTabIndex={activeTabIndex} />
 
        </FollowPage>
    );
}

export default FollowPage;
