import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset-antd.css";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";

// Reducer
import Reducer from "./_reducers";

// redux-promise, redux-thunk
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  reduxThunk
)(createStore);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // Provider : react-redux 라이브러리에 내장된 store를 쉽게 연동할 수 있도록 도와주는 컴포넌트
  // 컴포넌트의 props로 store 값을 설정
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      // Redux Devtools Extension 사용
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>
);
