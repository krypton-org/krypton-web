import React, { Component } from 'react';
import { RootState } from '../../../redux/Root';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Form from '../../utils/Form';
import { addTodo } from '../../../redux/actions/TodoActions';
import { TodoTransactionType } from '../../../redux/states/TodoState';

interface Props {
    dispatch: Dispatch<any>;
    isTransactionLoading: boolean;
    transactionType: TodoTransactionType | null;
}

interface State {
    text: string;
}

class TodoAddForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    handleTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ ...this.state, text: event.target.value });
    };

    handleSubmit = (event?: React.FormEvent<HTMLButtonElement>): void | undefined => {
        if (this.state.text !== '') {
            this.props.dispatch(addTodo(this.state.text));
            this.setState({ text: '' });
        }
    };

    render() {
        const isDisabled = this.state.text === '';
        let submitClass = 'button is-link ';
        if (this.props.isTransactionLoading && this.props.transactionType === TodoTransactionType.ADD_TODO) {
            submitClass += 'is-loading';
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <div className="columns is-vcentered">
                        <div className="column is-vcentered has-text-right">
                            <h2 className="subtitle">Add a todo</h2>
                        </div>
                        <div className="column is-vcentered">
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Enter a todo"
                                    value={this.state.text}
                                    onChange={this.handleTextChange}
                                />
                            </div>
                        </div>
                        <div className="column">
                            <button className={submitClass} disabled={isDisabled}>
                                Add
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    isTransactionLoading: state.todo.isTransactionLoading,
    transactionType: state.todo.transactionType,
});

export default connect(mapStateToProps)(TodoAddForm);
