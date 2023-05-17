/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_SERVER } from "../../Config";

function NavMenu() {
  // navigate : 페이지 이동
  let navigate = useNavigate();

  // state
  const user = useSelector((state) => state.user);

  // logout
  const handleLogout = () => {
    axios.get(`${USER_SERVER}/logout`).then((res) => {
      // 로그아웃 성공
      if (res.data.success) {
        navigate("/login"); // "/login" 페이지로 이동
      } else {
        alert("로그아웃을 실패했습니다. 다시 시도해주세요."); // error
      }
    });
  };

  // nav menu
  if (user.userData && !user.userData.isAuth) {
    // user가 로그인을 하지 않았을 경우
    return (
      <ul className="menu-list">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/join">Join</a>
        </li>
      </ul>
    );
  } else {
    // user가 로그인을 했을 경우
    return (
      <ul className="menu-list">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    );
  }
}

export default NavMenu;
