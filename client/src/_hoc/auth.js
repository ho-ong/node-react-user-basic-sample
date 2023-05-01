/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../_actions/user_action";

// SpecificComponent : LandingPage, LoginPage, ...
// option : null(아무나 접근), true(로그인 사용자만 접근), false(로그인한 사용자 접근 불가능)
// adminRoute : 관리자 접근 권한

export default function (SpecificComponent, option, adminRoute = null) {
  // 인증 확인
  function AuthenticationCheck() {
    // navigate : 페이지 이동
    let navigate = useNavigate();

    // redux dispatch
    const dispatch = useDispatch();

    useEffect(() => {
      // dispatch
      dispatch(auth()).then((res) => {
        if (!res.payload.isAuth) {
          // 로그인하지 않은 상태
          if (option) {
            navigate("/login"); // "/login" 페이지로 이동
          }
        } else {
          // 로그인한 상태
          if (adminRoute && !res.payload.isAdmin) {
            navigate("/"); // "/" 페이지로 이동
          } else {
            if (option === false) {
              navigate("/"); // "/" 페이지로 이동
            }
          }
        }
      });
    }, [dispatch, navigate]);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
