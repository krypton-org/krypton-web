import Krypton from '@krypton-org/krypton-web';
import AuthState from '../states/AuthState';
import {
    AUTH_TRANSACTION_BEGIN,
    AUTH_TRANSACTION_FAILURE,
    AUTH_TRANSACTION_SUCCESS,
    ADD_LOGGED_USER,
    REMOVE_LOGGED_USER,
    REMOVE_MODALS_ERROR_MESSAGES,
} from '../actions/AuthActions';

const initialState: AuthState = {
    user: null,
    krypton: new Krypton('https://nusid.net/krypton-auth'),
    isLoggedIn: false,
    isTransactionLoading: false,
    isTransactionSuccess: false,
    localErrorMessage: null,
    transactionType: null,
};

export default function userReducer(state = initialState, action: any): AuthState {
    switch (action.type) {
        case AUTH_TRANSACTION_BEGIN:
            return {
                ...state,
                isTransactionLoading: true,
                isTransactionSuccess: false,
                transactionType: action.payload.transactionType,
            };

        case AUTH_TRANSACTION_FAILURE:
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: false,
                localErrorMessage: action.payload.error,
            };
        case AUTH_TRANSACTION_SUCCESS:
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: true,
                localErrorMessage: null,
            };
        case ADD_LOGGED_USER: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
            };
        }
        case REMOVE_LOGGED_USER: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        }
        case REMOVE_MODALS_ERROR_MESSAGES: {
            return {
                ...state,
                localErrorMessage: null,
            };
        }
        default:
            return state;
    }
}
