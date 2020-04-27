import TodoState from '../states/TodoState';
import { TODO_TRANSACTION_BEGIN, TODO_TRANSACTION_FAILURE, TODO_TRANSACTION_SUCCESS } from '../actions/TodoActions';

const initialState: TodoState = {
    isTransactionLoading: false,
    isTransactionSuccess: false,
    transactionType: null,
    list: [],
};

export default function userReducer(state = initialState, action: any): TodoState {
    switch (action.type) {
        case TODO_TRANSACTION_BEGIN:
            return {
                ...state,
                isTransactionLoading: true,
                isTransactionSuccess: false,
                transactionType: action.payload.transactionType,
            };
        case TODO_TRANSACTION_FAILURE:
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: false,
                transactionType: null,
            };
        case TODO_TRANSACTION_SUCCESS:
            return {
                ...state,
                isTransactionLoading: false,
                isTransactionSuccess: true,
                transactionType: null,
                list: action.payload.todos,
            };
        default:
            return state;
    }
}
