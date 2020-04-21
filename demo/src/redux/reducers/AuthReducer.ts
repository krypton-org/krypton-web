import Krypton from '@krypton-org/krypton-web';
import AuthState from '../states/AuthState';

const initialState: AuthState = {
  user: null,
  krypton: new Krypton("https://nusid.net/krypton-auth"),
  isLoggedIn: false,
  isLoginLoading: false,
  loginError: null,
  loginSuccess: null,
  isRegisterLoading: false,
  registerError: null,
  registerSuccess: null,
  isCheckLoginStateLoading: false,
  isRecoverPasswordLoading: false,
  recoverPasswordError: null,
  recoverPasswordInfo: null,
};

export default function userReducer(
  state = initialState,
  action: any
): AuthState {
  switch (action.type) {
    case 'LOGIN_BEGIN':
      return {
        ...state,
        isLoginLoading: true
      }

    case 'LOGIN_END':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        isLoginLoading: false,
        loginSuccess: 'Log-in successful!'
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoginLoading: false,
        loginError: action.payload.error
      }

    case 'REGISTER_BEGIN':
      return {
        ...state,
        isRegisterLoading: true
      }

    case 'REGISTER_END':
      return {
        ...state,
        isRegisterLoading: false,
        registerSuccess: 'Register successful!'
      }
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isRegisterLoading: false,
        registerError: action.payload.error
      }
    case 'RECOVER_PASSWORD_BEGIN':
      return {
        ...state,
        isRecoverPasswordLoading: true
      }

    case 'RECOVER_PASSWORD_END':
      return {
        ...state,
        isRecoverPasswordLoading: false,
        recoverPasswordInfo: 'If your email exists you will receive an email shortly to recover your password.'
      }
    case 'RECOVER_PASSWORD_FAILURE':
      return {
        ...state,
        isRecoverPasswordLoading: false,
        recoverPasswordError: action.payload.error
      }
    case 'CHECK_LOGIN_STATE_BEGIN':
      return {
        ...state,
        isCheckLoginStateLoading: true
      }
    case 'CHECK_LOGIN_STATE_END':
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
        isCheckLoginStateLoading: false,
      }
    default:
      return state;
  }
}