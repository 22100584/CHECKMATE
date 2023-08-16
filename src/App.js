import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./routes/Homepage";
import MyPage from "./routes/Mypage";
import PostPage from "./routes/Postpage";
import Loginpage from "./routes/Loginpage";

function App() {
  return (
    <Router>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/postpage" element={<PostPage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
