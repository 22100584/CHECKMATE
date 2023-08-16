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

const AddItemInput = styled.input`
 

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
  
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]); // 초기값 변경

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
        </InputContainer>
        
      </div>
      
    ));
  };
  

const handleFirstLineClick = (post) => (e) => {
 
  navigate(`postpage`, { state: { post: post } });
};
const AddButton = styled.button`
  width: auto; 
  height: auto; 
  border-radius: 40px;
  background: #BC66FF;
  border: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
`;


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
          <FirstLine>          
            <StyledCheckbox type="checkbox" disabled />
            <AddItemInput
              type="text" 
              value={newCategoryWith}
              onChange={(e) => setNewCategoryWith(e.target.value)}
              onKeyPress={(e) => handleKeyEnter(e)}
              placeholder="새로운 항목"
            />
            <AddButton onClick={handleAddItemWithCategory}>항목 추가</AddButton>
          </FirstLine>
   </CategoryInputContainer>
)}

    </PostListItem>
  </PostList>
));



  return (
    <>
    <DetailPostComponent>
      <PostList>{postItems}</PostList>

    </DetailPostComponent>
    <FloatingActionButton onClick={() => setShowCategoryInput(true)}>카테고리 추가</FloatingActionButton>

    </>
    
  );
}
EditPost.propTypes = {
    Id: PropTypes.number.isRequired,
    
}
export default EditPost;