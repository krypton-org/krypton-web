import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Form from '../utils/Form'
import { connect } from "react-redux";
import { RootState } from '../../redux/Root';
import { removeModalsErrorMessages, deleteAccount } from '../../redux/actions/AuthActions';
import { Dispatch } from "redux";

interface ParentProps {
    isActive: boolean;
    close: (e?: React.MouseEvent<Element, MouseEvent>) => void;
}

interface ReduxProps {
    deleteAccountError: string | null;
    isDeleteAccountLoading: boolean;
    isActive: boolean;
    dispatch: Dispatch<any>;
}

interface Props extends ParentProps, ReduxProps { }

interface State {
    password: string;
}

class LoginModal extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { password: '' }
    }

    handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void | undefined => {
        this.setState({ ...this.state, password: event.target.value })
    };

    handleSubmit = (event?: React.FormEvent<HTMLButtonElement>): void | undefined => {
        this.props.dispatch(deleteAccount(this.state.password));
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
                            <p className="modal-card-title">Delete account</p>
                            <button type="button" className="delete" aria-label="close" onClick={this.props.close}></button>
                        </header>
                        <section className="modal-card-body">
                            {this.props.deleteAccountError !== null &&
                                <div className="notification is-danger">
                                    <button type="button" className="delete" onClick={this.handleNotificationClick}></button>
                                    {this.props.deleteAccountError}
                                </div>
                            }
                            <div className="field">
                                <label className="label">Enter your password</label>
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
                        </section>
                        <footer className="modal-card-foot">
                            {this.props.isDeleteAccountLoading ?
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
    close: ownProps.close,
    isDeleteAccountLoading: state.auth.isDeleteAccountLoading,
    deleteAccountError: state.auth.deleteAccountError,
});
export default connect(mapStateToProps)(LoginModal);