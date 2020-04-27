import { combineReducers } from 'redux';
import authReducer from './reducers/AuthReducer';
import notificationReducer from './reducers/NotifierReducer';
import todoReducer from './reducers/TodoReducer';
import AuthState from './states/AuthState';
import NotifierState from './states/NotifState';
import TodoState from './states/TodoState';

export interface RootState {
    auth: AuthState;
    notifier: NotifierState;
    todo: TodoState;
}

export default combineReducers({
    auth: authReducer,
    notifier: notificationReducer,
    todo: todoReducer,
});
