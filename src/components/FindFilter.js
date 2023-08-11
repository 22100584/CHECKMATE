import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "../assets/images/SearchIcon.png";
import postData from "../post.json";
import Get from "../assets/images/u-exit.png";
import Together from "../assets/images/u-users-alt.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PostList = styled.div`
  list-style-type: none;
  margin-top: 20px;
  flex-direction: column;
`;

const PostListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 18px;
  box-sizing: border-box;
  width: 355px;
  height:auto;
  flex-shrink: 0;
  border-radius: 6px;background: #D9C7E7;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.12);
  

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



const FindFilterComponent = styled.div`
  font-family: "Pretendard";
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 18px;

  position: relative;

  .SearchFilterWrapper {
    display: flex;
  }

  .SearchWrapper {
    position: relative;
    display: inline-block;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.12);

    border-radius: 10px;
  }

  .SearchInput {
    padding: 8px 12px;
    padding-left: 35px;
    overflow: hidden;
    color: var(--labels-secondary, rgba(60, 60, 67, 0.60));
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 129.412% */
    letter-spacing: -0.4px;
    background-color: #FDFAFF;
    border: none;

    width: 260px;
  }

  .SearchIcon {
    position: absolute;
    height: 20px;
    width: auto;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }

  .FilterButton {
    margin-left: 8px;
    padding: 8px 12px;
    font-size: 17px;
    font-weight: 400;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    line-height: 22px; /* 129.412% */
    letter-spacing: -0.4px;
    color: var(--labels-secondary, rgba(60, 60, 67, 0.60));
    border: none;
    border-radius: 10px;
    background: #FFF;
    /* 효과 */
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.12);
    cursor: pointer;

    &:hover {
      background-color: #b7b7b7;
    }
  }
`;



function FindFilter() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);


  useEffect(() => {
    setPosts(postData.post);
  }, []);

  const onChange = (event) => {
    setSearch(event.target.value);
    let searchQuery = event.target.value.toLowerCase();
    if (searchQuery === "") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) =>
          post.hastags.some((hashtag) =>
            hashtag.toLowerCase().includes(searchQuery)
          ) || post.title.toLowerCase().includes(searchQuery)
        )
      );
    }
  };
  
  
  
    useEffect(() => {
      setFilteredPosts(posts);
    }, [posts]);
  const handleFilterClick = () => {
    console.log("Filter button clicked");
  };


  const updateCount = (postId, itemId, isChecked) => {

  };
  
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
`;

const item = post.items.find((i) => i.itemId === itemId);
const user_name = "김예지";
const [checked, setChecked] = useState(item.check.includes(user_name));

 

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
      {content} {item.check.length}
    </Label>
    );
  };

  // const GetFirstFourItems = (items) => {
  //   return items.slice(0, 4);
  // };

  const CarouselContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const CarouselPage = styled.div`
  display: flex;
  flex-direction: column;
`;

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
  
  const postItems = filteredPosts.map((post) => (
  <PostList key={post.postId}>
    <PostListItem>
    <FirstLine>
      <PostInfo>
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
        <CarouselContainer>
          <Carousel showArrows showStatus={false} showThumbs={false}>
            {renderItems(post.items, post)}
          </Carousel>
        </CarouselContainer>
      </CheckList>
    
    </PostListItem>

  </PostList>
));



  return (
    <FindFilterComponent>
      <div className="SearchFilterWrapper">
        <div className="SearchWrapper">
          <img src={SearchIcon} alt="Search icon" className="SearchIcon" />
          <input
            className="SearchInput"
            type="text"
            placeholder="검색"
            value={search}
            onChange={onChange}
          />
        </div>
        <button className="FilterButton" onClick={handleFilterClick}>
          필터
        </button>
      </div>
      <PostList>{postItems}</PostList>
    </FindFilterComponent>
  );
}

export default FindFilter;
