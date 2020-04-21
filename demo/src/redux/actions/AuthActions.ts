import { RootState } from '../Root';

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