import { RootState } from '../Root';
import { Severity } from '../states/NotifState';
import { notify } from './NotifyActions';
import { AuthTransactionType } from '../states/AuthState';

export const checkLoginState = () => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(AuthTransactionType.CHECK_LOGIN_STATE));
            const isLoggedIn = await getState().auth.krypton.isLoggedIn();
            dispatch(transactionSuccess());
            if (isLoggedIn) {
                dispatch(addLoggedUSer(getState().auth.krypton.getUser()));
            }
        })();
    };
};

export const login = (email: string, password: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(AuthTransactionType.LOGIN));
            try {
                await getState().auth.krypton.login(email, password);
                dispatch(transactionSuccess());
                dispatch(addLoggedUSer(getState().auth.krypton.getUser()));
                dispatch(
                    notify({
                        message: 'Log-in successful!',
                        date: new Date(),
                        type: Severity.SUCCESS,
                        title: Severity.SUCCESS.charAt(0).toUpperCase() + Severity.SUCCESS.slice(1),
                    }),
                );
            } catch (err) {
                dispatch(transactionFailure(err.message));
            }
        })();
    };
};

export const logout = () => {
    return (dispatch: any) => {
        dispatch(removeLoggedUSer());
    };
};

export const register = (email: string, password: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(AuthTransactionType.REGISTER));
            try {
                await getState().auth.krypton.register(email, password);
                dispatch(transactionSuccess());
                dispatch(
                    notify({
                        message: 'Register successful!',
                        date: new Date(),
                        type: Severity.SUCCESS,
                        title: Severity.SUCCESS.charAt(0).toUpperCase() + Severity.SUCCESS.slice(1),
                    }),
                );
            } catch (err) {
                dispatch(transactionFailure(err.message));
            }
        })();
    };
};

export const recoverPassword = (email: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(AuthTransactionType.RECOVER_PASSWORD));
            try {
                await getState().auth.krypton.recoverPassword(email);
                dispatch(transactionSuccess());
                dispatch(
                    notify({
                        message: 'If your email exists you will receive an email shortly to recover your password.',
                        date: new Date(),
                        type: Severity.INFO,
                        title: Severity.INFO.charAt(0).toUpperCase() + Severity.INFO.slice(1),
                    }),
                );
            } catch (err) {
                dispatch(transactionFailure(err.message));
            }
        })();
    };
};

export const changePassword = (actualPassword: string, newPassword: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(AuthTransactionType.CHANGE_PASSWORD));
            try {
                await getState().auth.krypton.changePassword(actualPassword, newPassword);
                dispatch(transactionSuccess());
                dispatch(
                    notify({
                        message: 'Your password has been changed.',
                        date: new Date(),
                        type: Severity.SUCCESS,
                        title: Severity.SUCCESS.charAt(0).toUpperCase() + Severity.SUCCESS.slice(1),
                    }),
                );
            } catch (err) {
                dispatch(transactionFailure());
                dispatch(
                    notify({
                        message: err.message,
                        date: new Date(),
                        type: Severity.DANGER,
                        title: 'Error',
                    }),
                );
            }
        })();
    };
};

export const deleteAccount = (password: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(AuthTransactionType.DELETE_ACCOUNT));
            try {
                await getState().auth.krypton.delete(password);
                dispatch(transactionSuccess());
                dispatch(
                    notify({
                        message: 'Your account has been deleted successfully.',
                        date: new Date(),
                        type: Severity.SUCCESS,
                        title: Severity.SUCCESS.charAt(0).toUpperCase() + Severity.INFO.slice(1),
                    }),
                );
                dispatch(removeLoggedUSer());
            } catch (err) {
                dispatch(transactionFailure(err.message));
            }
        })();
    };
};

export const updateEmail = (email: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(AuthTransactionType.UPDATE_EMAIL));
            try {
                await getState().auth.krypton.update({ email });
                dispatch(transactionSuccess());
                dispatch(addLoggedUSer(getState().auth.krypton.getUser()));
                dispatch(
                    notify({
                        message: 'Email successfully updated.',
                        date: new Date(),
                        type: Severity.SUCCESS,
                        title: Severity.SUCCESS.charAt(0).toUpperCase() + Severity.SUCCESS.slice(1),
                    }),
                );
            } catch (err) {
                dispatch(transactionFailure());
                dispatch(
                    notify({
                        message: err.message,
                        date: new Date(),
                        type: Severity.DANGER,
                        title: 'Error',
                    }),
                );
            }
        })();
    };
};

export const logOut = () => {
    return (dispatch: any, getState: () => RootState) => {
        dispatch(removeLoggedUSer());
    };
};

export const AUTH_TRANSACTION_BEGIN = 'AUTH_TRANSACTION_BEGIN';
export const transactionBegin = (transactionType: AuthTransactionType) => ({
    type: AUTH_TRANSACTION_BEGIN,
    payload: { transactionType },
});

export const AUTH_TRANSACTION_SUCCESS = 'AUTH_TRANSACTION_SUCCESS';
export const transactionSuccess = () => ({
    type: AUTH_TRANSACTION_SUCCESS,
});

export const AUTH_TRANSACTION_FAILURE = 'AUTH_TRANSACTION_FAILURE';
export const transactionFailure = (error?: string) => ({
    type: AUTH_TRANSACTION_FAILURE,
    payload: { error },
});

export const ADD_LOGGED_USER = 'ADD_LOGGED_USER';
export const addLoggedUSer = (user: any) => ({
    type: ADD_LOGGED_USER,
    payload: { user },
});

export const REMOVE_LOGGED_USER = 'REMOVE_LOGGED_USER';
export const removeLoggedUSer = () => ({
    type: REMOVE_LOGGED_USER,
});

export const REMOVE_MODALS_ERROR_MESSAGES = 'REMOVE_MODALS_ERROR_MESSAGES';
export const removeModalsErrorMessages = () => ({
    type: REMOVE_MODALS_ERROR_MESSAGES,
});
