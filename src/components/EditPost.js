import React, { useState, useEffect } from "react";
import styled from "styled-components";
import postData from "../post.json";
import Get from "../assets/images/u-exit.png";
import Together from "../assets/images/u-users-alt.png";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const userID = 111;

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
    .editFont{
        color: #000;
font-family: Pretendard;
font-size: 15px;
font-style: normal;
font-weight: 500;
line-height: normal;
    }
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

const AddItemInput = styled.input`
 
 flex-grow: 1;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
 
  background: #EAD0FF;
  &:focus {
    outline: none;
    border:none
  }
`;



const InputContainer = styled.div`
  display: flex;
  width:100%;
  gap: 10px; // 체크박스와 입력 필드 사이에 간격을 줍니다.
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

const CategoryInputContainer = styled.div`
display: flex;
width: 100%;
gap: 10px;
flex-direction: column;

`;

const AddCategoryInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #000;
  background: #EAD0FF;
  padding-top:30px;
  &:focus {
    outline: none;
    border:none
  }
`;

  



function EditPost({Id}) {
  const findPostById = (postId) => {
      const post = postData.post.find((post) => post.postId === postId);
      return post;
      };
    
    const parsedId = parseInt(Id, 10); // ID 값이 Intdu
    const postWithId = findPostById(parsedId);
  
  const [showModal, setShowModal] = useState(false);

  const [posts, setPosts] = useState([]); // 초기값 변경
    const [post,setPost]=useState([]);
    useEffect(() => {
      setPosts([postWithId]);  // 배열로 전달
      console.log(postWithId);
    }, [postWithId]);

      
    const [newItemContent, setNewItemContent] = useState({});


    const handleAddItem = (category) => {
        if (!newItemContent[category]) return;
      
        setPosts((prevPosts) => {
          return prevPosts.map((post) => {
            if (post.postId === parsedId) {
              const newItem = {
                category,
                itemId: Date.now(),
                content: newItemContent[category],
                count: 153,
                check: [],
              };
      
              const updatedPost = {
                ...post,
                items: [...post.items, newItem],
              };
      
              console.log("새로운 항목이 추가된 post: ", updatedPost);
      
              return updatedPost;
            }
      
            return post;
          });
        });
      
        setNewItemContent((prevState) => ({
          ...prevState,
          [category]: "",
        }));
      };
  

  const handleInputChange = (e, category) => {
    setNewItemContent((prevState) => ({
      ...prevState,
      [category]: e.target.value,
    }));
  };
  
  const handleKeyPress = (e, category) => {
    if (e.key === "Enter") {
      handleAddItem(category);

    }
  };
  const handleKeyEnter=(e)=>{
    if (e.key === "Enter") {
      
      handleAddItemWithCategory();
    }
  };

const updateCount = (postId, itemId, isChecked) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
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
    });
    
  };

  const handleIconClick = (posts) => {
    setShowModal(true);
   
      setPost(posts);
   
    console.log("Clicked Post: ", post);
};

const [newCategory, setNewCategory] = useState("");
const [newCategoryWith, setNewCategoryWith]=useState("");
const [showCategoryInput, setShowCategoryInput] = useState(false);
  
const FloatingActionButton = styled.button`
  position: fixed; 
  bottom:20vh;
  right: 20px;
  width: 87px; 
  height: 36px; 
  border-radius: 80px;
  background: #BC66FF;
  border: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

  const handleAddItemWithCategory = () => {
    if (!newCategory || !newCategoryWith) return;
  
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.postId === parsedId) {
          const newItem = {
            category: newCategory,
            itemId: Date.now(),
            content: newCategoryWith,
            count: 153,
            check: [],
          };
  
          const updatedPost = {
            ...post,
            items: [...post.items, newItem],
          };
  
          console.log("새로운 항목이 추가된 post: ", updatedPost);
  
          return updatedPost;
        }
  
        return post;
      });
    });
  
    
    setNewCategory(""); 
    setNewCategoryWith("");
    setShowCategoryInput(false); // 입력 필드 숨김
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
        <InputContainer>
          <StyledCheckbox type="checkbox" disabled />
          <AddItemInput
            type="text"
            value={newItemContent[category] || ""}
            onChange={(e) => handleInputChange(e, category)}
            onKeyPress={(e) => handleKeyPress(e, category)}
            placeholder="입력하세요"
          /> 
          <AddButton  onClick={() => handleAddItem(category)}>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <line x1="8.54897" y1="3.54166" x2="8.54897" y2="13.4583" stroke="black" stroke-width="1.2" stroke-linejoin="round"/>
          <line x1="13.4583" y1="8.54907" x2="3.54158" y2="8.54907" stroke="black" stroke-width="1.2" stroke-linejoin="round"/>
          <circle cx="8.5" cy="8.5" r="7.9" stroke="black" stroke-width="1.2" stroke-linejoin="round"/>
          </svg></AddButton>
        </InputContainer>
        
      </div>
      
    ));
  };
  


const AddButton = styled.button`
  width: auto; 
  height: auto; 
  border-radius: 40px;
  background: #EAD0FF;
  border: none;
  padding-right: 20px;

