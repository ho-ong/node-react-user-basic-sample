import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinUser } from "../../../_actions/user_action";
import { Form, Input } from "antd";

// Formik, Yup : form 컨트롤을 간편하게 할 수 있게 해주는 라이브러리
import { Formik } from "formik";
import * as Yup from "yup";

function JoinPage() {
  // navigate : 페이지 이동
  let navigate = useNavigate();

  // redux dispatch
  const dispatch = useDispatch();

  // join
  return (
    <Formik
      // form에서 관리할 값들
      initialValues={{
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      }}
      // validation 확인 로직
      validationSchema={Yup.object().shape({
        name: Yup.string().required("이름을 입력해주세요."),
        email: Yup.string()
          .email("이메일이 유효하지 않습니다.")
          .required("이메일을 입력해주세요."),
        password: Yup.string()
          .min(6, "비밀번호는 6자 이상이어야 합니다.")
          .required("비밀번호를 입력해주세요."),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
          .required("비밀번호를 확인해주세요."),
      })}
      // submit 이벤트 발생 시 실행 로직
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          // dispatch
          dispatch(joinUser(dataToSubmit)).then((res) => {
            // 회원가입 성공
            if (res.payload.success) {
              navigate("/login"); // "/login" 페이지로 이동
            } else {
              alert("회원가입을 실패했습니다. 다시 시도해주세요."); // error
            }
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
          <div className="container--center">
            <form className="form--small" onSubmit={handleSubmit}>
              <h2>Join</h2>

              {/* Name */}
              <Form.Item required label="Name">
                <Input
                  id="name"
                  placeholder="Name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.name && touched.name && (
                  <div className="input--error">{errors.name}</div>
                )}
              </Form.Item>

              {/* Email */}
              <Form.Item
                required
                label="Email"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <Input
                  id="email"
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
                  <div className="input--error">{errors.email}</div>
                )}
              </Form.Item>

              {/* Password */}
              <Form.Item
                required
                label="Password"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <Input
                  id="password"
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
                  <div className="input--error">{errors.password}</div>
                )}
              </Form.Item>

              {/* Confirm Password */}
              <Form.Item required label="Confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input--error">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                onSubmit={handleSubmit}
              >
                Join
              </button>

              {/* Login */}
              <span className="form__link">
                Already have an account? <a href="/login">Login</a>
              </span>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default JoinPage;
