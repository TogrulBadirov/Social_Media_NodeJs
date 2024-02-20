import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import "bootstrap//dist/css/bootstrap.min.css"
import EmailVerification from "./pages/EmailVerification";
import PrivateRoute from "./routes/PrivateRoute";
import UserProfile from "./pages/UserProfile";
import UserChat from "./pages/UserChat";
import UserChatV2 from "./pages/UserChatV2";
import NewPost from "./pages/NewPost";
function App() {

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/verify/:token"  element={<EmailVerification />} />
          <Route  element={<PrivateRoute/>}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/chat" element={<UserChat />} />
              <Route path="/chatV2" element={<UserChatV2 />} />
              <Route path="/newPost" element={<NewPost />} />
            </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
