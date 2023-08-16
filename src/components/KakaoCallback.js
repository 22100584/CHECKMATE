import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function KakaoCallback() {
  const history = useHistory();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    if (!authorizationCode) {
      alert("Failed to retrieve the Kakao authorization code.");
      history.push("/");
      return;
    }

    // 여기서 서버에 authorizationCode를 전송해서 access token을 얻을 수 있습니다.
    console.log("Received Kakao authorization code:", authorizationCode);

    // TODO: Send `authorizationCode` to your backend server to retrieve the access token
  }, [history]);

  return <div>Processing Kakao authentication...</div>;
}

export default KakaoCallback;
