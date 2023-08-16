import React from 'react';
import styled from "styled-components";
import ProfileImage from "../assets/images/profile.png";
import userData from '../user.json';
import { useState, useEffect } from "react";
import Get from "../assets/images/u-exit.png";
import Together from "../assets/images/u-users-alt.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from 'react-router-dom';

const userID=1;
const MyPostComponent = styled.div`
  font-family: "Pretendard";
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width:auto;
  height: auto;
  margin:0px;
  padding: 20px 20px 0px 20px; // bottom padding을 80px로 변경 (원하는 값으로 조절)

  position: relative;

  

`;

const MyInfo = styled.div`
  font-family: "Pretendard";
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px 9px 20px ;
  width:295px;
  margin:0px;
  border-radius: 6px;
  background: #EAD0FF;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.10);
`;

const UserProfile = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 20px;
  
`;

const MyNameFollow = styled.div`
  font-family: "Pretendard";
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000;
    height:100%;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

.margin-bottom{
    margin-bottom:5px;
    margin-top:0px;
}
`;

const MyFollow = styled.div`
  font-family: "Pretendard";
  display: flex;
  flex-direction: row;
  color: #000;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;


.margin{
    margin:0px;
}
.margin-second{
    margin:0px 20px;
}

`;

const FilterPost = styled.div`

    width: 100%;
    font-family: "Pretendard";
    display: flex;
    flex-direction: row;
    height:40px;
    margin-bottom:20px;

`;

const GetPost = styled.div`
    padding:10px;
    display:flex;
    width: 50%;
    height:40px;
    border-bottom: ${props => props.active ? "1px solid #000" : "none"};
    color: ${props => props.active ? "#000" : "#999"};
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-items: center;
    justify-content: center;
`;

const TogetherPost = styled.div`
    padding:10px;
    display:flex;
    width: 50%;
    height:40px;
    border-bottom: ${props => !props.active ? "1px solid #000" : "none"};
    color: ${props => props.active ? "#999" : "#000"};
    text-align: center;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-items: center;
    justify-content: center;
`;

const PostList = styled.div`
  list-style-type: none;
  margin-top: 20px;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 80vh; // 높이는 필요에 따라 조절 가능합니다.
`;

const PostListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 18px;
  box-sizing: border-box;
  width: 335px;
  height:auto;
  flex-shrink: 0;
  
  border-radius: 6px;
  background: #EAD0FF;
box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.10);


.title{
  color: #000;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin:0px 0px 5px 0px;
}
`;

const FirstLine =styled.div`

display: flex;
flex-direction: row;

width:100%;
align-items: center;
justify-content: space-between;
`;

const HashTags = styled.div`

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 5px;
  color: var(--unnamed, #1F1F1F);
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  width:auto;
`;
const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const IconCount = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;

// 아이콘 이미지를 위치에 맞게 조정하세요
const Icon = styled.img`
  height: 24px;
  width: 24px;
`;
const DateWriterInfo = styled.div`
  display: flex;
  flex-direction: row;
  width:100%;
  justify-content: space-between;
  color: var(--unnamed, #1F1F1F);
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 5px;
  .date{
    margin-right:10px;
  }

`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 10px 0;
`;
const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 5px;
  margin-bottom:5px;
`;




const Checkbox = ({ content, itemId, updateCount, count,post, postId }) => {

  const StyledCheckbox = styled.input`
        appearance: none;
        background: #ffffff;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #000;
        outline: none;
        transition: all 0.2s ease-out;
       

        &:checked {
            background-color: #000;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
          }

        &:checked:after {
              content: "\\2713"; // 체크 표시 (유니코드)
              display: flex;
              justify-content: center;
              align-items: center;
              color: black;
              font-size: 20px;
              font-weight: bold;
              border-radius: 50%;
              width: 100%;
              height: 100%;
              background-color: #fff;
            }
        `;

        const Label = styled.label`
        display: flex;
        align-items: center;
        gap: 10px;
        padding-left: 30px;
`;

const item = post.items.find((i) => i.itemId === itemId);

const [checked, setChecked] = useState(item.check.includes(userID));


const handleChange = () => {
  const newChecked = !checked;
  updateCount(postId, itemId, newChecked);
  setChecked(newChecked);
};
  return (
    <Label>
    <StyledCheckbox
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
    {content} 
  </Label>
  );
};



