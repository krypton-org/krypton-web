import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { isEmailValid, isPasswordValid } from '../utils/Utils';
import Form from '../utils/Form'


interface Props {
    isActive: boolean;
    close: (e?: React.MouseEvent<Element, MouseEvent>) => void;
    openloginModal: (e: React.MouseEvent<Element, MouseEvent>) => void;
    register: (email: string, password: string) => Promise<void>;
}


interface State {
    error: String | null,
    isEmailValid: boolean;
    isPasswordValid: boolean;
    email: string;
    password: string;
}

export default class SignUpModal extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            error: null,
            isEmailValid: false,
            isPasswordValid: false,
            email: '',
            password: ''
        }
    }

    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ ...this.state, email: event.target.value, isEmailValid: isEmailValid(event.target.value) })
    }

    handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ ...this.state, password: event.target.value, isPasswordValid: isPasswordValid(event.target.value) })
    };

    handleSubmit = (event?: React.FormEvent<HTMLButtonElement>): void | undefined => {
        this.submitAsync()
    }

    submitAsync = async (): Promise<void> => {
        try {
            await this.props.register(this.state.email, this.state.password);
            this.props.close();
        } catch (err) {
            this.setState({...this.state, error: err.message})
        }
    }

    handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void | undefined => {
        this.setState({...this.state, error: null})
    }

    render() {
        const showEmailErrorTips: boolean = this.state.email != '' && !this.state.isEmailValid;
        const showEmailSuccessTips: boolean = this.state.email != '' && this.state.isEmailValid;
        const showPasswordErrorTips: boolean = this.state.password != '' && !this.state.isPasswordValid;
        const showPasswordSuccessTips: boolean = this.state.password != '' && this.state.isPasswordValid;

        return (
            <div className={this.props.isActive ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <Form onSubmit={this.handleSubmit}>
                        <header className="modal-card-head">
                            <p className="modal-card-title">Sign up</p>
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
                                        className={(showEmailErrorTips) ? "input is-danger" : (showEmailSuccessTips) ? " input is-success" : "input"}
                                        type="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleEmailChange}
                                    />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                    {showEmailErrorTips &&
                                        <span className="icon is-small is-right">
                                            <FontAwesomeIcon icon={faExclamationTriangle} />
                                        </span>
                                    }
                                    {showEmailSuccessTips &&
                                        <span className="icon is-small is-right">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                    }
                                </div>
                                {showEmailErrorTips &&
                                    <p className="help is-danger">This email is invalid</p>
                                }
                                {showEmailSuccessTips &&
                                    <p className="help is-success">This email is valid</p>
                                }
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className={(showPasswordErrorTips) ? "input is-danger" : (showPasswordSuccessTips) ? " input is-success" : "input"}
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                    />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                    {showPasswordErrorTips &&
                                        <span className="icon is-small is-right">
                                            <FontAwesomeIcon icon={faExclamationTriangle} />
                                        </span>
                                    }
                                    {showPasswordSuccessTips &&
                                        <span className="icon is-small is-right">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                    }
                                </div>
                                {showPasswordErrorTips &&
                                    <p className="help is-danger">This password is invalid</p>
                                }
                                {showPasswordSuccessTips &&
                                    <p className="help is-success">This password is valid</p>
                                }
                            </div>
                            Already have an account? <a href="#" onClick={this.props.openloginModal}>log in</a>.
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-link">Submit</button>

                            <button className="button" onClick={this.props.close}>Cancel</button>
                        </footer>
                    </Form>
                </div>
            </div>)
    }
}