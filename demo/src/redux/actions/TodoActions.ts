import { notify } from "./NotifyActions";
import { Severity } from "../states/NotifState";
import { RootState } from "../Root";

export const addTodo = (text: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(addTodoBegin());
            try {
                const graphQLQuery = addTodoQuery(text, getState().auth.krypton.getUser()._id);
                const res = await sendRequest(getState().auth.krypton.getAuthorizationHeader(), graphQLQuery);
                if (res.data) {
                    dispatch(addTodoSuccess(res.data.todoCreateOne.record));
                } else {
                    throw new Error('Transaction failed');
                }
            } catch (err) {
                dispatch(addTodoFailure());
                dispatch(notify({
                    message: err.message,
                    date: new Date(),
                    type: Severity.DANGER,
                    title: 'Error'
                }));
            }
        })();
    }
};

export const deleteTodo = (todoId: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(deleteTodoBegin());
            try {
                const graphQLQuery = deleteTodoQuery(todoId);
                const res = await sendRequest(getState().auth.krypton.getAuthorizationHeader(), graphQLQuery);
                if (res.data) {
                    dispatch(deleteTodoSuccess(res.data.todoRemoveById.record));
                } else {
                    throw new Error('Transaction failed');
                }
            } catch (err) {
                dispatch(deleteTodoFailure());
                dispatch(notify({
                    message: err.message,
                    date: new Date(),
                    type: Severity.DANGER,
                    title: 'Error'
                }));
            }
        })();
    }
}

export const completeTodo = (todoId: string) => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(updateTodoBegin());
            try {
                const graphQLQuery = completeTodoQuery(todoId);
                const res = await sendRequest(getState().auth.krypton.getAuthorizationHeader(), graphQLQuery);
                if (res.data) {
                    dispatch(updateTodoSuccess(res.data.todoUpdateById.record));
                } else {
                    throw new Error('Transaction failed');
                }
            } catch (err) {
                dispatch(updateTodoFailure());
                dispatch(notify({
                    message: err.message,
                    date: new Date(),
                    type: Severity.DANGER,
                    title: 'Error'
                }));
            }
        })();
    }
}

export const fetchTodo = () => {
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(fetchTodoBegin());
            try {
                const graphQLQuery = fetchTodoQuery(getState().auth.krypton.getUser()._id);
                const res = await sendRequest(getState().auth.krypton.getAuthorizationHeader(), graphQLQuery);
                if (res.data) {
                    dispatch(fetchTodoSuccess(res.data.todoMany));
                } else {
                    throw new Error('Transaction failed');
                }
            } catch (err) {
                dispatch(fetchTodoFailure());
                dispatch(notify({
                    message: err.message,
                    date: new Date(),
                    type: Severity.DANGER,
                    title: 'Error'
                }));
            }
        })();
    }
}

export const addTodoBegin = () => ({
    type: 'ADD_TODO_BEGIN'
});

export const addTodoSuccess = (todo: any) => ({
    type: 'ADD_TODO_SUCCESS',
    payload: { todo }
});

export const addTodoFailure = () => ({
    type: 'ADD_TODO_FAILURE',
});

export const deleteTodoBegin = () => ({
    type: 'DELETE_TODO_BEGIN'
});

export const deleteTodoSuccess = (todoDeleted: any) => ({
    type: 'DELETE_TODO_SUCCESS',
    payload: { todo: todoDeleted }
});

export const deleteTodoFailure = () => ({
    type: 'DELETE_TODO_FAILURE',
});

export const updateTodoBegin = () => ({
    type: 'UPDATE_TODO_BEGIN'
});

export const updateTodoSuccess = (todoDeleted: any) => ({
    type: 'UPDATE_TODO_SUCCESS',
    payload: { todo: todoDeleted }
});

export const updateTodoFailure = () => ({
    type: 'UPDATE_TODO_FAILURE',
});

export const fetchTodoBegin = () => ({
    type: 'FETCH_TODO_BEGIN'
});

export const fetchTodoSuccess = (todos: any) => ({
    type: 'FETCH_TODO_SUCCESS',
    payload: { todos }
});

export const fetchTodoFailure = () => ({
    type: 'FETCH_TODO_FAILURE',
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
        body: JSON.stringify(query)
    }).then(res => res.json());
    return res;
}

const addTodoQuery = (text: string, userId: string): { query: string, variables: { text: string, userId: string } } => {
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
        variables: { text, userId }
    }
}

const deleteTodoQuery = (id: string): { query: string, variables: { id: string } } => {
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
        variables: { id }
    }
}

const completeTodoQuery = (id: string): { query: string, variables: { id: string } } => {
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
        variables: { id }
    }
};

const fetchTodoQuery = (userId: string): { query: string, variables: { userId: string } } => {
    return {
        query: `query todoMany($userId: String!){
            todoMany(filter: {userId: $userId}){
                text
                isCompleted
                date
                _id
            }
        }`,
        variables: { userId }
    }
}
