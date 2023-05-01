import { combineReducers } from "redux";
import user from "./user_reducer";

// combineReducers -> rootReducer
// 하나로 합치기
const rootReducer = combineReducers({
  user, // user reducer
});

export default rootReducer;
