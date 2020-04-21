import React, { Component } from 'react';
import './Toast.css'
import { Node } from '../../data-structures/LinkedList'
import { Notification } from './ToastContainer'

interface Prop {
    notification: Notification;
    key: number
    remove: (node: Node<Notification>) => void;
    node: Node<Notification>;
}

interface State {
    hide: boolean;
}

export default class Toast extends Component<Prop, State> {

    constructor(props: Prop) {
        super(props);

        this.state = {
            hide: false,
        };
    }

    handleClick = () => {
        this.setState({ ...this.state, hide: true });
        setTimeout(() => {
            this.setState({ ...this.state, hide: false });
            this.props.remove(this.props.node)
        }, 550);
    }

    render() {
        let hidedStyle;
        if (this.state.hide) {
            hidedStyle = {
                opacity: 0,
            }
        }
        return (
            <div className="toast --blue" style={hidedStyle} role="alert" aria-live="assertive" aria-atomic="true" >
                <div className="toast-body" dangerouslySetInnerHTML={{ __html: this.props.notification.message }} />
            </div>
        );
    }
}