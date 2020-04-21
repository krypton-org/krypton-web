import Krypton from '@krypton-org/krypton-web';

export default interface AuthState {
    krypton: Krypton;
    user: any;
    isLoggedIn: boolean;
    isLoginLoading: boolean;
    loginError: string | null;
    loginSuccess: string | null;
    isRegisterLoading: boolean;
    registerError: string | null;
    registerSuccess: string | null;
    isCheckLoginStateLoading: boolean;
    isRecoverPasswordLoading: boolean;
    recoverPasswordError: string | null;
    recoverPasswordInfo: string | null;
}
