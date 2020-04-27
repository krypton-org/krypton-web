import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TodoAddForm from './TodoAddForm';
import TodoTable from './TodoTable';
import { fetchTodo } from '../../../redux/actions/TodoActions';

interface Props {
    dispatch: Dispatch<any>;
}

class Todos extends Component<Props> {
    componentWillMount() {
        this.props.dispatch(fetchTodo());
    }

    render() {
        return (
            <div className="container">
                <h1 className="title">Todos</h1>
                <TodoAddForm />
                <TodoTable />
            </div>
        );
    }
}

export default connect()(Todos);
