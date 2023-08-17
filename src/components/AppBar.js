import styled from "styled-components";
import mypage from "../assets/images/mypage.png"
import { Link } from "react-router-dom";
function AppBar() {
  const AppBarComponent = styled.div`
    font-family: 'Comfortaa', cursive;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    padding-top: 18px;
    font-size: 20px;
    font-weight: 600;
    position: relative;
  `;

  const IconWrapper = styled.div`
    position: absolute;
    right: 16px;
    top: calc(50% - 16px/2);
    cursor: pointer;
  `;

  const IconImg = styled.img`
    height: 32px;
    width: 32px;
  `;

 

  return (
    <AppBarComponent>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <p>checkmate</p>
      </Link>
      <IconWrapper>
        <Link to="/mypage">
          <IconImg src={mypage} alt="mypage" />
        </Link>
      </IconWrapper>
    </AppBarComponent>
  );
}

export default AppBar;
