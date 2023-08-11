import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./routes/Homepage";
import MyPage from "./routes/Mypage";

function App() {
  return (
    <Router>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
