import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "../assets/images/SearchIcon.png";
import postData from "../post.json";
import Get from "../assets/images/u-exit.png";
import Together from "../assets/images/u-users-alt.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';



const userID = 1;

const FloatingActionButton = styled.button`
  position: fixed; 
  bottom:10vh;
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

const FloatingActionButtonIcon = styled.i`
  color: #000;
  font-size: 14px; // 이 부분 수정
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
  width: 355px;
  height:auto;
  flex-shrink: 0;
  border: 1px solid #1F1F1F;
  border-radius: 6px;
  background: white;


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
  
    border: none;
    border-radius: 10px;
background: #F2F2F2;
    width: 260px;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.12);


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
background: #F2F2F2;
/* 효과 */
box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.12);
    cursor: pointer;

    &:hover {
      background-color: #b7b7b7;
    }
  }
`;



function FindFilter() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [scope, setScope] = useState(1);

const DialogStyles = {
  position: 'absolute',
  top: 'calc(0% - 430px)',
  left: 'calc(50% - 160px)',


};

const handleFilterScope=(index)=>{
  setScope(index);
  console.log(scope);
  handleFilterClose();

}

  const handleFilterOpen = () => {
    setOpen(true);
  };

  const handleFilterClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    console.log(postData.post);
    readPostsByGet().then((res) => {
      // setPosts(res);
      console.log(res);
    });
    // setPosts(postData.post);
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

const handleCarouselClick = (e) => {
  e.stopPropagation();
};
  
const handleFirstLineClick = (post) => (e) => {
  navigate(`/postpage`, { state: { postId: `${post.postId}` } });
};


  const postItems = filteredPosts.map((post) => (
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
    <CheckList>
        <CarouselContainer onClick={handleCarouselClick}>
          <Carousel showArrows showStatus={false} showThumbs={false}>
            {renderItems(post.items, post)}
          </Carousel>
        </CarouselContainer>
      </CheckList>
    
    </PostListItem>
   
  </PostList>
));



const handleFabClick = () => {
  console.log("Floating Action Button clicked");
  navigate("/addpostpage");
};





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
        <button className="FilterButton" onClick={handleFilterOpen}>
          필터
        </button>
      </div>
      <PostList>{postItems}</PostList>
      <FloatingActionButton onClick={handleFabClick}>
				<FloatingActionButtonIcon  >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <line x1="6.87217" y1="2.84123e-08" x2="6.87217" y2="14" stroke="black" stroke-width="1.3"/>
  <line x1="14" y1="6.87217" x2="-5.68248e-08" y2="6.87217" stroke="black" stroke-width="1.3"/>
</svg>
        </FloatingActionButtonIcon>

				<span
					style={{
						marginLeft: '10px',
						lineHeight: '14px',
						fontSize: '10px',
						flexShrink: 0,
					}}
				>
					 글쓰기
				</span>
			</FloatingActionButton>
      <Dialog onClose={handleFilterClose} open={open} position="top" sx={DialogStyles}  PaperProps={{
    style: {
      backgroundColor: "#BC66FF",
      width:'150px',
      padding: 0,
    },
  }}>

      <DialogContent>
  <div style={{ height: '30px', margin: '0 0 0 5px',}} onClick={() => handleFilterScope(1)}>
    최신순
  </div>
  <Divider sx={{ background: 'white' }} />
  <div style={{ height: '30px', margin: '0 0 0 5px' }} onClick={() => handleFilterScope(2)}>
    가져오기 순
  </div>
  <Divider sx={{ background: 'white' }} />
  <div style={{ height: '30px', margin: '0 0 0 5px' }} onClick={() => handleFilterScope(3)}>
    함께하기 순
  </div>
</DialogContent>


</Dialog>

    </FindFilterComponent>
  );
}

export default FindFilter;
