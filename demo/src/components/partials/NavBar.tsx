import React, { Component } from 'react';
import SignUpModal from '../modals/SignUpModal';
import RecoverPasswordsModal from '../modals/RecoverPasswordModal';
import LoginModal from '../modals/LoginModal';
import { connect } from "react-redux";
import { RootState } from '../../redux/Root';

interface Props {
    isLoggedIn: boolean;
    user: { email: string, _id: string, verified: boolean } | null | undefined;
    registerSuccess: string | null,
    loginSuccess: string | null,
    recoverPasswordInfo: string | null,
    isLoginLoading: boolean,
    isRegisterLoading: boolean,
    isRecoverPasswordLoading: boolean,
}

interface State {
    loginModal: boolean;
    signUpModal: boolean;
    recoverPasswordModal: boolean;
}

class NavBar extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            loginModal: false,
            signUpModal: false,
            recoverPasswordModal: false
        }
    }

    openSignupModal = (e: React.MouseEvent<Element, MouseEvent>) => {
        this.setState({ loginModal: false, recoverPasswordModal: false, signUpModal: true })
    }

    closeModals = (e?: React.MouseEvent<Element, MouseEvent>) => {
        this.setState({ loginModal: false, recoverPasswordModal: false, signUpModal: false })
    }

    openLoginModal = (e: React.MouseEvent<Element, MouseEvent>) => {
        this.setState({ loginModal: true, recoverPasswordModal: false, signUpModal: false })
    }

    openRecoverPasswordModalModal = (e: React.MouseEvent<Element, MouseEvent>) => {
        this.setState({ loginModal: false, recoverPasswordModal: true, signUpModal: false })
    }

    componentDidUpdate(prevProps: any){
        if (prevProps.isLoginLoading && !this.props.isLoginLoading && this.props.loginSuccess){
            this.closeModals();
        }
        if (prevProps.isRegisterLoading && !this.props.isRegisterLoading && this.props.registerSuccess){
            this.closeModals();
        }
        if (prevProps.isRecoverPasswordLoading && !this.props.isRecoverPasswordLoading && this.props.recoverPasswordInfo){
            this.closeModals();
        }
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
                                <a className="navbar-item">Home</a>
                                <a className="navbar-item">Todos</a>
                            </div>
                            <div className="navbar-end">
                                {this.props.isLoggedIn ?
                                    <div className="navbar-item has-dropdown is-hoverable">
                                        <a className="navbar-link">
                                            {this.props.user?.email}
                                        </a>

                                        <div className="navbar-dropdown">
                                            <a className="navbar-item">
                                                Log out
                                            </a>
                                        </div>
                                    </div>
                                    :
                                    <div className="navbar-item">
                                        <div className="buttons">
                                            <a className="button is-primary" onClick={this.openSignupModal}>
                                                <strong>Sign up</strong>
                                            </a>
                                            <a className="button is-light" onClick={this.openLoginModal}>
                                                Log in
                                        </a>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </nav>
                <SignUpModal
                    isActive={this.state.signUpModal}
                    close={this.closeModals}
                    openloginModal={this.openLoginModal}
                />
                <RecoverPasswordsModal
                    isActive={this.state.recoverPasswordModal}
                    close={this.closeModals}
                />
                <LoginModal
                    isActive={this.state.loginModal}
                    close={this.closeModals}
                    openRecoverPasswordModalModal={this.openRecoverPasswordModalModal}
                    openSignupModal={this.openSignupModal}
                />

            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    registerSuccess: state.auth.registerSuccess,
    loginSuccess: state.auth.loginSuccess,
    recoverPasswordInfo: state.auth.recoverPasswordInfo,
    isLoginLoading: state.auth.isLoginLoading,
    isRegisterLoading: state.auth.isRegisterLoading,
    isRecoverPasswordLoading: state.auth.isRecoverPasswordLoading,
  });

export default connect(mapStateToProps)(NavBar);
