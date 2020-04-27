import Krypton from '@krypton-org/krypton-web';

export enum AuthTransactionType {
    CHECK_LOGIN_STATE,
    LOGIN,
    REGISTER,
    UPDATE_EMAIL,
    DELETE_ACCOUNT,
    CHANGE_PASSWORD,
    RECOVER_PASSWORD,
    LOGOUT,
}

export default interface AuthState {
    krypton: Krypton;
    user: any;
    isLoggedIn: boolean;
    isTransactionLoading: boolean;
    isTransactionSuccess: boolean;
    localErrorMessage: string | null;
    transactionType: AuthTransactionType | null;
}