const CarouselContainer = styled.div`
width: 100%;
box-sizing: border-box;
`;

const CarouselPage = styled.div`
display: flex;
flex-direction: column;
`;





const handleCarouselClick = (e) => {
e.stopPropagation();
};










function MyPost() {
    const navigate = useNavigate();
    const [choose,setChoose] = useState(true);
    const [posts, setPosts] = useState([]);
    
  

    const handleFirstLineClick = (post) => (e) => {
      navigate(`/postpage`, { state: { postId: `${post.postId}` } });
      };
    
      const updateCount = (postId, itemId, isChecked) => {
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) => {
          if (post.postId === postId) {
            return {
              ...post,
              items: post.items.map((item) => {
                if (item.itemId === itemId) {
                  if (isChecked) {
                    return {
                      ...item,
                      check: [...item.check, userID],
                    };
                  } else {
                    return {
                      ...item,
                      check: item.check.filter((name) => name !== userID),
                    };
                  }
                }
                return item;
              }),
            };
          }
          return post;
        });
    
        console.log(updatedPosts); // 변경된 데이터를 콘솔에 출력합니다.
        return updatedPosts;
      });
    };
    const renderItems = (items, post) => {
      const chunkSize = 4;
      const chunks = [];
      
      for (let i = 0; i < items.length; i += chunkSize) {
        chunks.push(items.slice(i, i + chunkSize));
      }
      
      return chunks.map((chunk, index) => (
        <CarouselPage key={index}>
          {chunk.map((item) => (
            <Checkbox
              key={item.itemId}
              content={item.content}
              itemId={item.itemId}
              updateCount={updateCount}
              count={item.count}
              post={post}
              postId={post.postId}
            />
          ))}
        </CarouselPage>
      ));
      };
    const postItems = posts.map((post) => (
     
       
       
        <PostListItem key={post.postId}>
        <FirstLine  >
          <PostInfo onClick={handleFirstLineClick(post)}
            style={{ cursor: 'pointer' }}>
          <p className="title">{post.title}</p>
          <HashTags>
            {post.hastags.map((hashtag, index) => (
              <span key={index}>#{hashtag}</span>
            ))}
          </HashTags>
          </PostInfo>
          <IconsContainer>
            <IconWrapper>
              <Icon src={Together} />
              <IconCount>{post.together}</IconCount>
            </IconWrapper>
            <IconWrapper>
              <Icon src={Get} />
              <IconCount>{post.get}</IconCount>
            </IconWrapper>
         </IconsContainer>
        </FirstLine>
        
        <DateWriterInfo>
          <p>{post.writer}</p>
          <p className="date"> {post.date}</p>
          
        </DateWriterInfo>
        <Divider />
        <CheckList>
            <CarouselContainer onClick={handleCarouselClick}>
              <Carousel showArrows showStatus={false} showThumbs={false}>
                {renderItems(post.items, post)}
              </Carousel>
            </CarouselContainer>
          </CheckList>
        
        </PostListItem>
       
    
      ));
      
      
      const handleClickGet = () => {
        setChoose(true);
    };

    const handleClickTogether = () => {
        setChoose(false);
    };

    useEffect(() => {
      console.log("choose " +  choose)
        if (choose) {
          console.log("entered")
            if (userData.user && userData.user.myList) {
              console.log("entered2")
                setPosts(userData.user.myList);
            }
        } else {
            if (userData.user && userData.user.togetherList) {
                setPosts(userData.user.togetherList);
            }
        }
    }, [choose]);
  

    


      

  return (
    <MyPostComponent>
      <MyInfo>
        <UserProfile src={ProfileImage} alt="프로필 이미지" />
        <MyNameFollow>
          <p className='margin-bottom'>{userData.user.nickname}</p>
          <MyFollow>
            <p className='margin'>팔로워 {userData.user.follower}명 </p>
            <p className='margin-second'> 팔로잉 {userData.user.following}명</p>
          </MyFollow>
        </MyNameFollow>
      </MyInfo>
      <FilterPost>
      <GetPost onClick={handleClickGet} active={choose}>
                    내글 보기
                </GetPost>
                <TogetherPost onClick={handleClickTogether} active={choose}>
                    함께한 글 보기
                </TogetherPost>
      </FilterPost>
      <PostList>{postItems}</PostList>

    </MyPostComponent>
  );
}

export default MyPost;
