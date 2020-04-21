import React, { Component } from 'react';
import Toast from './Toast';
import LinkedList from '../../data-structures/LinkedList'

const MAX_DISPLAYED = 15;

export enum Severity { "secondary", "success", "info", "warning", "danger" }


export interface Notification {
    message: string;
    type: Severity;
}

interface Prop {
    notification?: Notification;
}

interface State {
    list: LinkedList<Notification>;
}

class ToastContainer extends Component<Prop, State> {
    constructor(props: Prop) {
        super(props);

        this.state = {
            list: new LinkedList<Notification>()
        };

        if (this.props.notification) {
            this.state.list.add(this.props.notification);
        }

    }

    componentDidUpdate = () => {
        if (this.props.notification && 
                this.state.list.last
                && this.props.notification !== this.state.list.last.element) {
            this.state.list.add(this.props.notification)
        }
    }

    render() {
        const toasts = [];
        let current = this.state.list.first;
        let i = 0;
        
        while (current && i < MAX_DISPLAYED) {
            toasts.push(<Toast
                node={current}
                notification={current.element}
                key={i}
                remove={(listEl) => this.state.list.remove(listEl)}
            />);
            current = current.next;
            ++i;
        }

        return (
            <div className="toast-container">
                {toasts}
            </div>
        );
    }
}