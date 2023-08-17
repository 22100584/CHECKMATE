import axios from "axios";

export const readPostsByTime = async () => {
  // 최신순으로 게시글 가져오기
  // const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/post/time`,
    {
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const readPostsByGet = async () => {
  // 가져오기순으로 게시글 가져오기
  // const TOKEN = localStorage.getItem("accessToken");
  // const TOKEN = process.env.TOKEN;

  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/post/get`,
    {
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const readPostsByTogether = async () => {
  // 함께하기순으로 게시글 가져오기
  // const TOKEN = localStorage.getItem("accessToken");

  const TOKEN = process.env.TOKEN;
  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/post/together`,
    {
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const search = async (keyword) => {
  // 검색 기능
  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/post/search`,
    {
      params: { keyword },
    },
    {
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const readPostDetail = async (postId) => {
  // 게시글 상세 조회

  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/post`,
    {
      params: { postId },
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const reportPost = async (postId, content) => {
  // 신고하기

  const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/report`,
    {
      postId: postId,
      content: content,
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const savePost = async (data) => {
  // 게시글저장

  // const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.delete(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/post`,
    data,
    {
      // headers: {
      //   Authorization: `Bearer ${TOKEN}`,
      // },
      withCredentials: true,
    }
  );
  return response.data;
};

export const addPost = async (data) => {
  // 체크리스트 작성

  // const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/post`,
    data,
    {
      // headers: {
      //   Authorization: `Bearer ${TOKEN}`,
      // },
      withCredentials: true,
    }
  );
  return response.data;
};

export const editPost = async (data) => {
  // 체크리스트 수정

  // const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.patch(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/post`,
    data,
    {
      // headers: {
      //   Authorization: `Bearer ${TOKEN}`,
      // },
      withCredentials: true,
    }
  );
  return response.data;
};

export const deletePost = async (data) => {
  // 체크리스트 삭제

  // const TOKEN = localStorage.getItem("accessToken");

  const response = await axios.delete(
    `${process.env.REACT_APP_BACK_BASE_URL}/api/post`,
    data,
    {
      // headers: {
      //   Authorization: `Bearer ${TOKEN}`,
      // },
      withCredentials: true,
    }
  );
  return response.data;
};
