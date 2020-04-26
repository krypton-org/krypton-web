import React, { Component } from 'react';
import { Node } from './ToastContainer'
import { Notification } from '../../redux/states/NotifState';

interface Prop {
    message: string;
    type: string;
    date: Date;
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
            <article style={hidedStyle} className={"message is-" + this.props.type.toString()}>
                <div className="message-body">
                    <div className="columns">
                        <div className="column">
                            {this.props.message}
                        </div>
                        <div className="column is-one-fifth is-vven">
                            <button className="delete" aria-label="delete" onClick={this.handleClick}></button>

                        </div>
                    </div>
                </div>
            </article>
        );
    }
}