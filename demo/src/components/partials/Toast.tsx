import React, { Component } from 'react';
import { Node } from './ToastContainer'
import { Notification } from '../../redux/states/NotifState';

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
            <article style={hidedStyle} className={"message is-"+this.props.notification.type.toString()}>
                <div className="message-header">
                    <p>{this.props.notification.title}</p>
                    <button className="delete" aria-label="delete" onClick={this.handleClick}></button>
                </div>
                <div className="message-body">
                    {this.props.notification.message}
                </div>
            </article>
        );
    }
}