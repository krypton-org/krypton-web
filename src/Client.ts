import {
    Query,
    RefreshQuery,
    LoginQuery,
    UpdateQuery,
    DeleteQuery,
    RegisterQuery,
    EmailAvailableQuery,
    SendVerificationEmailQuery,
    SendPasswordRecoveryQuery,
    UserOneQuery,
    UserByIdsQuery,
    UserManyQuery,
    UserCountQuery,
    UserPaginationQuery,
    PublicKeyQuery,
    LogoutQuery,
} from './Queries';

import * as KryptonErrors from './ErrorTypes';

export interface Config {
    endpoint: string;
    minTimeToLive?: number;
}

interface ClientState {
    expiryDate: Date;
    token: string;
    user: any;
}

const DEFAULT_MIN_TIME_TO_LIVE = 30 * 1000; // 30 seconds

export default class Client {
    private endpoint: string;
    private state: ClientState;
    private minTimeToLive: number;

    constructor(config: Config) {
        this.endpoint = config.endpoint;
        this.minTimeToLive = config.minTimeToLive ? config.minTimeToLive : DEFAULT_MIN_TIME_TO_LIVE;
        this.state = {
            user: {},
            expiryDate: new Date(0),
            token: '',
        };
    }

    public getUser = (): any => this.state.user;

    public getToken = async (): Promise<string> => {
        const now = new Date();
        if (
            this.state.token &&
            this.state.expiryDate &&
            this.state.expiryDate.getTime() < now.getTime() + this.minTimeToLive
        ) {
            await this.refreshToken();
        }
        return this.state.token;
    };

    public getTokenExpiryDate = (): Date => this.state.expiryDate;

    public getAuthorizationHeader = async (): Promise<string> => {
        return 'Bearer ' + (await this.getToken());
    };

    public refreshToken = async (): Promise<void> => {
        await this.query(new RefreshQuery(), false);
    };

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
    };

    public register = async (email: string, password: string, fields?: any): Promise<void> => {
        await this.query(new RegisterQuery({ fields: { email, password, ...fields } }), false);
    };

    public login = async (email: string, password: string): Promise<any> => {
        await this.query(new LoginQuery({ email, password }), false);
        return this.state.user;
    };

    public logout = async (): Promise<void> => {
        await this.query(new LogoutQuery(), true);
        this.setState({
            user: {},
            expiryDate: new Date(0),
            token: '',
        });
    };

    public update = async (fields: any): Promise<any> => {
        await this.query(new UpdateQuery({ fields }), true);
        return this.state.user;
    };

    public delete = async (password: string): Promise<void> => {
        await this.query(new DeleteQuery({ password }), true);
        this.setState({
            user: {},
            expiryDate: new Date(0),
            token: '',
        });
    };

    public recoverPassword = async (email: string): Promise<void> => {
        await this.query(new SendPasswordRecoveryQuery({ email }), true);
    };

    public isEmailAvailable = async (email: string): Promise<boolean> => {
        let data: { emailAvailable: boolean } = await this.query(new EmailAvailableQuery({ email }), false);
        return data.emailAvailable;
    };

    public changePassword = async (actualPassword: string, newPassword: string): Promise<void> => {
        await this.query(
            new UpdateQuery({
                fields: {
                    password: newPassword,
                    previousPassword: actualPassword,
                },
            }),
            true,
        );
    };

    public sendVerificationEmail = async (): Promise<void> => {
        let data: { sendVerificationEmail: boolean } = await this.query(new SendVerificationEmailQuery(), true);
    };

    public fetchUserOne = async (filter: any, requestedFields: string[]): Promise<any> => {
        let data: { userOne: any } = await this.query(new UserOneQuery({ filter }, requestedFields), true);
        return data.userOne;
    };

    public fetchUserByIds = async (ids: string[], requestedFields: string[]): Promise<Array<any>> => {
        let data: { userByIds: any } = await this.query(new UserByIdsQuery({ ids }, requestedFields), true);
        return data.userByIds;
    };

    public fetchUserMany = async (filter: any, requestedFields: string[], limit?: number): Promise<Array<any>> => {
        let data: { userMany: any } = await this.query(new UserManyQuery({ filter, limit }, requestedFields), true);
        return data.userMany;
    };

    public fetchUserCount = async (filter?: any): Promise<number> => {
        const variables: any = {};
        if (filter) {
            variables.filter = filter;
        }
        let data: { userCount: number } = await this.query(new UserCountQuery(variables), true);
        return data.userCount;
    };

    public fetchUserWithPagination = async (
        filter: any,
        requestedFields: string[],
        page: number,
        perPage: number,
    ): Promise<any> => {
        let data: { userPagination: any } = await this.query(
            new UserPaginationQuery({ filter, page, perPage }, requestedFields),
            true,
        );
        return data.userPagination;
    };

    public fetchPublicKey = async (): Promise<string> => {
        let data: { publicKey: string } = await this.query(new PublicKeyQuery(), true);
        return data.publicKey;
    };

    private query = async (q: Query, isAuthTokenRequired: boolean): Promise<any> => {
        const headers: any = {
            'Content-Type': 'application/json',
        };

        if (isAuthTokenRequired) {
            headers['Authorization'] = await this.getAuthorizationHeader();
        }

        const res = await fetch(this.endpoint, {
            method: 'POST',
            headers,
            credentials: 'include',
            body: q.toJsonString(),
        }).then((res) => res.json());

        if (res.errors) {
            const errorType = res.errors[0].type;
            const message = res.errors[0].message;
            if (!(<any>KryptonErrors)[errorType]) {
                throw new Error(message);
            } else {
                throw new (<any>KryptonErrors)[errorType](message);
            }
        }

        this.updateAuthData(res.data);
        return res.data;
    };

    private updateAuthData = (data: any): void => {
        if (data.login) {
            this.setState({
                token: data.login.token,
                expiryDate: new Date(data.login.expiryDate),
                user: this.decodeToken(data.login.token),
            });
        } else if (data.refreshToken) {
            this.setState({
                token: data.refreshToken.token,
                expiryDate: new Date(data.refreshToken.expiryDate),
                user: this.decodeToken(data.refreshToken.token),
            });
        } else if (data.updateMe) {
            this.setState({
                token: data.updateMe.token,
                expiryDate: new Date(data.updateMe.expiryDate),
                user: this.decodeToken(data.updateMe.token),
            });
        }
    };

    private decodeToken = (token: string): any => JSON.parse(window.atob(token.split('.')[1]));

    private setState = (state: ClientState): void => {
        this.state = state;
    };
}
