import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { RootState } from '../../redux/Root';
import Form from '../utils/Form'
import { recoverPassword, removeModalsErrorMessages } from '../../redux/actions/AuthActions';
import { Dispatch } from "redux";

interface ParentProps {
    isActive: boolean;
    close: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

interface ReduxProps {
    isRecoverPasswordLoading: boolean;
    recoverPasswordError: string | null;
    dispatch: Dispatch<any>;
}

interface State {
    email: string;
}

interface Props extends ParentProps, ReduxProps { }

class RecoverPasswordsModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void | undefined => {
        this.setState({ email: event.target.value })
    };

    handleSubmit = (event?: React.FormEvent<HTMLButtonElement>): void | undefined => {
        this.props.dispatch(recoverPassword(this.state.email));
    }

    handleNotificationClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void | undefined => {
        this.props.dispatch(removeModalsErrorMessages());
    }

    render() {
        return (
            <div className={this.props.isActive ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <Form onSubmit={this.handleSubmit}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">Recover your password</p>
                        <button type="button" className="delete" aria-label="close" onClick={this.props.close}></button>
                    </header>
                    <section className="modal-card-body">
                        {this.props.recoverPasswordError !== null &&
                            <div className="notification is-danger">
                                <button type="button" className="delete" onClick={this.handleNotificationClick}></button>
                                {this.props.recoverPasswordError}
                            </div>
                        }
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
                        {this.props.isRecoverPasswordLoading ?
                            <button className="button is-link is-loading">Submit</button>
                            :
                            <button className="button is-link" onSubmit={this.handleSubmit}>Submit</button>
                        }
                        <button className="button" type="button" onClick={this.props.close}>Cancel</button>
                    </footer>
                    </Form>
                </div>
            </div>)
    }
}

const mapStateToProps = (state: RootState, ownProps: ParentProps) => ({
    isActive: ownProps.isActive,
    close: ownProps.close,
    isRecoverPasswordLoading: state.auth.isRecoverPasswordLoading,
    recoverPasswordError: state.auth.recoverPasswordError,
});

export default connect(mapStateToProps)(RecoverPasswordsModal);