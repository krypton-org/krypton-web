import Krypton from '@krypton-org/krypton-web';
import AuthState, { AuthTransactionType } from '../states/AuthState';

const initialState: AuthState = {
  user: null,
  krypton: new Krypton("https://nusid.net/krypton-auth"),
  isLoggedIn: false,
  isTransactionLoading: false,
  isTransactionSuccess: false,
  localErrorMessage: null,
  transactionType: null,
};

export default function userReducer(
  state = initialState,
  action: any
): AuthState {
  switch (action.type) {
    case 'LOGIN_BEGIN':
      return {
        ...state,
        isTransactionLoading: true,
        isTransactionSuccess: false,
        transactionType: AuthTransactionType.LOGIN
      }

    case 'LOGIN_END':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        isTransactionLoading: false,
        isTransactionSuccess: true,
        localErrorMessage: null,
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isTransactionLoading: false,
        localErrorMessage: action.payload.error,
      }

    case 'REGISTER_BEGIN':
      return {
        ...state,
        isTransactionLoading: true,
        isTransactionSuccess: false,
        transactionType: AuthTransactionType.REGISTER
      }

    case 'REGISTER_END':
      return {
        ...state,
        isTransactionLoading: false,
        isTransactionSuccess: true,
        localErrorMessage: null,
      }
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isTransactionLoading: false,
        localErrorMessage: action.payload.error,
      }
    case 'RECOVER_PASSWORD_BEGIN':
      return {
        ...state,
        isTransactionLoading: true,
        isTransactionSuccess: false,
        transactionType: AuthTransactionType.RECOVER_PASSWORD
      }

    case 'RECOVER_PASSWORD_END':
      return {
        ...state,
        isTransactionLoading: false,
        isTransactionSuccess: true,
      }
    case 'RECOVER_PASSWORD_FAILURE':
      return {
        ...state,
        isTransactionLoading: false,
        localErrorMessage: action.payload.error,
      }
    case 'CHECK_LOGIN_STATE_BEGIN':
      return {
        ...state,
        isTransactionLoading: true,
        transactionType: AuthTransactionType.CHECK_LOGIN_STATE
      }
    case 'CHECK_LOGIN_STATE_END':
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
        isTransactionLoading: false,
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
        localErrorMessage: null,
      }
    }
    case 'CHANGE_PASSWORD_BEGIN':
      return {
        ...state,
        isTransactionLoading: true,
        isTransactionSuccess: false,
        transactionType: AuthTransactionType.CHANGE_PASSWORD
      };

    case 'CHANGE_PASSWORD_END':
      return {
        ...state,
        isTransactionLoading: false,
        isTransactionSuccess: true,
      };


    case 'CHANGE_PASSWORD_FAILURE':
      return {
        ...state,
        isTransactionLoading: false,
        isTransactionSuccess: false,
      };


    case 'DELETE_ACCOUNT_BEGIN':
      return {
        ...state,
        isTransactionLoading: true,
        isTransactionSuccess: false,
        transactionType: AuthTransactionType.DELETE_ACCOUNT
      };


    case 'DELETE_ACCOUNT_END':
      return {
        ...state,
        isTransactionLoading: false,
        isTransactionSuccess: true,
        localErrorMessage: null,
      };


    case 'DELETE_ACCOUNT_FAILURE':
      return {
        ...state,
        isTransactionLoading: false,
        localErrorMessage: action.payload.error,
      };


    case 'UPDATE_EMAIL_BEGIN':
      return {
        ...state,
        isTransactionLoading: true,
        isTransactionSuccess: false,
        transactionType: AuthTransactionType.UPDATE_EMAIL
      };

    case 'UPDATE_EMAIL_END':
      return {
        ...state,
        isTransactionLoading: false,
        isTransactionSuccess: true,
        user: action.payload.user,
      }


    case 'UPDATE_EMAIL_FAILURE':
      return {
        ...state,
        isTransactionLoading: false,
      };

    default:
      return state;
  }
}