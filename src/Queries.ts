export abstract class Query {
    private variables: Object;

    constructor(variables: Object){
        this.variables = variables;
    }

    public toJsonString = (): string => {
        return JSON.stringify({ query: this.getQuery(), variables: this.variables});
    };
    
    protected abstract getQuery() : string;
}

export class RefreshQuery extends Query{
    protected getQuery = (): string => `
        mutation { refreshToken { token } }
    `;
}

export class RegisterQuery extends Query{
    protected getQuery = (): string => `
        mutation register($fields: UserRegisterInput!) {
            register(fields: $fields)
        }
    `;
}

export class LoginQuery extends Query{
    protected getQuery = (): string => `
        mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
            }
        }
    `;
}

export class UpdateQuery extends Query{
    protected getQuery = (): string => `
        mutation updateMe($fields: UserUpdateInput!) {
            updateMe(fields: $fields) {
                token
            }
        }
    `;
}

export class DeleteQuery extends Query{
    protected getQuery = (): string => `
        mutation deleteMe($password: String!) {
            deleteMe(password: $password)
        }
    `;
}
