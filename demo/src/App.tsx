import React, { Component } from 'react';
import NavBar from './partials/NavBar';
import Footer from './partials/Footer';
import Home from './pages/Home';
import 'bulma/css/bulma.css'
import './App.css'
import Krypton from '@krypton-org/krypton-web';

interface State {
  krypton: Krypton;
  user: { email: string, _id: string, verified: boolean } | null | undefined;
  isLoggedIn: boolean;
}

export default class App extends Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      krypton: new Krypton("https://nusid.net/krypton-auth"),
      isLoggedIn: false,
      user: null
    };
  }

  register = async (email: string, password: string): Promise<void> => {
    await this.state.krypton.register(email, password);
  }

  login = async (email: string, password: string): Promise<void> => {
    await this.state.krypton.login(email, password);
    this.setState({...this.state, isLoggedIn:true, user: this.state.krypton.getUser()})
  }

  recoverPassword = async (email: string): Promise<void> => {
    await this.state.krypton.recoverPassword(email);
  }

  isLoggedIn = async (): Promise<void> => {
    if(await this.state.krypton.isLoggedIn()){
      this.setState({...this.state, isLoggedIn:true, user: this.state.krypton.getUser()})
    };
  }

  componentWillMount(){
    this.isLoggedIn();
  }

  render() {
    return (
      <div className="App">
        <NavBar
          register={this.register}
          login={this.login}
          recoverPassword={this.recoverPassword}
          isLoggedIn={this.state.isLoggedIn}
          user={this.state.user}
        />
        <Home />
        <Footer />
      </div>
    );
  }
}

