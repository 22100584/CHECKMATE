import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { addPost } from "../apis/post";
import { useNavigate } from "react-router-dom";

const user_name = "김예지";

const AddPostComponent = styled.div`
  font-family: "Pretendard";
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;

  position: relative;

  background: #ead0ff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
`;

const FirstLine = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;

  .title {
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0px 0px 5px 0px;
    border: none;
    box-sizing: border-box;

    background: #ead0ff;
    &:focus {
      outline: none;
      border: none;
    }
  }
  .hashtag {
    border: none;
    width: auto;
    color: var(--unnamed, #1f1f1f);
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: #ead0ff;
    &:focus {
      outline: none;
      border: none;
    }
  }
`;
const SaveButton = styled.button`
  width: 72px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 17.581px;
  background: #fff;
  color: #1f1f1f;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: none;
`;

const HashtagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  color: var(--unnamed, #1f1f1f);
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 20vh;
  right: 20px;
  width: 87px;
  height: 36px;
  border-radius: 80px;
  background: #bc66ff;
  border: none;
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
const Category = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 30px;
  margin-bottom: 14px;
  padding-left: 5px;
`;

const CategoryInputContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  flex-direction: column;
`;
const AddItemInput = styled.input`
  flex-grow: 1;
  padding: 0px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ead0ff;
  &:focus {
    outline: none;
    border: none;
  }
  padding-left: 10px;
  color: var(--studywith-black, #121212);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0px;
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
  background: #ead0ff;
  padding-top: 30px;
  &:focus {
    outline: none;
    border: none;
  }
`;

const AddButton = styled.button`
  width: auto;
  height: auto;
  border-radius: 40px;
  background: #ead0ff;
  border: none;
  padding-right: 20px;
`;
const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow-y: scroll;
  min-height: 65vh;
  max-height: 65vh;
  padding-bottom: 100px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
  .content {
    padding-left: 10px;
    color: var(--studywith-black, #121212);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0px;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 339px;
  height: auto;
`;

const DateWriterInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  color: var(--unnamed, #1f1f1f);
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 5px;
  .date {
    margin-right: 10px;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 10px 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px; // 체크카운트와 내용 사이의 기본 간격.
  width: 339px;
  height: 30px;
  margin-bottom: 10px;
`;

const Hashtag = styled.div`
  background-color: #bc66ff; // 원하는 배경색으로 수정하세요.
  border-radius: 12px; // 원하는 border-radius 값을 설정하세요.
  padding: 4px 6px; // 패딩 값을 바꾸면 원하는 간격으로 수정할 수 있습니다.
  color: #fff;
  font-size: 10px;
  display: flex;
  align-items: center;
  gap: 5px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    padding: 0;
    border: none;
    font-size: 10px;
    color: #bc66ff;
    cursor: pointer;
  }
`;

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
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
`;
const ModalRowbtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #bc66ff;
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

function AddPost() {
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [items, setItems] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryWith, setNewCategoryWith] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newItemContent, setNewItemContent] = useState({});
  const [showModal, setShowModal] = useState(false);

  const uncategorized = ""; // 카테고리가 없는 경우를 위한 이름(예: 기타)
  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onHashtagChange = (e) => {
    setHashtagInput(e.target.value);
  };

  const onHashtagKeyDown = (e) => {
    if (e.key === "Enter") {
      const hashtagArray = hashtagInput
        .split(" ")
        .filter((tag) => tag.startsWith("#"))
        .map((tag) => tag.slice(1));
      const newHashtags = [...hashtags, ...hashtagArray].slice(0, 5);
      setHashtags(newHashtags);
      setHashtagInput("");
    }
  };

  useEffect(() => {
    console.log(hashtags);
  }, [hashtags]);

  const handleSave = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const saveAndClose = () => {
    const post = {
      userId: 1, // 여기에 실제 로그인 된 유저의 ID를 할당해주세요.
      postId: Date.now(),
      title: title,
      scope: 1, // 공개 범위 설정 로직을 구현하고 값을 할당해주세요.
      hashtag: hashtags,
      items: items.map((item) => {
        delete item.itemId;
        return item;
      }),
    };
    addPost(post).then((res) => {
      // setPosts(res);
      console.log(res);
      navigate("/");
    });
    console.log(post);
    closeModal();
  };

  const navigate = useNavigate();

  // 저장 작업을 처리하는 API를 호출하고, 성공 시 이동할 페이지에 대한 로직을 이곳에 추가하세요.

  const handleAddItemWithCategory = () => {
    if (!newCategory || !newCategoryWith) return;

    const newItem = {
      category: newCategory,
      itemId: Date.now(),
      content: newCategoryWith,
      count: 0,
      check: [],
    };
    console.log(newItem);

    setItems([...items, newItem]);

    setNewCategory("");
    setNewCategoryWith("");
    setShowCategoryInput(false);
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      handleAddItemWithCategory();
    }
  };

  const handleInputChange = (e, category) => {
    setNewItemContent((prevState) => ({
      ...prevState,
      [category]: e.target.value,
    }));
  };

  const handleAddItem = (category) => {
    if (!newItemContent[category]) return;

    const newItem = {
      category,
      itemId: Date.now(),
      content: newItemContent[category],
      count: 0,
      check: [],
    };

    console.log(newItem);

    setItems([...items, newItem]);

    setNewItemContent((prevState) => ({
      ...prevState,
      [category]: "",
    }));
  };

  const handleKeyPress = (e, category) => {
    if (e.key === "Enter") {
      handleAddItem(category);
    }
  };

  const onHashtagDelete = (indexToDelete) => {
    const newHashtags = hashtags.filter((_, index) => index !== indexToDelete);
    setHashtags(newHashtags);
  };

  const renderItemsByCategory = (items) => {
    // 카테고리별 항목 그룹화
    const itemsByCategory = items.reduce((acc, item) => {
      const category = item.category || uncategorized; // 없는 경우 '기타'로 설정
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    const categoriesToRender = [...Object.entries(itemsByCategory)]
      .filter(([category]) => category !== uncategorized)
      .sort((a, b) => a[0].localeCompare(b[0]));
    if (itemsByCategory[uncategorized]) {
      categoriesToRender.push([uncategorized, itemsByCategory[uncategorized]]);
    }

    // 카테고리별 항목 렌더링
    return categoriesToRender.map(([category, items]) => (
      <div key={category}>
        <Category>{category}</Category>

        {items.map((item) => (
          <Content>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 15 15"
              fill="none"
            >
              <circle cx="7.5" cy="7.5" r="7" stroke="#121212" />
            </svg>
            <p className="content">{item.content}</p>
          </Content>
        ))}
        {category !== "" && (
          <InputContainer>
            <svg
              className="margin"
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 15 15"
              fill="none"
            >
              <circle cx="7.5" cy="7.5" r="7" stroke="#121212" />
            </svg>

            <AddItemInput
              type="text"
              value={newItemContent[category] || "  "}
              onChange={(e) => handleInputChange(e, category)}
              onKeyPress={(e) => handleKeyPress(e, category)}
              placeholder="입력하세요"
            />
            <AddButton onClick={() => handleAddItem(category)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 17 17"
                fill="none"
              >
                <line
                  x1="8.54897"
                  y1="3.54166"
                  x2="8.54897"
                  y2="13.4583"
                  stroke="black"
                  stroke-width="1.2"
                  stroke-linejoin="round"
                />
                <line
                  x1="13.4583"
                  y1="8.54907"
                  x2="3.54158"
                  y2="8.54907"
                  stroke="black"
                  stroke-width="1.2"
                  stroke-linejoin="round"
                />
                <circle
                  cx="8.5"
                  cy="8.5"
                  r="7.9"
                  stroke="black"
                  stroke-width="1.2"
                  stroke-linejoin="round"
                />
              </svg>
            </AddButton>
          </InputContainer>
        )}
      </div>
    ));
  };

  return (
    <AddPostComponent>
      <FirstLine>
        <PostInfo>
          <input
            className="title"
            type="text"
            placeholder="제목"
            value={title}
            onChange={onTitleChange}
          />
          <HashtagsContainer>
            {hashtags.map((hashtag, index) => (
              <Hashtag key={index}>
                #{hashtag}
                <button onClick={() => onHashtagDelete(index)}>X</button>
              </Hashtag>
            ))}
            {hashtags.length < 5 && (
              <input
                className="hashtag"
                type="text"
                placeholder="#해쉬태그 입력 후 Enter"
                value={hashtagInput}
                onChange={onHashtagChange}
                onKeyDown={onHashtagKeyDown}
              />
            )}
          </HashtagsContainer>
        </PostInfo>
        <SaveButton onClick={handleSave}>저장하기</SaveButton>
      </FirstLine>

      <DateWriterInfo>
        <p>{user_name}</p>
        <p className="date"> {getDate()}</p>
      </DateWriterInfo>

      <Divider />

      <CheckList>
        {renderItemsByCategory(items)}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <circle cx="7.5" cy="7.5" r="7" stroke="#121212" />
              </svg>
              <AddItemInput
                type="text"
                value={newCategoryWith}
                onChange={(e) => setNewCategoryWith(e.target.value)}
                onKeyPress={(e) => handleKeyEnter(e)}
                placeholder="새로운 항목"
              />
              <AddButton onClick={handleAddItemWithCategory}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <line
                    x1="8.54897"
                    y1="3.54166"
                    x2="8.54897"
                    y2="13.4583"
                    stroke="black"
                    stroke-width="1.2"
                    stroke-linejoin="round"
                  />
                  <line
                    x1="13.4583"
                    y1="8.54907"
                    x2="3.54158"
                    y2="8.54907"
                    stroke="black"
                    stroke-width="1.2"
                    stroke-linejoin="round"
                  />
                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="7.9"
                    stroke="black"
                    stroke-width="1.2"
                    stroke-linejoin="round"
                  />
                </svg>
              </AddButton>
            </InputContainer>
          </CategoryInputContainer>
        )}
        <InputContainer>
          <svg
            className="margin"
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 15 15"
            fill="none"
          >
            <circle cx="7.5" cy="7.5" r="7" stroke="#121212" />
          </svg>
          <AddItemInput
            type="text"
            value={newItemContent[""] || ""}
            onChange={(e) => handleInputChange(e, "")}
            onKeyPress={(e) => handleKeyPress(e, "")}
            placeholder="입력하세요"
          />
          <AddButton onClick={() => handleAddItem("")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 17 17"
              fill="none"
            >
              <line
                x1="8.54897"
                y1="3.54166"
                x2="8.54897"
                y2="13.4583"
                stroke="black"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
              <line
                x1="13.4583"
                y1="8.54907"
                x2="3.54158"
                y2="8.54907"
                stroke="black"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="7.9"
                stroke="black"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
            </svg>
          </AddButton>
        </InputContainer>
      </CheckList>

      <FloatingActionButton
        onClick={() => setShowCategoryInput(!showCategoryInput)}
      >
        카테고리 추가
      </FloatingActionButton>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>저장하시겠습니까?</h3>
            <ModalRowbtns>
              <button onClick={closeModal}>취소</button>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <button onClick={() => saveAndClose()}>확인</button>
              </Link>
            </ModalRowbtns>
          </ModalContent>
        </ModalOverlay>
      )}
    </AddPostComponent>
  );
}

export default AddPost;
