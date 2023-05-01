import axios from "axios";
import { AUTH_USER, JOIN_USER, LOGIN_USER, LOGOUT_USER } from "./types";
import { USER_SERVER } from "../components/Config.js";

// 로그인
export function loginUser(dataToSubmit) {
  const req = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((res) => res.data);

  // login user 정보를 user reducer로 보내기
  return {
    type: LOGIN_USER,
    payload: req,
  };
}

// 로그아웃
export function logoutUser() {
  const req = axios.get(`${USER_SERVER}/logout`).then((res) => res.data);

  // logout user 정보를 user reducer로 보내기
  return {
    type: LOGOUT_USER,
    payload: req,
  };
}

// 회원가입
export function joinUser(dataToSubmit) {
  const req = axios
    .post(`${USER_SERVER}/join`, dataToSubmit)
    .then((res) => res.data);

  // join user 정보를 user reducer로 보내기
  return {
    type: JOIN_USER,
    payload: req,
  };
}

// HOC(Auth)
export function auth() {
  const req = axios.get(`${USER_SERVER}/auth`).then((res) => res.data);

  // auth user 정보를 user reducer로 보내기
  return {
    type: AUTH_USER,
    payload: req,
  };
}
