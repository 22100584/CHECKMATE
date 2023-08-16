import axios from "axios";

export const increaseCheck = async (itemId) => {
  // 체크리스트 항목 카운트 증가
  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.patch(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/item/increase-count`,
    {
      itemId,
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response;
};

export const decreaseCheck = async (itemId) => {
  // 체크리스트 항목 카운트 감속
  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.patch(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/item/decrease-count`,
    {
      itemId,
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response;
};
