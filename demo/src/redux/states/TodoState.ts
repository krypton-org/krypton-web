export enum TransactionType { 
    ADD_TODO, 
    DELETE_TODO, 
    UPDATE_TODO,
    FETCH_TODO,
}

export interface Todo { 
    text: string;
    isCompleted: boolean;
    date: Date;
    _id: string;
}

export default interface TodoState {
    isTransactionLoading: boolean;
    isTransactionSuccess: boolean;
    transactionType: TransactionType | null;
    list: Todo [];
}
