import React, { Component } from 'react';
import { Dispatch } from 'redux';
import TimeAgo from 'react-timeago';
import { connect } from 'react-redux';
import { Todo } from '../../../redux/states/TodoState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { deleteTodo, completeTodo } from '../../../redux/actions/TodoActions';

interface Props {
    dispatch: Dispatch<any>;
    data: Todo;
}

class TodoComponent extends Component<Props> {
    handleClose = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void | undefined => {
        this.props.dispatch(deleteTodo(this.props.data._id));
    };

    handleCompleted = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void | undefined => {
        this.props.dispatch(completeTodo(this.props.data._id));
    };

    render() {
        const date = new Date(this.props.data.date);
        return (
            <tr>
                <td className="has-text-centered" style={{ verticalAlign: 'middle' }}>
                    {!this.props.data.isCompleted ? (
                        <button className="button is-info is-outlined is-small" onClick={this.handleCompleted}>
                            Mark as completed
                        </button>
                    ) : (
                        <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                    )}
                </td>
                <td style={{ verticalAlign: 'middle' }}>{this.props.data.text}</td>
                <td style={{ verticalAlign: 'middle' }}>
                    <TimeAgo date={date} />
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                    <a className="delete" onClick={this.handleClose}></a>
                </td>
            </tr>
        );
    }
}

export default connect()(TodoComponent);
