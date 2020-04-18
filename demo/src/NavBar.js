import React, { Component } from 'react';
import SignInModal from './SignUpModal';

export default class NavBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            loginModal: false,
            signUpModal: false,
            recoverPasswordModal: false
        }
    }

    openSignupModal = (e) => {
        this.setState({ ...this.state, signUpModal: true })
    }

    closeSignupModal = (e) => {
        this.setState({ ...this.state, signUpModal: false })
    }

    openLoginModal = (e) => {
        this.setState({ ...this.state, signupModal: true })
    }

    closeLoginModal = (e) => {
        this.setState({ ...this.state, signupModal: false })
    }

    openRecoverPasswordModalModal = (e) => {
        this.setState({ ...this.state, recoverPasswordModal: true })
    }

    closeRecoverPasswordModalModal = (e) => {
        this.setState({ ...this.state, recoverPasswordModal: false })
    }

    render = () => {
        return (
            <div>
            <nav className="navbar" role="navigation" aria-label="main navigation" style={{ boxShadow: "0 3px 3px -2px rgba(0,0,0,.2)" }}>
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img src="https://github.com/krypton-org/krypton-web/raw/master/img/logo-krypton-web.png" width="30" height="30" />
                        </a>

                        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <a className="navbar-item">
                                Home
                            </a>

                            <a className="navbar-item">
                                Todos
                            </a>


                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a className="button is-primary" onClick={this.openSignupModal}>
                                        <strong>Sign up</strong>
                                    </a>
                                    <a className="button is-light">
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <SignInModal isActive={this.state.signUpModal} closeSignupModal={this.closeSignupModal} openloginModal={this.openloginModal}/>
            </div>
        )
    }
}
