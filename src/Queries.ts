export abstract class Query {
    protected variables: any;

    constructor(variables = {}) {
        this.variables = variables;
    }

    public toJsonString = (): string => {
        return JSON.stringify({ query: this.getQuery(), variables: this.variables });
    };

    protected abstract getQuery(): string;
}

export abstract class QueryWithRequestedFields extends Query {
    private requestedFields: [String];

    constructor(variables: Object, requestedFields: [string]) {
        super(variables);
        this.requestedFields = requestedFields;
    }

    protected getRequestedFieldsFragment = (): string => {
        return `
            fragment requestedFields on UserPublicInfo {
                `+this.requestedFields.join(" ")+`
            }
        `
    }

    public toJsonString = (): string => {
        return JSON.stringify({ 
            query: this.getQuery() + ' ' + this.getRequestedFieldsFragment(), 
            variables: this.variables 
        });
    };
}

export class RefreshQuery extends Query {
    protected getQuery = (): string => `
        mutation { refreshToken { token, expiryDate } }
    `;
}

export class RegisterQuery extends Query {
    protected getQuery = (): string => `
        mutation register($fields: UserRegisterInput!) {
            register(fields: $fields)
        }
    `;
}

export class LoginQuery extends Query {
    protected getQuery = (): string => `
        mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
                expiryDate
            }
        }
    `;
}

export class UpdateQuery extends Query {
    protected getQuery = (): string => `
        mutation updateMe($fields: UserUpdateInput!) {
            updateMe(fields: $fields) {
                token
                expiryDate
            }
        }
    `;
}

export class DeleteQuery extends Query {
    protected getQuery = (): string => `
        mutation deleteMe($password: String!) {
            deleteMe(password: $password)
        }
    `;
}

export class EmailAvailableQuery extends Query {
    protected getQuery = (): string => `
        query emailAvailable($email: String!) {
            emailAvailable(email: $email)
        }
    `;
}

export class SendVerificationEmailQuery extends Query {
    protected getQuery = (): string => `
        query {
            sendVerificationEmail
        }
    `;
}

export class PublicKeyQuery extends Query {
    protected getQuery = (): string => `
        query {
            publicKey
        }
    `;
}

export class SendPasswordRecoveryQuery extends Query {
    protected getQuery = (): string => `
        query sendPasswordRecoveryEmail($email: String!) {
            sendPasswordRecoveryEmail(email: $email)
        }
    `;
}

export class UserOneQuery extends QueryWithRequestedFields {

    protected getQuery = (): string => `
        query userOne($filter: FilterFindOneUserPublicInfoInput!) {
            userOne(filter: $filter){
                ...requestedFields
            }
        }  
    `;
}

export class UserByIdsQuery extends QueryWithRequestedFields {

    protected getQuery = (): string => `
        query userByIds($ids: [MongoID]!) {
            userByIds(_ids: $ids){
                ...requestedFields
            }
        }
    `;
}

export class UserManyQuery extends QueryWithRequestedFields {

    protected getQuery = (): string => `
        query userMany($filter: FilterFindManyUserPublicInfoInput!, limit: int) {
            userMany(filter: $filter, limit: $limit){
                ...requestedFields
            }
        }
    `;
}

export class UserCountQuery extends Query {
    protected getQuery = (): string => {
        if(this.variables.filter){
            return `
                query userCount($filter: FilterUserPublicInfoInput!) {
                    userCount(filter: $filter)
                }
            `
        } else {
            return `
                query {
                    userCount
                }
            `
        }
    }
}

export class UserPaginationQuery extends QueryWithRequestedFields {
    protected getQuery = (): string => `
        query userPagination($filter: FilterFindManyUserPublicInfoInput!, $page: int!, $perPage: int!) {
            userPagination(filter: $filter, page: $page, perPage: $perPage){
                ...requestedFields
            }
        }
    `;
}

