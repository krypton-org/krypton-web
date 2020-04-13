import {
    Query,
    RefreshQuery,
    LoginQuery,
    UpdateQuery,
    DeleteQuery,
    RegisterQuery,
    EmailAvailableQuery,
    SendVerificationEmailQuery,
    UserOneQuery,
    UserByIdsQuery,
    UserManyQuery,
    UserCountQuery,
    UserPaginationQuery,
    PublicKeyQuery
} from './Queries'

import * as KryptonErrors from './ErrorTypes'

interface KryptonClientState {
    expiryDate?: Date;
    token?: string;
    user?: any;
}

export default class KryptonClient {
    private endpoint: string;
    private state: KryptonClientState;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.state = {};
    }

    public getUser = (): any => this.state.user;

    public getToken = (): string | undefined => this.state.token;

    public getAuthorizationHeader = (): string => 'Bearer ' + this.state.token;

    public refreshToken = async (): Promise<void> => {
        await this.query(new RefreshQuery(), false, true);
    }

    public isLoggedIn = async (): Promise<boolean> => {
        const now = new Date();
        if (this.state.token && this.state.expiryDate && this.state.expiryDate > now) {
            return true;
        } else {
            try {
                await this.refreshToken();
            } catch (err) {
                return false;
            }
            return true;
        }
    }

    public register = async (email: string, password: string, fields?: any): Promise<boolean> => {
        let data: { register: boolean } = await this.query(new RegisterQuery({ fields: { email, password, ...fields } }), false);
        return data.register;
    }

    public login = async (email: string, password: string): Promise<any> => {
        await this.query(new LoginQuery({ email, password }), false);
        return this.state.user;
    }

    public logout = async (): Promise<void> => {
        //await removing session in the back-end
    }

    public update = async (fields: any): Promise<any> => {
        await this.query(new UpdateQuery({ fields }), true);
        return this.state.user;
    }

    public delete = async (password: string): Promise<boolean> => {
        let data: { deleteMe: boolean } = await this.query(new DeleteQuery({ password }), true);
        return data.deleteMe;
    }

    public recoverPassword = async (email: string): Promise<boolean> => {
        let data: { register: boolean } = await this.query(new UpdateQuery({ email }), true);
        return data.register;
    }

    public emailAvailable = async (email: string): Promise<boolean> => {
        let data: { emailAvailable: boolean } = await this.query(new EmailAvailableQuery({ email }), false);
        return data.emailAvailable;
    }

    public changePassword = async (password: string, previousPassword: string): Promise<boolean> => {
        let data: { register: boolean } = await this.query(new UpdateQuery({ password, previousPassword }), true);
        return data.register;
    }

    public sendVerificationEmail = async () => {
        let data: { sendVerificationEmail: boolean } = await this.query(new SendVerificationEmailQuery(), true, false);
        return data.sendVerificationEmail;
    }

    public fetchUserOne = async (filter: any, requestedFields: [string]) => {
        let data: { userOne: any } = await this.query(new UserOneQuery({ filter }, requestedFields), true, false);
        return data.userOne;
    }

    public fetchUserByIds = async (ids: [string], requestedFields: [string]) => {
        let data: { userByIds: any } = await this.query(new UserByIdsQuery({ ids }, requestedFields), true, false);
        return data.userByIds;
    }

    public fetchUserMany = async (filter: any, requestedFields: [string], limit?: number) => {
        let data: { userMany: any } = await this.query(new UserManyQuery({ filter, limit }, requestedFields), true, false);
        return data.userMany;
    }

    public fetchUserCount = async (filter?: any): Promise<number> => {
        const variables: any = {}
        if (filter) {
            variables.filter = filter;
        }
        let data: { userCount: number } = await this.query(new UserCountQuery(variables), true, false);
        return data.userCount;
    }

    public fetchUserWithPagination = async (filter: any, requestedFields: [string], page: number, perPage: number) => {
        let data: { userOne: any } = await this.query(new UserPaginationQuery({ filter, page, perPage }, requestedFields), true, false);
        return data.userOne;
    }

    public publicKey = async (): Promise<string> => {
        let data: { publicKey: string } = await this.query(new PublicKeyQuery(), true, false);
        return data.publicKey;
    }

    private query = async (q: Query, isAuthTokenRequired: boolean, isRefreshed = false): Promise<any> => {
        const headers: any = {
            'Content-Type': 'application/json',
        };

        if (isAuthTokenRequired) {
            headers['Authorization'] = this.getAuthorizationHeader();
        }

        const res = await fetch(this.endpoint, {
            method: 'POST',
            headers,
            body: q.toJsonString()
        }).then(res => res.json());

        if (res.errors) {
            const errorType = res.errors[0].type;
            const message = res.errors[0].message;
            if (errorType === 'UnauthorizedError' && !isRefreshed) {
                await this.refreshToken();
                return await this.query(q, isAuthTokenRequired, true)
            } else {
                throw new (<any>KryptonErrors)[errorType](message);
            }
        }

        const data = res.data;
        console.log(data);
        if (data.login) {
            this.setState({
                token: data.login.token,
                expiryDate: new Date(data.login.expiryDate),
                user: this.decodeToken(data.login.token)
            });
        } else if (data.refreshToken) {
            this.setState({
                token: data.refreshToken.token,
                expiryDate: new Date(data.refreshToken.expiryDate),
                user: this.decodeToken(data.refreshToken.token)
            });
        } else if (data.updateMe) {
            this.setState({
                token: data.updateMe.token,
                expiryDate: new Date(data.updateMe.expiryDate),
                user: this.decodeToken(data.updateMe.token)
            });
        }

        return data;
    }

    private decodeToken = (token: string): any => JSON.parse(window.atob(token.split('.')[1]));

    private setState = (state: KryptonClientState): void => {
        this.state = state;
    }
}
