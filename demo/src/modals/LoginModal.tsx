import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { isEmailValid, isPasswordValid } from '../utils/Utils';
import Form from '../utils/Form'


interface Props {
    isActive: boolean;
    close: (e?: React.MouseEvent<Element, MouseEvent>) => void;
    openRecoverPasswordModalModal: (e: React.MouseEvent<Element, MouseEvent>) => void;
    openSignupModal: (e: React.MouseEvent<Element, MouseEvent>) => void;
    login: (email: string, password: string) => Promise<void>;
}

interface State {
    error: String | null,
    email: string;
    password: string;
}

export default class LoginModal extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { error: null,  password: '', email: ''}
    }

    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void | undefined => {
        this.setState({...this.state, email: event.target.value})
    };

    handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void | undefined => {
        this.setState({...this.state, password: event.target.value})
    };

    handleSubmit = (event?: React.FormEvent<HTMLButtonElement>): void | undefined => {
        this.submitAsync()
    }

    submitAsync = async (): Promise<void> => {
        try {
            await this.props.login(this.state.email, this.state.password);
            this.props.close();
        } catch (err) {
            this.setState({...this.state, error: err.message})
        }
    }

    handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void | undefined => {
        this.setState({...this.state, error: null})
    }

    render() {
        return (
            <div className={this.props.isActive ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <Form onSubmit={this.handleSubmit}>
                        <header className="modal-card-head">
                            <p className="modal-card-title">Log in</p>
                            <button className="delete" aria-label="close" onClick={this.props.close}></button>
                        </header>
                        <section className="modal-card-body">
                            {this.state.error !== null &&
                                <div className="notification is-danger">
                                    <button className="delete" onClick={this.handleNotificationClick}></button>
                                    {this.state.error}
                                </div>
                            }

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
                            <a href="#" onClick={this.props.openRecoverPasswordModalModal}>Password forgotten?</a>
                            <hr />
                            <div style={{ textAlign: "center" }}>No account yet? <a href="#" onClick={this.props.openSignupModal}>Sign up</a>.</div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-link" onSubmit={this.handleSubmit}>Submit</button>

                            <button className="button" onClick={this.props.close}>Cancel</button>
                        </footer>
                    </Form>

                </div>
            </div>)
    }
}