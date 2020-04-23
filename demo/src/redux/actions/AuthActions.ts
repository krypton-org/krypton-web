import { RootState } from '../Root';
import { notify } from './NotifyActions';
import { Severity } from '../states/NotifState';

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
    return (dispatch: any, getState: any) => {
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