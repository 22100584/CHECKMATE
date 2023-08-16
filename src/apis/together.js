import axios from "axios";

export const deleteTogether = async (userId, postId) => {
  // 함께하기 취소

  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.delete(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/together`,
    {
      userId: userId,
      postId: postId,
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
