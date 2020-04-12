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

export default class KryptonClient {
    private endpoint: string;
    private expiryDate: Date;
    private token: string;
    private user: Object;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.token = '';
        this.expiryDate = new Date();
        this.user = {};
    }

    public getUser = (): Object => this.user;

    public getToken = (): string => this.token;

    public getAuthorizationHeader = (): string => 'Bearer ' + this.token;

    public refreshToken = async (): Promise<void> => {
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
    /////////////////

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

    public fetchUserOne = async (filter: Object, requestedFields: [string]) => {
        let data: { userOne: any } = await this.query(new UserOneQuery({ filter }, requestedFields), true, false);
        return data.userOne;
    }

    public fetchUserByIds = async (ids: [string], requestedFields: [string]) => {
        let data: { userByIds: any } = await this.query(new UserByIdsQuery({ ids }, requestedFields), true, false);
        return data.userByIds;
    }

    public fetchUserMany = async (filter: Object, requestedFields: [string], limit?: number) => {
        let data: { userMany: any } = await this.query(new UserManyQuery({ filter, limit }, requestedFields), true, false);
        return data.userMany;
    }

    public fetchUserCount = async (filter?: Object): Promise<number> => {
        const variables: any = {}
        if (filter){
            variables.filter = filter;
        }
        let data: { userCount: number } = await this.query(new UserCountQuery(variables), true, false);
        return data.userCount;
    }

    public fetchUserWithPagination = async (filter: Object, requestedFields: [string], page: number, perPage: number) => {
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
                throw new (<any>window)[errorType](message);
            }
        }

        const data = res.data;

        if (data.login) {
            this.setState(data.login.token, new Date(data.login.expiryDate));
        } else if (data.refreshToken) {
            this.setState(data.refreshToken.token, new Date(data.login.expiryDate));
        } else if (data.updateMe) {
            this.setState(data.updateMe.token, new Date(data.login.expiryDate));
        }

        return data;
    }

    private setState = (token: string, expiryDate: Date): void => {
        this.expiryDate = expiryDate;
        this.token = token;
        this.user = JSON.parse(window.atob(token.split('.')[1]));
    }
}