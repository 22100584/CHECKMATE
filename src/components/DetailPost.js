import React, { useState, useEffect } from "react";
import styled from "styled-components";
import postData from "../post.json";
import Get from "../assets/images/u-exit.png";
import Together from "../assets/images/u-users-alt.png";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";


const userID = 111;

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
          justify-content: center;
                align-items: center;
         

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
   const PostList = styled.div`
      list-style-type: none;
      flex-direction: column;
      overflow-y: scroll;
      max-height: 90vh;
 `;
  
  const PostListItem = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin-bottom: 10px;
    padding: 18px;
    box-sizing: border-box;
    width: 100%;
    min-height: 90vh;
    flex-shrink: 0;
    background: #EAD0FF;
    padding-bottom:100px;

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
    
   
  
  `;
  
  
  
  const DetailPostComponent = styled.div`
    font-family: "Pretendard";
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 18px;
    position: relative;
  
  
  `;


const Category = styled.div`
color: #000;
font-family: Pretendard;
font-size: 17px;
font-style: normal;
font-weight: 500;
line-height: normal;
margin-top:30px;
margin-bottom: 14px;
padding-left:5px;
`;


  



function DetailPost({Id}) {
  const findPostById = (postId) => {
      const post = postData.post.find((post) => post.postId === postId);
      return post;
      };
    
    const parsedId = parseInt(Id, 10); // ID 값이 Intdu
    const postWithId = findPostById(parsedId);
  
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]); // 초기값 변경

    useEffect(() => {
      setPosts([postWithId]);  // 배열로 전달
      console.log(postWithId);
    }, [postWithId]);

      
  

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

  const Checkbox = ({ content, itemId, updateCount, count,post, postId }) => {

    const Label = styled.label`
        display: flex;
        align-items: center;
        gap: 10px; // 체크카운트와 내용 사이의 기본 간격.
        width: 339px;
        height: 30px;
        margin-bottom: 10px;
        `;

    const Content = styled.span`

    flex-grow: 1; // 여기에 추가하여 내용이 가능한 최대한의 공간을 차지하게 합니다.
    `;

    const CheckCount = styled.span`
    margin-right: 5px;
    font-size:10px;
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
        <div>
          <StyledCheckbox type="checkbox" checked={checked} onChange={handleChange} />
        </div>
      <Content> {content}</Content>
        <CheckCount>{item.check.length}명이 함께 했어요</CheckCount>
      </Label>
    );
  };
  
const renderItemsByCategory = (items, post) => {
    // 카테고리별 항목 그룹화
    const itemsByCategory = items.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  
    // 카테고리별 항목 렌더링
    return Object.entries(itemsByCategory).map(([category, items]) => (
      <div key={category}>
        <Category>{category}</Category>
        {items.map((item) => (
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
       
        
      </div>
      
    ));
  };
  

const handleFirstLineClick = (post) => (e) => {
 
  navigate(`postpage`, { state: { post: post } });
};
const handleTogetherClick = (post) => (e) => {
  console.log("Post ID:", post.postId);
  console.log("User ID:", userID);
};

const handleGetClick = (post) => (e) => {
  console.log("Post ID:", post.postId);
  console.log("User ID:", userID);
};


  const postItems = posts.map((post) => (
  <PostList key={post.postId}>
    <PostListItem>
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
          <Icon src={Together} onClick={handleTogetherClick(post)} />
          <IconCount>{post.together}</IconCount>
        </IconWrapper>
        <IconWrapper>
          <Icon src={Get} onClick={handleGetClick(post)} />
          <IconCount>{post.get}</IconCount>
        </IconWrapper>
     </IconsContainer>
    </FirstLine>
    
    <DateWriterInfo>
      <p>{post.writer}</p>
      <p className="date"> {post.date}</p>
      
    </DateWriterInfo>
    
    <Divider />
    <CheckList>{renderItemsByCategory(post.items, post)}</CheckList>

    
   

    </PostListItem>
  </PostList>
));



  return (
    <>
    <DetailPostComponent>
      <PostList>{postItems}</PostList>

    </DetailPostComponent>
    
    </>
    
  );
}
DetailPost.propTypes = {
    Id: PropTypes.number.isRequired,
    
}
export default DetailPost;
