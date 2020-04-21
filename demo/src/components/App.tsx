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
      const style : React.CSSProperties = {
        position: "fixed", /* or absolute */
        top: "50%",
        left: "50%"
      }
      return <h1 style={style}>Loading...</h1>
    } else {
      return (
        <div className="App">
          <NavBar />
          <Home />
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  isCheckLoginStateLoading: state.auth.isCheckLoginStateLoading,
});

export default connect(mapStateToProps)(App);