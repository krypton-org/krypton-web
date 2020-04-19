import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

interface State {
    email: string;
}

interface Props {
    isActive: boolean;
    close: (e: React.MouseEvent<Element, MouseEvent>) => void;
    recoverPassword: (email: string, password: string) => Promise<void>;
}

export default class RecoverPasswordsModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void | undefined => {
        this.setState({ email: event.target.value })
    };

    render() {
        return (
            <div className={this.props.isActive ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Recover your password</p>
                        <button className="delete" aria-label="close" onClick={this.props.close}></button>
                    </header>
                    <section className="modal-card-body">
                        <div>
                            Enter your address below, and we’ll email you instructions for setting a new password.
                        </div>
                        <div className="field" style={{ marginTop: "10px" }}>
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
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-link">Submit</button>

                        <button className="button" onClick={this.props.close}>Cancel</button>
                    </footer>
                </div>
            </div>)
    }
}
