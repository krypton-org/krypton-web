
import { combineReducers } from "redux";
import authReducer from "./reducers/AuthReducer";
import AuthState from "./states/AuthState";

export interface RootState {
  auth: AuthState
}

export default combineReducers({
  auth: authReducer,
});