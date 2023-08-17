import axios from "axios";

export const getMyPage = async (userId) => {
  // 마이페이지 정보 가져오기
  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/user/my`,
    {
      param: userId,
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

export const saveNickname = async (userId, nickname) => {
  // 닉네임 저장하기
  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/user/my`,
    {
      userId: userId,
      nickname: nickname,
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

export const editNickname = async (userId, nickname) => {
  // 닉네임 수정하기
  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.patch(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/user/my`,
    {
      userId: userId,
      nickname: nickname,
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
