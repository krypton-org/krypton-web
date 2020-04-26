import Krypton from '@krypton-org/krypton-web';
import AuthState from '../states/AuthState';

const initialState: AuthState = {
  user: null,
  krypton: new Krypton("https://nusid.net/krypton-auth"),
  isLoggedIn: false,
  isLoginLoading: false,
  loginError: null,
  isLoginSuccess: false,
  isRegisterLoading: false,
  registerError: null,
  isRegisterSuccess: false,
  isCheckLoginStateLoading: false,
  isRecoverPasswordLoading: false,
  recoverPasswordError: null,
  isRecoverPasswordSuccess: false,
  isChangePasswordLoading: false,
  isChangePasswordSuccess: false,
  isDeleteAccountLoading: false,
  isDeleteAccountSuccess: false,
  deleteAccountError: null,
  isUpdateEmailLoading: false,
  isUpdateEmailSuccess: false,
};

export default function userReducer(
  state = initialState,
  action: any
): AuthState {
  switch (action.type) {
    case 'LOGIN_BEGIN':
      return {
        ...state,
        isLoginLoading: true,
        isLoginSuccess: false
      }

    case 'LOGIN_END':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        isLoginLoading: false,
        isLoginSuccess: true,
        loginError: null
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
        isRegisterLoading: true,
        isRegisterSuccess: false
      }

    case 'REGISTER_END':
      return {
        ...state,
        isRegisterLoading: false,
        isRegisterSuccess: true,
        registerError: null
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
        isRecoverPasswordLoading: true,
        isRecoverPasswordSuccess: false
      }

    case 'RECOVER_PASSWORD_END':
      return {
        ...state,
        isRecoverPasswordLoading: false,
        isRecoverPasswordSuccess: true
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
    case 'LOG_OUT': {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    }
    case 'REMOVE_MODALS_ERROR_MESSAGES': {
      return {
        ...state,
        registerError: null,
        loginError: null,
        deleteAccountError: null
      }
    }
    case 'CHANGE_PASSWORD_BEGIN':
      return {
        ...state,
        isChangePasswordLoading: true,
        isChangePasswordSuccess: false
      };

    case 'CHANGE_PASSWORD_END':
      return {
        ...state,
        isChangePasswordLoading: false,
        isChangePasswordSuccess: true,
      };


    case 'CHANGE_PASSWORD_FAILURE':
      return {
        ...state,
        isChangePasswordLoading: false,
        isChangePasswordSuccess: false,
      };


    case 'DELETE_ACCOUNT_BEGIN':
      return {
        ...state,
        isDeleteAccountLoading: true,
        isDeleteAccountSuccess: false
      };


    case 'DELETE_ACCOUNT_END':
      return {
        ...state,
        isDeleteAccountLoading: false,
        isDeleteAccountSuccess: true,
        deleteAccountError: null
      };


    case 'DELETE_ACCOUNT_FAILURE':
      return {
        ...state,
        isDeleteAccountLoading: false,
        deleteAccountError: action.payload.error
      };


    case 'UPDATE_EMAIL_BEGIN':
      return {
        ...state,
        isUpdateEmailLoading: true,
        isUpdateEmailSuccess: false
      };

    case 'UPDATE_EMAIL_END':
      return {
        ...state,
        isUpdateEmailLoading: false,
        isUpdateEmailSuccess: true,
        user: action.payload.user,
      }


    case 'UPDATE_EMAIL_FAILURE':
      return {
        ...state,
        isUpdateEmailLoading: false,
      };

    default:
      return state;
  }
}