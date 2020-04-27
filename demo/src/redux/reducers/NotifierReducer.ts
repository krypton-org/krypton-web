import NotifierState from '../states/NotifState';
const initialState = {
    lastNotification: null,
};

export default function userReducer(state = initialState, action: any): NotifierState {
    switch (action.type) {
        case 'NOTIFY':
            return {
                lastNotification: action.payload.notification,
            };
        default:
            return state;
    }
}