`;
const closeModal = () => {
  setShowModal(false);
  
};

const saveAndClose = (post) => {
  console.log(post);
  
  closeModal();
  
};

  const postItems = posts.map((post) => (
  <PostList key={post.postId}>
    <PostListItem>
    <FirstLine  >
      <PostInfo 
        style={{ cursor: 'pointer' }}>
      <p className="title">{post.title}</p>
      <HashTags>
        {post.hastags.map((hashtag, index) => (
          <span key={index}>#{hashtag}</span>
        ))}
      </HashTags>
      </PostInfo>
      <IconsContainer  onClick={() => handleIconClick(post)}>
        <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
<path d="M8.5 2.07143V11.1786M11.7143 4.21429L8.5 1L5.28571 4.21429M1 9.57143V14.9286C1 15.4969 1.22576 16.0419 1.62763 16.4438C2.02949 16.8457 2.57454 17.0714 3.14286 17.0714H13.8571C14.4255 17.0714 14.9705 16.8457 15.3724 16.4438C15.7742 16.0419 16 15.4969 16 14.9286V9.57143" stroke="black" stroke-width="1.58333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          
        </IconWrapper>
        <IconWrapper >
            <div className="editFont"  onClick={() => handleIconClick(post)}>Edit</div>
        </IconWrapper>
     </IconsContainer>
    </FirstLine>
    
    <DateWriterInfo>
      <p>{post.writer}</p>
      <p className="date"> {post.date}</p>
      
    </DateWriterInfo>
    
    <Divider />
    <CheckList>{renderItemsByCategory(post.items, post)}</CheckList>

    
    {showCategoryInput && (
    <CategoryInputContainer>
          <AddCategoryInput
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => handleKeyEnter(e)}
            placeholder="새로운 카테고리"
          />
          <InputContainer>          
            <StyledCheckbox type="checkbox" disabled />
            <AddItemInput
              type="text" 
              value={newCategoryWith}
              onChange={(e) => setNewCategoryWith(e.target.value)}
              onKeyPress={(e) => handleKeyEnter(e)}
              placeholder="새로운 항목"
            />
            <AddButton onClick={handleAddItemWithCategory}><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
<line x1="8.54897" y1="3.54166" x2="8.54897" y2="13.4583" stroke="black" stroke-width="1.2" stroke-linejoin="round"/>
<line x1="13.4583" y1="8.54907" x2="3.54158" y2="8.54907" stroke="black" stroke-width="1.2" stroke-linejoin="round"/>
<circle cx="8.5" cy="8.5" r="7.9" stroke="black" stroke-width="1.2" stroke-linejoin="round"/>
</svg></AddButton>
          </InputContainer>
          
   </CategoryInputContainer>
)}
 
    </PostListItem>
  </PostList>
));




    

  return (
    <>
    <DetailPostComponent>
      <PostList>{postItems}</PostList>
      {showModal && (
      <ModalOverlay>
        <ModalContent>
          <h3>수정하시겠습니까?</h3>
          <ModalRowbtns>
            <button onClick={closeModal}>취소</button>
            <Link to="/mypage" style={{ textDecoration: "none", color: "inherit" }}>
          <button onClick={()=>saveAndClose(post)}>확인</button>
      </Link>
          </ModalRowbtns>
        </ModalContent>
      </ModalOverlay>
    )}
    </DetailPostComponent>
    <FloatingActionButton onClick={() => setShowCategoryInput(true)}>카테고리 추가</FloatingActionButton>

    </>
    
  );
}
EditPost.propTypes = {
    Id: PropTypes.number.isRequired,
    
}
export default EditPost;