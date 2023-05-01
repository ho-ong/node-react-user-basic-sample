/* eslint-disable import/no-anonymous-default-export */
import {
  AUTH_USER,
  JOIN_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    // ...state -> state = {}
    // 로그인 : user action에서 login user 정보 받기
    case LOGIN_USER:
      return { ...state, login: action.payload };
    // 로그아웃 : user action에서 logout user 정보 받기
    case LOGOUT_USER:
      return { ...state };
    // 회원가입 : user action에서 join user 정보 받기
    case JOIN_USER:
      return { ...state, join: action.payload };
    // HOC(Auth) : user action에서 auth user 정보 받기
    case AUTH_USER:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
