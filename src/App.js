import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./routes/Homepage";
import MyPage from "./routes/Mypage";
import PostPage from "./routes/Postpage";
import AddPostPage from "./routes/AddPostPage";
import EditMyPostpage from "./routes/EditMyPostpage";
import Loginpage from "./routes/Loginpage";

function App() {
  return (
    <Router>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/editmypage" element={<EditMyPostpage />}></Route>
        <Route path="/postpage" element={<PostPage />}></Route>
        <Route path="/addpostpage" element={<AddPostPage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
