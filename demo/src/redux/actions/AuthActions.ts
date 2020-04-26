import { RootState } from '../Root';
import { Severity } from '../states/NotifState';
import { notify } from './NotifyActions';

export const checkLoginState = () => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(checkLoginStateBegin());
            const isLoggedIn = await getState().auth.krypton.isLoggedIn();
            dispatch(checkLoginStateEnd(isLoggedIn, getState().auth.krypton.getUser()));
        })();
    }
};

export const login = (email: string, password: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(loginBegin());
            try {
                await getState().auth.krypton.login(email, password);
                dispatch(loginEnd(true, getState().auth.krypton.getUser()));
                dispatch(notify({
                    message: 'Log-in successful!',
                    date: new Date(),
                    type: Severity.SUCCESS,
                    title: Severity.SUCCESS.charAt(0).toUpperCase() + Severity.SUCCESS.slice(1)
                }));
            } catch (err) {
                dispatch(loginFailure(err.message));
            }
        })();
    }
};

export const logout = () => {
};

export const register = (email: string, password: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(registerBegin());
            try {
                await getState().auth.krypton.register(email, password);
                dispatch(registerEnd());
                dispatch(notify({
                    message: 'Register successful!',
                    date: new Date(),
                    type: Severity.SUCCESS,
                    title: Severity.SUCCESS.charAt(0).toUpperCase() + Severity.SUCCESS.slice(1)
                }));
            } catch (err) {
                dispatch(registerFailure(err.message));
            }
        })();
    }
}

export const recoverPassword = (email: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(recoverPasswordBegin());
            try {
                await getState().auth.krypton.recoverPassword(email);
                dispatch(recoverPasswordEnd());
                dispatch(notify({
                    message: 'If your email exists you will receive an email shortly to recover your password.',
                    date: new Date(),
                    type: Severity.INFO,
                    title: Severity.INFO.charAt(0).toUpperCase() + Severity.INFO.slice(1)
                }));
            } catch (err) {
                dispatch(recoverPasswordFailure(err.message));
            }
        })();
    }
}

export const changePassword = (actualPassword: string, newPassword: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(changePasswordBegin());
            try {
                await getState().auth.krypton.changePassword(actualPassword, newPassword);
                dispatch(changePasswordEnd());
                dispatch(notify({
                    message: 'Your password has been changed.',
                    date: new Date(),
                    type: Severity.SUCCESS,
                    title: Severity.SUCCESS.charAt(0).toUpperCase() + Severity.SUCCESS.slice(1)
                }));
            } catch (err) {
                dispatch(changePasswordFailure());
                dispatch(notify({
                    message: err.message,
                    date: new Date(),
                    type: Severity.DANGER,
                    title: 'Error'
                }));
            }
        })();
    }
}

export const deleteAccount = (password: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(deleteAccountBegin());
            try {
                await getState().auth.krypton.delete(password);
                dispatch(deleteAccountEnd());
                dispatch(notify({
                    message: 'Your account has been deleted successfully.',
                    date: new Date(),
                    type: Severity.SUCCESS,
                    title: Severity.SUCCESS.charAt(0).toUpperCase() + Severity.INFO.slice(1)
                }));
                dispatch(logOut());
            } catch (err) {
                dispatch(deleteAccountFailure(err.message));
            }
        })();
    }
}

export const updateEmail = (email: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(updateEmailBegin());
            try {
                await getState().auth.krypton.update({ email });
                dispatch(updateEmailEnd(getState().auth.krypton.getUser()));
                dispatch(notify({
                    message: 'Email successfully updated.',
                    date: new Date(),
                    type: Severity.SUCCESS,
                    title: Severity.SUCCESS.charAt(0).toUpperCase() + Severity.SUCCESS.slice(1)
                }));
            } catch (err) {
                dispatch(updateEmailFailure());
                dispatch(notify({
                    message: err.message,
                    date: new Date(),
                    type: Severity.DANGER,
                    title: 'Error'
                }));
            }
        })();
    }
}

export const changePasswordBegin = () => ({
    type: 'CHANGE_PASSWORD_BEGIN'
});

export const changePasswordEnd = () => ({
    type: 'CHANGE_PASSWORD_END'
});

export const changePasswordFailure = () => ({
    type: 'CHANGE_PASSWORD_FAILURE'
});

export const deleteAccountBegin = () => ({
    type: 'DELETE_ACCOUNT_BEGIN'
});

export const deleteAccountEnd = () => ({
    type: 'DELETE_ACCOUNT_END'
});

export const deleteAccountFailure = (error: string) => ({
    type: 'DELETE_ACCOUNT_FAILURE',
    payload: { error }
});

export const updateEmailBegin = () => ({
    type: 'UPDATE_EMAIL_BEGIN'
});

export const updateEmailEnd = (user: any) => ({
    type: 'UPDATE_EMAIL_END',
    payload: { user }
});

export const updateEmailFailure = () => ({
    type: 'UPDATE_EMAIL_FAILURE'
});

export const loginBegin = () => ({
    type: 'LOGIN_BEGIN'
});

export const loginEnd = (isLoggedIn: boolean, user: any) => ({
    type: 'LOGIN_END',
    payload: { isLoggedIn, user }
});

export const loginFailure = (error: string) => ({
    type: 'LOGIN_FAILURE',
    payload: { error }
});

export const registerBegin = () => ({
    type: 'REGISTER_BEGIN'
});

export const registerEnd = () => ({
    type: 'REGISTER_END',
});

export const registerFailure = (error: string) => ({
    type: 'REGISTER_FAILURE',
    payload: { error }
});

export const recoverPasswordBegin = () => ({
    type: 'RECOVER_PASSWORD_BEGIN'
});

export const recoverPasswordEnd = () => ({
    type: 'RECOVER_PASSWORD_END',
});

export const recoverPasswordFailure = (error: string) => ({
    type: 'RECOVER_PASSWORD_FAILURE',
    payload: { error }
});

export const checkLoginStateBegin = () => ({
    type: 'CHECK_LOGIN_STATE_BEGIN'
});

export const checkLoginStateEnd = (isLoggedIn: boolean, user: any) => ({
    type: 'CHECK_LOGIN_STATE_END',
    payload: { isLoggedIn, user }
});

export const logOut = () => ({
    type: 'LOG_OUT'
});

export const removeModalsErrorMessages = () => ({
    type: 'REMOVE_MODALS_ERROR_MESSAGES',
});