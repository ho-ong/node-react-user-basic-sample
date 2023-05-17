import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import { Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

// Formik, Yup : form 컨트롤을 간편하게 할 수 있게 해주는 라이브러리
import { Formik } from "formik";
import * as Yup from "yup";

function LoginPage() {
  // navigate : 페이지 이동
  let navigate = useNavigate();

  // redux dispatch
  const dispatch = useDispatch();

  // error message
  const [formErrorMessage, setFormErrorMessage] = useState("");

  // remember me
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  // login
  return (
    <Formik
      // form에서 관리할 값들
      initialValues={{
        email: initialEmail,
        password: "",
      }}
      // validation 확인 로직
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("이메일이 유효하지 않습니다.")
          .required("이메일을 입력해주세요."),
        password: Yup.string()
          .min(6, "비밀번호는 6자 이상이어야 합니다.")
          .required("비밀번호를 입력해주세요."),
      })}
      // submit 이벤트 발생 시 실행 로직
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          // dispatch
          dispatch(loginUser(dataToSubmit))
            .then((res) => {
              // 로그인 성공
              if (res.payload.loginSuccess) {
                window.localStorage.setItem("userId", res.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem("rememberMe", values.email);
                } else {
                  localStorage.removeItem("rememberMe");
                }
                navigate("/"); // "/" 페이지로 이동
              } else {
                setFormErrorMessage(
                  "이메일 또는 비밀번호를 다시 확인해주세요."
                ); // error
              }
            })
            .catch((err) => {
              // 로그인 실패
              setFormErrorMessage("이메일 또는 비밀번호를 다시 확인해주세요."); // error
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <div className="container-center">
            <form className="form-small" onSubmit={handleSubmit}>
              <h2>Login</h2>

              {/* Email */}
              <Form.Item required>
                <Input
                  id="email"
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-error">{errors.email}</div>
                )}
              </Form.Item>

              {/* Password */}
              <Form.Item required>
                <Input
                  id="password"
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-error">{errors.password}</div>
                )}
              </Form.Item>

              {/* Error Message */}
              {formErrorMessage && (
                <label>
                  <p className="p-error">{formErrorMessage}</p>
                </label>
              )}

              {/* Checkbox */}
              <Form.Item>
                <Checkbox
                  id="rememberMe"
                  onChange={handleRememberMe}
                  checked={rememberMe}
                >
                  Remember me
                </Checkbox>
              </Form.Item>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                onSubmit={handleSubmit}
              >
                Login
              </button>

              {/* Join */}
              <span className="form-link">
                Don't have an account? <a href="/join">Join</a>
              </span>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default LoginPage;
