import axios from "axios";

export const getFollowAndFollowerList = async (userId) => {
  // 팔로워/팔로잉 리스트 조회

  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.delete(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/follow`,
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

export const deleteFollow = async (userId, followingId) => {
  // 언팔로우

  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.delete(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/follow`,
    {
      userId: userId,
      followingId: followingId,
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

export const deleteUser = async (userId) => {
  // 유저 탈퇴

  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.delete(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/user`,
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
