import React, { Component } from 'react';
import Toast from './Toast';
import { Notification } from '../../redux/states/NotifState';
import { connect } from 'react-redux';
import { RootState } from '../../redux/Root';
import './ToastContainer.css';

const MAX_DISPLAYED = 15;

interface Prop {
    notification: Notification | null;
}

export interface Node<T> {
    element: T;
    prev: Node<T> | null;
    next: Node<T> | null;
}

interface State {
    lastNotification: Notification | null;
    firstEl: Node<Notification> | null;
    lastEl: Node<Notification> | null;
}

class ToastContainer extends Component<Prop, State> {
    constructor(props: Prop) {
        super(props);
        this.state = {
            lastNotification: null,
            firstEl: null,
            lastEl: null,
        };
        if (this.props.notification) {
            this.add(this.props.notification);
        }
    }

    add = (notification: Notification | null) => {
        if (notification === null) {
            return;
        }
        const result: State = {
            firstEl: null,
            lastEl: null,
            lastNotification: notification,
        };
        const linkedListElement = {
            element: notification,
            prev: null,
            next: null,
        };
        if (this.state.firstEl == null || this.state.lastEl == null) {
            result.firstEl = linkedListElement;
            result.lastEl = linkedListElement;
        } else {
            this.connect(this.state.lastEl, linkedListElement);
            result.firstEl = this.state.firstEl;
            result.lastEl = linkedListElement;
        }
        this.setState(result);
    };

    connect = (prevEl: Node<Notification>, nextEl: Node<Notification>) => {
        prevEl.next = nextEl;
        nextEl.prev = prevEl;
    };

    remove = (linkedListElement: Node<Notification>) => {
        const result: State = {
            firstEl: this.state.firstEl,
            lastEl: this.state.firstEl,
            lastNotification: this.state.lastNotification,
        };
        if (linkedListElement.prev && linkedListElement.next) {
            this.connect(linkedListElement.prev, linkedListElement.next);
        } else if (linkedListElement.prev) {
            linkedListElement.prev.next = null;
            result.lastEl = linkedListElement.prev;
            result.firstEl = this.state.firstEl;
        } else if (linkedListElement.next) {
            linkedListElement.next.prev = null;
            result.lastEl = this.state.lastEl;
            result.firstEl = linkedListElement.next;
        } else {
            result.lastEl = null;
            result.firstEl = null;
        }
        this.setState(result);
    };

    isNotificationNew(notif: Notification | null): boolean {
        return notif !== null && notif !== this.state.lastNotification;
    }

    componentDidUpdate() {
        if (this.isNotificationNew(this.props.notification)) {
            this.add(this.props.notification);
        }
    }

    render() {
        const toasts = [];
        let current = this.state.firstEl;
        let i = 0;

        while (current && i < MAX_DISPLAYED) {
            toasts.push(
                <Toast
                    node={current}
                    message={current.element.message}
                    type={current.element.type}
                    date={current.element.date}
                    key={current.element.date.getTime()}
                    remove={(node) => {
                        this.remove(node);
                    }}
                />,
            );
            current = current.next;
            ++i;
        }

        return <div className="toast-container">{toasts}</div>;
    }
}

const mapStateToProps = (state: RootState) => ({
    notification: state.notifier.lastNotification,
});

export default connect(mapStateToProps)(ToastContainer);
