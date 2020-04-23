
import { combineReducers } from "redux";
import authReducer from "./reducers/AuthReducer";
import notificationReducer from "./reducers/NotifierReducer";
import AuthState from "./states/AuthState";
import NotifierState from "./states/NotifState";

export interface RootState {
  auth: AuthState
  notifier: NotifierState
}

export default combineReducers({
  auth: authReducer,
  notifier: notificationReducer,
});