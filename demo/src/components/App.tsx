import React, { Component } from 'react';
import NavBar from './partials/NavBar';
import Footer from './partials/Footer';
import Home from './pages/Home';
import 'bulma/css/bulma.css'
import './App.css';
import { connect } from "react-redux";
import { checkLoginState } from '../redux/actions/AuthActions';
import { RootState } from '../redux/Root';
import { Dispatch } from "redux";
import ToastContainer from './partials/ToastContainer';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Settings from './pages/settings/Index';
import Todos from './pages/todos/Index';
import PrivateRoute from './utils/PrivateRoute';

interface Props {
  isCheckLoginStateLoading: boolean
  dispatch: Dispatch<any>;
}

class App extends Component<Props> {

  componentWillMount() {
    this.props.dispatch(checkLoginState());
  }

  render() {
    if (this.props.isCheckLoginStateLoading) {
      const style: React.CSSProperties = {
        position: "fixed", /* or absolute */
        top: "50%",
        left: "50%"
      }
      return <h1 style={style}>Loading...</h1>
    } else {

      return (
        <Router>
          <NavBar />
          <ToastContainer />
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/settings">
            <Settings />
          </PrivateRoute>
          <PrivateRoute path="/todos">
            <Todos />
          </PrivateRoute>
          <Footer />
        </Router>
      );
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  isCheckLoginStateLoading: state.auth.isCheckLoginStateLoading,
});

export default connect(mapStateToProps)(App);