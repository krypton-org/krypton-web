import Krypton from '@krypton-org/krypton-web';

export default interface AuthState {
    krypton: Krypton;
    user: any;
    isLoggedIn: boolean;
    isLoginLoading: boolean;
    loginError: string | null;
    isLoginSuccess: boolean;
    isRegisterLoading: boolean;
    registerError: string | null;
    isRegisterSuccess: boolean;
    isCheckLoginStateLoading: boolean;
    isRecoverPasswordLoading: boolean;
    recoverPasswordError: string | null;
    isRecoverPasswordSuccess: boolean;
}
