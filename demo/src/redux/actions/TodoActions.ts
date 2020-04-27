import { notify } from './NotifyActions';
import { Severity } from '../states/NotifState';
import { RootState } from '../Root';
import { TodoTransactionType, Todo } from '../states/TodoState';

export const addTodo = (text: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(TodoTransactionType.ADD_TODO));
            try {
                const graphQLQuery = addTodoQuery(text, getState().auth.krypton.getUser()._id);
                const res = await sendRequest(getState().auth.krypton.getAuthorizationHeader(), graphQLQuery);
                if (res.data) {
                    const todo = res.data.todoCreateOne.record;
                    dispatch(transactionSuccess([todo, ...getState().todo.list]));
                } else {
                    throw new Error('Transaction failed');
                }
            } catch (err) {
                dispatch(transactionFailure());
                dispatch(
                    notify({
                        message: err.message,
                        date: new Date(),
                        type: Severity.DANGER,
                        title: 'Error',
                    }),
                );
            }
        })();
    };
};

export const deleteTodo = (todoId: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(TodoTransactionType.DELETE_TODO));
            try {
                const graphQLQuery = deleteTodoQuery(todoId);
                const res = await sendRequest(getState().auth.krypton.getAuthorizationHeader(), graphQLQuery);
                if (res.data) {
                    const todos = getState().todo.list.filter(
                        (todo) => todo._id !== res.data.todoRemoveById.record._id,
                    );
                    dispatch(transactionSuccess(todos));
                } else {
                    throw new Error('Transaction failed');
                }
            } catch (err) {
                dispatch(transactionFailure());
                dispatch(
                    notify({
                        message: err.message,
                        date: new Date(),
                        type: Severity.DANGER,
                        title: 'Error',
                    }),
                );
            }
        })();
    };
};

export const completeTodo = (todoId: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(TodoTransactionType.UPDATE_TODO));
            try {
                const graphQLQuery = completeTodoQuery(todoId);
                const res = await sendRequest(getState().auth.krypton.getAuthorizationHeader(), graphQLQuery);
                if (res.data) {
                    const todo = res.data.todoUpdateById.record;
                    dispatch(
                        transactionSuccess(
                            getState().todo.list.map((currTodo) => (currTodo._id === todo._id ? todo : currTodo)),
                        ),
                    );
                } else {
                    throw new Error('Transaction failed');
                }
            } catch (err) {
                dispatch(transactionFailure());
                dispatch(
                    notify({
                        message: err.message,
                        date: new Date(),
                        type: Severity.DANGER,
                        title: 'Error',
                    }),
                );
            }
        })();
    };
};

export const fetchTodo = () => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(TodoTransactionType.FETCH_TODO));
            try {
                const graphQLQuery = fetchTodoQuery(getState().auth.krypton.getUser()._id);
                const res = await sendRequest(getState().auth.krypton.getAuthorizationHeader(), graphQLQuery);
                if (res.data) {
                    dispatch(transactionSuccess(res.data.todoMany));
                } else {
                    throw new Error('Transaction failed');
                }
            } catch (err) {
                dispatch(transactionFailure());
                dispatch(
                    notify({
                        message: err.message,
                        date: new Date(),
                        type: Severity.DANGER,
                        title: 'Error',
                    }),
                );
            }
        })();
    };
};

export const TODO_TRANSACTION_BEGIN = 'TODO_TRANSACTION_BEGIN';
const transactionBegin = (transactionType: TodoTransactionType) => ({
    type: TODO_TRANSACTION_BEGIN,
    payload: { transactionType },
});

export const TODO_TRANSACTION_SUCCESS = 'TODO_TRANSACTION_SUCCESS';
const transactionSuccess = (todos: Todo[]) => ({
    type: TODO_TRANSACTION_SUCCESS,
    payload: { todos },
});

export const TODO_TRANSACTION_FAILURE = 'TODO_TRANSACTION_FAILURE';
const transactionFailure = () => ({
    type: TODO_TRANSACTION_FAILURE,
});

async function sendRequest(authorizationHeader: string, query: any): Promise<any> {
    const headers: any = {
        'Content-Type': 'application/json',
    };

    headers['Authorization'] = authorizationHeader;

    const res = await fetch('http://localhost:5006', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(query),
    }).then((res) => res.json());
    return res;
}

const addTodoQuery = (text: string, userId: string): { query: string; variables: { text: string; userId: string } } => {
    return {
        query: `mutation todoCreateOne($text: String!, $userId: String!) {
            todoCreateOne(record: {text: $text, userId: $userId}) {
                record{
                    text
                    isCompleted
                    date
                    _id
                }
            }
        }`,
        variables: { text, userId },
    };
};

const deleteTodoQuery = (id: string): { query: string; variables: { id: string } } => {
    return {
        query: `mutation todoRemoveById($id: MongoID!){
            todoRemoveById(_id: $id){
                record{
                    text
                    isCompleted
                    date
                    _id
                }
            }
        }`,
        variables: { id },
    };
};

const completeTodoQuery = (id: string): { query: string; variables: { id: string } } => {
    return {
        query: `mutation todoUpdateById($id: MongoID!){
            todoUpdateById(record:{_id: $id, isCompleted: true}){
                record{
                    text
                    isCompleted
                    date
                    _id      
                }
            }
        }`,
        variables: { id },
    };
};

const fetchTodoQuery = (userId: string): { query: string; variables: { userId: string } } => {
    return {
        query: `query todoMany($userId: String!){
            todoMany(filter: {userId: $userId}){
                text
                isCompleted
                date
                _id
            }
        }`,
        variables: { userId },
    };
};
