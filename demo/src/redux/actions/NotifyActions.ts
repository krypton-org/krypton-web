import { Notification } from '../states/NotifState';

export const notify = (notification: Notification) => ({
    type: 'NOTIFY',
    payload: { notification },
});
