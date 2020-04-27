import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Form from '../utils/Form';
import { connect } from 'react-redux';
import { RootState } from '../../redux/Root';
import { login, removeModalsErrorMessages } from '../../redux/actions/AuthActions';
import { Dispatch } from 'redux';
import { AuthTransactionType } from '../../redux/states/AuthState';

interface ParentProps {
    isActive: boolean;
    close: (e?: React.MouseEvent<Element, MouseEvent>) => void;
    openRecoverPasswordModalModal: (e: React.MouseEvent<Element, MouseEvent>) => void;
    openSignupModal: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

interface ReduxProps {
    isTransactionLoading: boolean;
    localErrorMessage: string | null;
    transactionType: AuthTransactionType | null;
    dispatch: Dispatch<any>;
}

interface Props extends ParentProps, ReduxProps {}

interface State {
    email: string;
    password: string;
}

class LoginModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { password: '', email: '' };
    }

    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void | undefined => {
        this.setState({ ...this.state, email: event.target.value });
    };

    handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void | undefined => {
        this.setState({ ...this.state, password: event.target.value });
    };

    handleSubmit = (event?: React.FormEvent<HTMLButtonElement>): void | undefined => {
        this.props.dispatch(login(this.state.email, this.state.password));
    };

    handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void | undefined => {
        this.props.dispatch(removeModalsErrorMessages());
    };

    handleCloseModal = (e?: React.MouseEvent<Element, MouseEvent>): void => {
        this.props.dispatch(removeModalsErrorMessages());
        this.props.close();
    };

    render() {
        return (
            <div className={this.props.isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <Form onSubmit={this.handleSubmit}>
                        <header className="modal-card-head">
                            <p className="modal-card-title">Log in</p>
                            <button
                                type="button"
                                className="delete"
                                aria-label="close"
                                onClick={this.handleCloseModal}
                            ></button>
                        </header>
                        <section className="modal-card-body">
                            {this.props.localErrorMessage !== null &&
                                this.props.transactionType === AuthTransactionType.LOGIN && (
                                    <div className="notification is-danger">
                                        <button
                                            type="button"
                                            className="delete"
                                            onClick={this.handleNotificationClick}
                                        ></button>
                                        {this.props.localErrorMessage}
                                    </div>
                                )}
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className="input"
                                        type="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleEmailChange}
                                    />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className="input"
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                    />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                            </div>
                            <a href="#" onClick={this.props.openRecoverPasswordModalModal}>
                                Password forgotten?
                            </a>
                            <hr />
                            <div style={{ textAlign: 'center' }}>
                                No account yet?{' '}
                                <a href="#" onClick={this.props.openSignupModal}>
                                    Sign up
                                </a>
                                .
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            {this.props.isTransactionLoading &&
                            this.props.transactionType === AuthTransactionType.LOGIN ? (
                                <button className="button is-link is-loading">Submit</button>
                            ) : (
                                <button className="button is-link" onSubmit={this.handleSubmit}>
                                    Submit
                                </button>
                            )}
                            <button className="button" type="button" onClick={this.handleCloseModal}>
                                Cancel
                            </button>
                        </footer>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: ParentProps) => ({
    isActive: ownProps.isActive,
    close: ownProps.close,
    openRecoverPasswordModalModal: ownProps.openRecoverPasswordModalModal,
    openSignupModal: ownProps.openSignupModal,
    isTransactionLoading: state.auth.isTransactionLoading,
    localErrorMessage: state.auth.localErrorMessage,
    transactionType: state.auth.transactionType,
});

export default connect(mapStateToProps)(LoginModal);
