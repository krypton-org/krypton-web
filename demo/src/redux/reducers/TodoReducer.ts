import { TransactionType } from './../states/TodoState';
import TodoState from '../states/TodoState';

const initialState: TodoState = {
    isTransactionLoading: false,
    isTransactionSuccess: false,
    transactionType: null,
    list: [],
};

export default function userReducer(
    state = initialState,
    action: any
): TodoState {
    switch (action.type) {
        case 'ADD_TODO_BEGIN':
            return {
                ...state,
                isTransactionLoading: true,
                isTransactionSuccess: false,
                transactionType: TransactionType.ADD_TODO
            }
        case 'ADD_TODO_FAILURE':
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: false,
                transactionType: null
            }
        case 'ADD_TODO_SUCCESS':
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: true,
                transactionType: null,
                list: [action.payload.todo, ...state.list]
            }
        case 'DELETE_TODO_BEGIN':
            return {
                ...state,
                isTransactionLoading: true,
                isTransactionSuccess: false,
                transactionType: TransactionType.DELETE_TODO
            }
        case 'DELETE_TODO_FAILURE':
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: false,
                transactionType: null
            }
        case 'DELETE_TODO_SUCCESS':
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: true,
                transactionType: null,
                list: state.list.filter(todo => todo._id !== action.payload.todo._id)
            }

        case 'UPDATE_TODO_BEGIN':
            return {
                ...state,
                isTransactionLoading: true,
                isTransactionSuccess: false,
                transactionType: TransactionType.UPDATE_TODO
            }
        case 'UPDATE_TODO_FAILURE':
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: false,
                transactionType: null
            }
        case 'UPDATE_TODO_SUCCESS':
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: true,
                transactionType: null,
                list: state.list.map(todo => (todo._id === action.payload.todo._id) ? action.payload.todo : todo),
            }
        case 'FETCH_TODO_BEGIN':
            return {
                ...state,
                isTransactionLoading: true,
                isTransactionSuccess: false,
                transactionType: TransactionType.FETCH_TODO
            }
        case 'FETCH_TODO_FAILURE':
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: false,
                transactionType: null
            }
        case 'FETCH_TODO_SUCCESS':
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: true,
                transactionType: null,
                list: action.payload.todos,
            }
        default:
            return state;
    }
}