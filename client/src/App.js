import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Page
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import JoinPage from "./components/views/JoinPage/JoinPage";

// Component
import Nav from "./components/views/Nav/Nav";
import Footer from "./components/views/Footer/Footer";

// HOC(Auth)
import Auth from "./_hoc/auth";

function App() {
  // HOC(Auth)
  // element={} 내부에 함수가 들어갈 수 없으므로 미리 함수를 적용
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthJoinPage = Auth(JoinPage, false);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<AuthLandingPage />} />
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/join" element={<AuthJoinPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
