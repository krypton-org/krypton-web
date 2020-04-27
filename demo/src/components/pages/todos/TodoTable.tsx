import React, { Component } from 'react';
import { RootState } from '../../../redux/Root';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Todo } from '../../../redux/states/TodoState';
import TodoComponent from './Todo';
interface Props {
    dispatch: Dispatch<any>;
    list: Todo[];
}

interface State {}

class TodoTable extends Component<Props, State> {
    render() {
        const todos = this.props.list.map((todo) => <TodoComponent data={todo}></TodoComponent>);
        return (
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th className="has-text-centered" style={{ width: '15%' }}>
                            Status
                        </th>
                        <th className="is-two-fifths" style={{ width: '60%' }}>
                            Todo
                        </th>
                        <th style={{ width: '20%' }}>Date</th>
                        <th style={{ width: '5%' }}></th>
                    </tr>
                </thead>
                <tbody>{todos}</tbody>
            </table>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    list: state.todo.list,
});

export default connect(mapStateToProps)(TodoTable);
