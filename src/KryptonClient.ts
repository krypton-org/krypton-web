import {
    Query,
    RefreshQuery,
    LoginQuery,
    UpdateQuery,
    DeleteQuery,
    RegisterQuery
} from './Queries'

export default class KryptonClient {
    private endpoint: string;
    private token: string;
    private user: Object;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.token = '';
        this.user = {};
    }

    public getUser = (): Object => this.user;

    public getToken = (): string => this.token;

    public getAuthorizationHeader = (): string => 'Bearer ' + this.token;

    public refresh = async (): Promise<void> => {
        await this.query(new RefreshQuery(), false, true);
    }

    public register = async (fields: Object): Promise<boolean> => {
        let data: { register: boolean } = await this.query(new RegisterQuery({ fields }), false);
        return data.register;
    }

    public login = async (email: string, password: string): Promise<Object> => {
        await this.query(new LoginQuery({ email, password }), false);
        return this.user;
    }

    public update = async (fields: Object): Promise<Object> => {
        await this.query(new UpdateQuery({ fields }), true);
        return this.user;
    }

    public delete = async (password: string): Promise<boolean> => {
        let data: { deleteMe: boolean } = await this.query(new DeleteQuery({ password }), true);
        return data.deleteMe;
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
                await this.refresh();
                return await this.query(q, isAuthTokenRequired, true)
            } else {
                throw new (<any>window)[errorType](message);
            }
        }

        const data = res.data;

        if (data.login) {
            this.setUserAndToken(data.login.token);
        } else if (data.refreshToken) {
            this.setUserAndToken(data.refreshToken.token);
        } else if (data.updateMe) {
            this.setUserAndToken(data.updateMe.token);
        }

        return data;
    }

    private setUserAndToken = (token: string): void => {
        this.token = token;
        this.user = JSON.parse(window.atob(token.split('.')[1]));
    }
}