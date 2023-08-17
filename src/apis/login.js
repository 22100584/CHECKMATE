import axios from "axios";

export const kakaoLogin = async (code) => {
  // 체크리스트 항목 카운트 증가
  // const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}/auth/login?code=${code}`,

    {
      //   headers: {
      //     Authorization: `Bearer ${TOKEN}`,
      //   },
      withCredentials: true,
    }
  );
  return response;
};
