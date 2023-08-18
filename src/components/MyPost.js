import React,{useRef} from 'react';
import styled from "styled-components";
import ProfileImage from "../assets/images/profile.png";
import userData from '../user.json';
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const userID=1;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
font-family: "Pretendard";
  max-width: 400px; 
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const ModalRowbtns = styled.div`

  display: flex;
  flex-direction: row;
gap:20px;
justify-content: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #BC66FF;
    border-radius: 20px;
    width: 60px;
    height: 30px;
    padding: 0;
    border: none;
    font-size: 15px;
    font-family: "Pretendard";
    color: #000;
    cursor: pointer;
  }


  `;


const DeleteIconWrapper = styled.div`
 display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top:2px;
`;

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
    flex-direction: column;
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
      disabled
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
    const [posts2, setPosts2] = useState([]);
    const [uploadedImage, setUploadedImage] = React.useState(null);
    const inputRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [postID,setPostID]=useState();
    const onChangeImage = (event) => {
      if (event.target.files && event.target.files[0]) {
        setUploadedImage(URL.createObjectURL(event.target.files[0]));
        console.log("이미지 이름:", event.target.files[0].name);
      }
    };
  
    const handleClick = () => {
      inputRef.current.click();
    };

    useEffect(() => {
      
      setPosts(userData.user.myList);
    }, []);

    useEffect(() => {
      
      setPosts2(userData.user.togetherList);
    }, []);

  

    const handleFirstLineClick = (post) => (e) => {
      console.log(post);
      navigate(`/editmypage`, { state: { postId: `${post.postId}` } });
      };
    
      const updateCount = (postId, itemId, isChecked) => {
        console.log(postId);
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
      const handleDeleteClick = (postId) => {
        console.log("userID: " + userID);
        console.log("postId: " + postId);
        setPostID(postId);
        setShowModal(true);
      };
      const handleTogetherClick = (postId) => {
        console.log("userID: " + userID);
        console.log("postId: " + postId);
        setPostID(postId);
        setShowModal1(true);
      };
      const handleGetClick = (postId) => {
        console.log("userID: " + userID);
        console.log("postId: " + postId);
        setPostID(postId);
        setShowModal2(true);
      };

      const handleDetailPost = ({ userData }) => {
        console.log(userData);
        navigate('/followpage', {
          state: {
            nickname: `${userData.user.nickname}`,
            
          },
        });
      };
    
    
    const postItems_get = posts.map((post) => (
     
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
          <DeleteIconWrapper onClick={() => handleDeleteClick(post.postId)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
<path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM11 0.777778H8.25L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778Z" fill="black"/>
</svg>
  </DeleteIconWrapper>
            <IconWrapper onClick={() => handleTogetherClick(post.postId)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M9.225 9.165C9.62518 8.8186 9.94616 8.39016 10.1662 7.90877C10.3861 7.42737 10.5 6.90428 10.5 6.375C10.5 5.38044 10.1049 4.42661 9.40165 3.72335C8.69839 3.02009 7.74456 2.625 6.75 2.625C5.75544 2.625 4.80161 3.02009 4.09835 3.72335C3.39509 4.42661 3 5.38044 3 6.375C2.99999 6.90428 3.11385 7.42737 3.33384 7.90877C3.55384 8.39016 3.87482 8.8186 4.275 9.165C3.2251 9.64041 2.33435 10.4081 1.70924 11.3764C1.08412 12.3447 0.751104 13.4725 0.75 14.625C0.75 14.8239 0.829018 15.0147 0.96967 15.1553C1.11032 15.296 1.30109 15.375 1.5 15.375C1.69891 15.375 1.88968 15.296 2.03033 15.1553C2.17098 15.0147 2.25 14.8239 2.25 14.625C2.25 13.4315 2.72411 12.2869 3.56802 11.443C4.41193 10.5991 5.55653 10.125 6.75 10.125C7.94347 10.125 9.08807 10.5991 9.93198 11.443C10.7759 12.2869 11.25 13.4315 11.25 14.625C11.25 14.8239 11.329 15.0147 11.4697 15.1553C11.6103 15.296 11.8011 15.375 12 15.375C12.1989 15.375 12.3897 15.296 12.5303 15.1553C12.671 15.0147 12.75 14.8239 12.75 14.625C12.7489 13.4725 12.4159 12.3447 11.7908 11.3764C11.1657 10.4081 10.2749 9.64041 9.225 9.165ZM6.75 8.625C6.30499 8.625 5.86998 8.49304 5.49997 8.24581C5.12996 7.99857 4.84157 7.64717 4.67127 7.23604C4.50097 6.8249 4.45642 6.3725 4.54323 5.93605C4.63005 5.49959 4.84434 5.09868 5.15901 4.78401C5.47368 4.46934 5.87459 4.25505 6.31105 4.16823C6.7475 4.08142 7.1999 4.12597 7.61104 4.29627C8.02217 4.46657 8.37357 4.75496 8.62081 5.12497C8.86804 5.49498 9 5.92999 9 6.375C9 6.97174 8.76295 7.54403 8.34099 7.96599C7.91903 8.38795 7.34674 8.625 6.75 8.625ZM14.055 8.865C14.535 8.3245 14.8485 7.65679 14.9579 6.94225C15.0672 6.22772 14.9677 5.49681 14.6713 4.8375C14.375 4.17819 13.8943 3.6186 13.2874 3.22607C12.6804 2.83354 11.9729 2.62481 11.25 2.625C11.0511 2.625 10.8603 2.70402 10.7197 2.84467C10.579 2.98532 10.5 3.17609 10.5 3.375C10.5 3.57391 10.579 3.76468 10.7197 3.90533C10.8603 4.04598 11.0511 4.125 11.25 4.125C11.8467 4.125 12.419 4.36205 12.841 4.78401C13.2629 5.20597 13.5 5.77826 13.5 6.375C13.4989 6.76893 13.3945 7.15568 13.197 7.49657C12.9996 7.83745 12.7162 8.12054 12.375 8.3175C12.2638 8.38164 12.1709 8.47325 12.1053 8.58356C12.0396 8.69386 12.0034 8.81918 12 8.9475C11.9969 9.07482 12.0262 9.20085 12.0852 9.31369C12.1443 9.42654 12.2311 9.52249 12.3375 9.5925L12.63 9.7875L12.7275 9.84C13.6315 10.2688 14.3942 10.947 14.9257 11.7947C15.4572 12.6425 15.7354 13.6245 15.7275 14.625C15.7275 14.8239 15.8065 15.0147 15.9472 15.1553C16.0878 15.296 16.2786 15.375 16.4775 15.375C16.6764 15.375 16.8672 15.296 17.0078 15.1553C17.1485 15.0147 17.2275 14.8239 17.2275 14.625C17.2336 13.4741 16.9454 12.3407 16.3901 11.3325C15.8348 10.3244 15.031 9.47499 14.055 8.865Z" fill="black"/>
</svg>
              <IconCount>{post.together}</IconCount>
            </IconWrapper>
            <IconWrapper onClick={() => handleGetClick(post.postId)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M3 9C3 9.19891 3.07902 9.38968 3.21967 9.53033C3.36032 9.67098 3.55109 9.75 3.75 9.75H9.4425L7.7175 11.4675C7.6472 11.5372 7.59141 11.6202 7.55333 11.7116C7.51525 11.803 7.49565 11.901 7.49565 12C7.49565 12.099 7.51525 12.197 7.55333 12.2884C7.59141 12.3798 7.6472 12.4628 7.7175 12.5325C7.78722 12.6028 7.87017 12.6586 7.96157 12.6967C8.05296 12.7347 8.15099 12.7543 8.25 12.7543C8.34901 12.7543 8.44704 12.7347 8.53843 12.6967C8.62983 12.6586 8.71278 12.6028 8.7825 12.5325L11.7825 9.5325C11.8508 9.46117 11.9043 9.37706 11.94 9.285C12.015 9.1024 12.015 8.8976 11.94 8.715C11.9043 8.62294 11.8508 8.53883 11.7825 8.4675L8.7825 5.4675C8.71257 5.39757 8.62955 5.3421 8.53819 5.30426C8.44682 5.26641 8.34889 5.24693 8.25 5.24693C8.15111 5.24693 8.05318 5.26641 7.96181 5.30426C7.87045 5.3421 7.78743 5.39757 7.7175 5.4675C7.64757 5.53743 7.5921 5.62045 7.55426 5.71181C7.51641 5.80318 7.49693 5.90111 7.49693 6C7.49693 6.09889 7.51641 6.19682 7.55426 6.28819C7.5921 6.37955 7.64757 6.46257 7.7175 6.5325L9.4425 8.25H3.75C3.55109 8.25 3.36032 8.32902 3.21967 8.46967C3.07902 8.61032 3 8.80109 3 9ZM12.75 1.5H5.25C4.65326 1.5 4.08097 1.73705 3.65901 2.15901C3.23705 2.58097 3 3.15326 3 3.75V6C3 6.19891 3.07902 6.38968 3.21967 6.53033C3.36032 6.67098 3.55109 6.75 3.75 6.75C3.94891 6.75 4.13968 6.67098 4.28033 6.53033C4.42098 6.38968 4.5 6.19891 4.5 6V3.75C4.5 3.55109 4.57902 3.36032 4.71967 3.21967C4.86032 3.07902 5.05109 3 5.25 3H12.75C12.9489 3 13.1397 3.07902 13.2803 3.21967C13.421 3.36032 13.5 3.55109 13.5 3.75V14.25C13.5 14.4489 13.421 14.6397 13.2803 14.7803C13.1397 14.921 12.9489 15 12.75 15H5.25C5.05109 15 4.86032 14.921 4.71967 14.7803C4.57902 14.6397 4.5 14.4489 4.5 14.25V12C4.5 11.8011 4.42098 11.6103 4.28033 11.4697C4.13968 11.329 3.94891 11.25 3.75 11.25C3.55109 11.25 3.36032 11.329 3.21967 11.4697C3.07902 11.6103 3 11.8011 3 12V14.25C3 14.8467 3.23705 15.419 3.65901 15.841C4.08097 16.2629 4.65326 16.5 5.25 16.5H12.75C13.3467 16.5 13.919 16.2629 14.341 15.841C14.7629 15.419 15 14.8467 15 14.25V3.75C15 3.15326 14.7629 2.58097 14.341 2.15901C13.919 1.73705 13.3467 1.5 12.75 1.5Z" fill="black"/>
</svg>
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

      const postItems_together = posts2.map((post) => (
      
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
          <DeleteIconWrapper onClick={() => handleDeleteClick(post.postId)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
<path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM11 0.777778H8.25L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778Z" fill="black"/>
</svg>
  </DeleteIconWrapper>
            <IconWrapper onClick={() => handleTogetherClick(post.postId)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M9.225 9.165C9.62518 8.8186 9.94616 8.39016 10.1662 7.90877C10.3861 7.42737 10.5 6.90428 10.5 6.375C10.5 5.38044 10.1049 4.42661 9.40165 3.72335C8.69839 3.02009 7.74456 2.625 6.75 2.625C5.75544 2.625 4.80161 3.02009 4.09835 3.72335C3.39509 4.42661 3 5.38044 3 6.375C2.99999 6.90428 3.11385 7.42737 3.33384 7.90877C3.55384 8.39016 3.87482 8.8186 4.275 9.165C3.2251 9.64041 2.33435 10.4081 1.70924 11.3764C1.08412 12.3447 0.751104 13.4725 0.75 14.625C0.75 14.8239 0.829018 15.0147 0.96967 15.1553C1.11032 15.296 1.30109 15.375 1.5 15.375C1.69891 15.375 1.88968 15.296 2.03033 15.1553C2.17098 15.0147 2.25 14.8239 2.25 14.625C2.25 13.4315 2.72411 12.2869 3.56802 11.443C4.41193 10.5991 5.55653 10.125 6.75 10.125C7.94347 10.125 9.08807 10.5991 9.93198 11.443C10.7759 12.2869 11.25 13.4315 11.25 14.625C11.25 14.8239 11.329 15.0147 11.4697 15.1553C11.6103 15.296 11.8011 15.375 12 15.375C12.1989 15.375 12.3897 15.296 12.5303 15.1553C12.671 15.0147 12.75 14.8239 12.75 14.625C12.7489 13.4725 12.4159 12.3447 11.7908 11.3764C11.1657 10.4081 10.2749 9.64041 9.225 9.165ZM6.75 8.625C6.30499 8.625 5.86998 8.49304 5.49997 8.24581C5.12996 7.99857 4.84157 7.64717 4.67127 7.23604C4.50097 6.8249 4.45642 6.3725 4.54323 5.93605C4.63005 5.49959 4.84434 5.09868 5.15901 4.78401C5.47368 4.46934 5.87459 4.25505 6.31105 4.16823C6.7475 4.08142 7.1999 4.12597 7.61104 4.29627C8.02217 4.46657 8.37357 4.75496 8.62081 5.12497C8.86804 5.49498 9 5.92999 9 6.375C9 6.97174 8.76295 7.54403 8.34099 7.96599C7.91903 8.38795 7.34674 8.625 6.75 8.625ZM14.055 8.865C14.535 8.3245 14.8485 7.65679 14.9579 6.94225C15.0672 6.22772 14.9677 5.49681 14.6713 4.8375C14.375 4.17819 13.8943 3.6186 13.2874 3.22607C12.6804 2.83354 11.9729 2.62481 11.25 2.625C11.0511 2.625 10.8603 2.70402 10.7197 2.84467C10.579 2.98532 10.5 3.17609 10.5 3.375C10.5 3.57391 10.579 3.76468 10.7197 3.90533C10.8603 4.04598 11.0511 4.125 11.25 4.125C11.8467 4.125 12.419 4.36205 12.841 4.78401C13.2629 5.20597 13.5 5.77826 13.5 6.375C13.4989 6.76893 13.3945 7.15568 13.197 7.49657C12.9996 7.83745 12.7162 8.12054 12.375 8.3175C12.2638 8.38164 12.1709 8.47325 12.1053 8.58356C12.0396 8.69386 12.0034 8.81918 12 8.9475C11.9969 9.07482 12.0262 9.20085 12.0852 9.31369C12.1443 9.42654 12.2311 9.52249 12.3375 9.5925L12.63 9.7875L12.7275 9.84C13.6315 10.2688 14.3942 10.947 14.9257 11.7947C15.4572 12.6425 15.7354 13.6245 15.7275 14.625C15.7275 14.8239 15.8065 15.0147 15.9472 15.1553C16.0878 15.296 16.2786 15.375 16.4775 15.375C16.6764 15.375 16.8672 15.296 17.0078 15.1553C17.1485 15.0147 17.2275 14.8239 17.2275 14.625C17.2336 13.4741 16.9454 12.3407 16.3901 11.3325C15.8348 10.3244 15.031 9.47499 14.055 8.865Z" fill="black"/>
</svg>
              <IconCount>{post.together}</IconCount>
            </IconWrapper>
            <IconWrapper onClick={() => handleGetClick(post.postId)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M3 9C3 9.19891 3.07902 9.38968 3.21967 9.53033C3.36032 9.67098 3.55109 9.75 3.75 9.75H9.4425L7.7175 11.4675C7.6472 11.5372 7.59141 11.6202 7.55333 11.7116C7.51525 11.803 7.49565 11.901 7.49565 12C7.49565 12.099 7.51525 12.197 7.55333 12.2884C7.59141 12.3798 7.6472 12.4628 7.7175 12.5325C7.78722 12.6028 7.87017 12.6586 7.96157 12.6967C8.05296 12.7347 8.15099 12.7543 8.25 12.7543C8.34901 12.7543 8.44704 12.7347 8.53843 12.6967C8.62983 12.6586 8.71278 12.6028 8.7825 12.5325L11.7825 9.5325C11.8508 9.46117 11.9043 9.37706 11.94 9.285C12.015 9.1024 12.015 8.8976 11.94 8.715C11.9043 8.62294 11.8508 8.53883 11.7825 8.4675L8.7825 5.4675C8.71257 5.39757 8.62955 5.3421 8.53819 5.30426C8.44682 5.26641 8.34889 5.24693 8.25 5.24693C8.15111 5.24693 8.05318 5.26641 7.96181 5.30426C7.87045 5.3421 7.78743 5.39757 7.7175 5.4675C7.64757 5.53743 7.5921 5.62045 7.55426 5.71181C7.51641 5.80318 7.49693 5.90111 7.49693 6C7.49693 6.09889 7.51641 6.19682 7.55426 6.28819C7.5921 6.37955 7.64757 6.46257 7.7175 6.5325L9.4425 8.25H3.75C3.55109 8.25 3.36032 8.32902 3.21967 8.46967C3.07902 8.61032 3 8.80109 3 9ZM12.75 1.5H5.25C4.65326 1.5 4.08097 1.73705 3.65901 2.15901C3.23705 2.58097 3 3.15326 3 3.75V6C3 6.19891 3.07902 6.38968 3.21967 6.53033C3.36032 6.67098 3.55109 6.75 3.75 6.75C3.94891 6.75 4.13968 6.67098 4.28033 6.53033C4.42098 6.38968 4.5 6.19891 4.5 6V3.75C4.5 3.55109 4.57902 3.36032 4.71967 3.21967C4.86032 3.07902 5.05109 3 5.25 3H12.75C12.9489 3 13.1397 3.07902 13.2803 3.21967C13.421 3.36032 13.5 3.55109 13.5 3.75V14.25C13.5 14.4489 13.421 14.6397 13.2803 14.7803C13.1397 14.921 12.9489 15 12.75 15H5.25C5.05109 15 4.86032 14.921 4.71967 14.7803C4.57902 14.6397 4.5 14.4489 4.5 14.25V12C4.5 11.8011 4.42098 11.6103 4.28033 11.4697C4.13968 11.329 3.94891 11.25 3.75 11.25C3.55109 11.25 3.36032 11.329 3.21967 11.4697C3.07902 11.6103 3 11.8011 3 12V14.25C3 14.8467 3.23705 15.419 3.65901 15.841C4.08097 16.2629 4.65326 16.5 5.25 16.5H12.75C13.3467 16.5 13.919 16.2629 14.341 15.841C14.7629 15.419 15 14.8467 15 14.25V3.75C15 3.15326 14.7629 2.58097 14.341 2.15901C13.919 1.73705 13.3467 1.5 12.75 1.5Z" fill="black"/>
</svg>
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
  
    const [activeTabIndex, setActiveTabIndex] = useState(0);
   
    function Tab({ title, active, onClick }) {
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
    
    function TabsContent({ activeTabIndex, postItems_get, postItems_together }) {
      return (
        <PostList>
          {activeTabIndex === 0 && postItems_get}
          {activeTabIndex === 1 && postItems_together}
        </PostList>
      );
    }
    
    
    const deletecloseModal = () => {
      setShowModal(false);
      
    };
    
    const deleteAndClose = () => {
      
     console.log(postID);
      deletecloseModal();
      
    };
    
    const togethercloseModal = () => {
      setShowModal1(false);
      
    };
    
    const togetherAndClose = () => {
      
     console.log(postID);
      togethercloseModal();
      
    };
    const getcloseModal = () => {
      setShowModal2(false);
      
    };
    
    const getAndClose = () => {
      
     console.log(postID);
      getcloseModal();
      
    };
    
 

  return (
    <MyPostComponent>
      <MyInfo>
      
      {uploadedImage ? (
        <UserProfile src={uploadedImage} alt="프로필 없을때" onClick={handleClick} />
      ) : (
        <UserProfile src={ProfileImage} alt="프로필사진" onClick={handleClick} />
      )}
      <input type="file" ref={inputRef} onChange={onChangeImage} style={{ display: 'none' }} />
      
        <MyNameFollow onClick={() => handleDetailPost({ userData })}>
          <p className='margin-bottom'>{userData.user.nickname}</p>
          
          
           <MyFollow>
    <p className='margin'>팔로워 {userData.user.follower}명 </p>
    <p className='margin-second'> 팔로잉 {userData.user.following}명</p>
  </MyFollow>
        
        </MyNameFollow>
        
      </MyInfo>
      <FilterPost>
        <Tab
          title="내글 보기"
          active={activeTabIndex === 0}
          onClick={() => setActiveTabIndex(0)}
        />
        <Tab
          title="함께한 글 보기"
          active={activeTabIndex === 1}
          onClick={() => setActiveTabIndex(1)}
        />
      </FilterPost>
      <TabsContent
        activeTabIndex={activeTabIndex}
        postItems_get={postItems_get}
        postItems_together={postItems_together}
      />
{showModal && (
      <ModalOverlay>
        <ModalContent>
          <h3>저장하시겠습니까?</h3>
          <ModalRowbtns>
            <button onClick={deletecloseModal}>취소</button>
            <button onClick={()=>deleteAndClose(postID)}>확인</button>

      
          </ModalRowbtns>
        </ModalContent>
      </ModalOverlay>
    )}
    {showModal1 && (
      <ModalOverlay>
        <ModalContent>
          <h3>함께하시겠습니까?</h3>
          <ModalRowbtns>
            <button onClick={togethercloseModal}>취소</button>
            <button onClick={()=>togetherAndClose(postID)}>확인</button>

      
          </ModalRowbtns>
        </ModalContent>
      </ModalOverlay>
    )}
    {showModal2 && (
      <ModalOverlay>
        <ModalContent>
          <h3>가져오시겠습니까?</h3>
          <ModalRowbtns>
            <button onClick={getcloseModal}>취소</button>
            <button onClick={()=>getAndClose(postID)}>확인</button>

      
          </ModalRowbtns>
        </ModalContent>
      </ModalOverlay>
    )}
    </MyPostComponent>
  );
}

export default MyPost;
