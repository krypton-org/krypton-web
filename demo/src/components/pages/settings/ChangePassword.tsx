import React, { Component } from 'react';
import { RootState } from '../../../redux/Root';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Form from '../../utils/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { isPasswordValid } from '../../utils/Utils';
import { changePassword } from '../../../redux/actions/AuthActions';
import { AuthTransactionType } from '../../../redux/states/AuthState';

interface Props {
    dispatch: Dispatch<any>;
    isTransactionLoading: boolean;
    transactionType: AuthTransactionType | null;
}

interface State {
    isPasswordValid: boolean;
    actualPassword: string;
    newPassword: string;
}

class ChangePassword extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isPasswordValid: false,
            actualPassword: '',
            newPassword: '',
        };
    }

    handleActualPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ ...this.state, actualPassword: event.target.value });
    };

    handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            ...this.state,
            newPassword: event.target.value,
            isPasswordValid: isPasswordValid(event.target.value),
        });
    };

    handleSubmit = (event?: React.FormEvent<HTMLButtonElement>): void | undefined => {
        if (isPasswordValid(this.state.newPassword)) {
            this.props.dispatch(changePassword(this.state.actualPassword, this.state.newPassword));
        }
    };

    render() {
        const showPasswordErrorTips: boolean = this.state.newPassword !== '' && !this.state.isPasswordValid;
        const showPasswordSuccessTips: boolean = this.state.newPassword !== '' && this.state.isPasswordValid;

        const isDisabled = !isPasswordValid(this.state.newPassword) && this.state.actualPassword !== '';
        let submitClass = 'button is-link ';
        if (this.props.isTransactionLoading && this.props.transactionType === AuthTransactionType.CHANGE_PASSWORD) {
            submitClass += 'is-loading';
        }
        return (
            <div>
                <h2 className="subtitle">Change your password</h2>
                <Form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className="columns">
                        <div className="column">
                            <div className="control has-icons-left has-icons-right" style={{ marginBottom: '15px' }}>
                                <input
                                    autoComplete="off"
                                    className="input"
                                    type="password"
                                    placeholder="Actual password"
                                    value={this.state.actualPassword}
                                    onChange={this.handleActualPasswordChange}
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    autoComplete="off"
                                    className={
                                        showPasswordErrorTips
                                            ? 'input is-danger'
                                            : showPasswordSuccessTips
                                            ? ' input is-success'
                                            : 'input'
                                    }
                                    type="password"
                                    placeholder="New password"
                                    value={this.state.newPassword}
                                    onChange={this.handleNewPasswordChange}
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                {showPasswordErrorTips && (
                                    <span className="icon is-small is-right">
                                        <FontAwesomeIcon icon={faExclamationTriangle} />
                                    </span>
                                )}
                                {showPasswordSuccessTips && (
                                    <span className="icon is-small is-right">
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                )}
                                {showPasswordErrorTips && <p className="help is-danger">This password is invalid</p>}
                                {showPasswordSuccessTips && <p className="help is-success">This password is valid</p>}
                            </div>
                        </div>
                        <div className="column">
                            <button className={submitClass} disabled={isDisabled}>
                                Submit
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    isTransactionLoading: state.auth.isTransactionLoading,
    transactionType: state.auth.transactionType,
});

export default connect(mapStateToProps)(ChangePassword);
