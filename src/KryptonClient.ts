import { 
    Query, 
    RefreshQuery, 
    LoginQuery, 
    UpdateQuery, 
    DeleteQuery, 
    RegisterQuery 
} from './Queries'
import { UnauthorizedError} from './ErrorTypes';

export default class KryptonClient {
    private endpoint: string;
    private token: string;
    private user: Object;

    constructor(endpoint: string){
        this.endpoint = endpoint;
        this.token = '';
        this.user = {};
    }

    public getUser = (): Object => this.user;

    public getToken = (): string => this.token;

    public getAuthorizationHeader = (): string =>'Bearer '+ this.token;

    public refresh = (): void => {
    //     self.__query(RefreshQuery())
    }

    // public register = (fields: Object): void => {
    //     fields = {"email": email, "password": password, **kwargs}
    //     self.query(RegisterQuery(fields=fields))
    // }
        
    // public login = (email: string, password: string): void => {
    //     self.query(LoginQuery(email=email, password=password))
    // }

    // public update = (fields: Object): void => {
    //     self.query(UpdateQuery(fields=kwargs))
    // }

    // public delete = (password): void => {
    //     self.query(DeleteQuery(password=password))
    // }

    private query = async (q: Query, isAuthTokenRequired: boolean, isAlreadyRefreshed = false): Promise<void> => {
        const headers: any = {
            'Content-Type': 'application/json',
        };
        if (isAuthTokenRequired) {
            headers['Authorization'] = this.getAuthorizationHeader();
        }
        try {
            let result = await fetch(this.endpoint, {
                method: 'POST',
                headers,
                body: q.toJsonString()
            }).then(res => res.json());
            return result;
        } catch (err){
            if (err instanceof UnauthorizedError && !isAlreadyRefreshed){
                await this.refresh();
                return await this.query(q, isAuthTokenRequired, true)
            }
        }
    }
}