import React, { Component } from 'react';
import { RootState } from '../../../redux/Root';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Form from '../../utils/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { isEmailValid } from '../../utils/Utils';
import { updateEmail } from '../../../redux/actions/AuthActions';
import { AuthTransactionType } from '../../../redux/states/AuthState';

interface Props {
    dispatch: Dispatch<any>;
    user: { email: string; _id: string; verified: boolean } | null | undefined;
    isTransactionLoading: boolean;
    transactionType: AuthTransactionType | null;
}

interface State {
    isEmailValid: boolean;
    email: string;
    isEditionModeEnabled: boolean;
}

class UpdateEmail extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isEmailValid: false,
            email: props.user?.email ? props.user?.email : '',
            isEditionModeEnabled: false,
        };
    }

    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ ...this.state, email: event.target.value, isEmailValid: isEmailValid(event.target.value) });
    };

    handleSubmit = (event?: React.FormEvent<HTMLButtonElement>): void | undefined => {
        if (isEmailValid(this.state.email)) {
            this.props.dispatch(updateEmail(this.state.email));
        }
    };

    handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void | undefined => {
        this.setState({ ...this.state, isEditionModeEnabled: true });
    };

    handleCancelEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void | undefined => {
        this.setState({ ...this.state, isEditionModeEnabled: false });
    };

    componentDidUpdate(prevProps: Props) {
        if (
            prevProps.isTransactionLoading &&
            !this.props.isTransactionLoading &&
            this.props.transactionType === AuthTransactionType.UPDATE_EMAIL
        ) {
            this.setState({ ...this.state, isEditionModeEnabled: false });
        }
    }

    render() {
        const showEmailErrorTips: boolean = this.state.email !== this.props.user?.email && !this.state.isEmailValid;
        const showEmailSuccessTips: boolean = this.state.email !== this.props.user?.email && this.state.isEmailValid;

        const isDisabled = !isEmailValid(this.state.email);
        let submitClass = 'button is-link ';
        if (this.props.isTransactionLoading && this.props.transactionType === AuthTransactionType.UPDATE_EMAIL) {
            submitClass += 'is-loading';
        }
        return (
            <div>
                <h2 className="subtitle">Update your email</h2>
                <Form onSubmit={this.handleSubmit}>
                    <div className="columns">
                        <div className="column">
                            {!this.state.isEditionModeEnabled ? (
                                <div>{this.props.user?.email}</div>
                            ) : (
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className={
                                            showEmailErrorTips
                                                ? 'input is-danger'
                                                : showEmailSuccessTips
                                                ? ' input is-success'
                                                : 'input'
                                        }
                                        type="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleEmailChange}
                                    />
                                    <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                    {showEmailErrorTips && (
                                        <span className="icon is-small is-right">
                                            <FontAwesomeIcon icon={faExclamationTriangle} />
                                        </span>
                                    )}
                                    {showEmailSuccessTips && (
                                        <span className="icon is-small is-right">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                    )}
                                    {showEmailErrorTips && <p className="help is-danger">This email is invalid</p>}
                                    {showEmailSuccessTips && <p className="help is-success">This email is valid</p>}
                                </div>
                            )}
                        </div>
                        <div className="column">
                            {!this.state.isEditionModeEnabled && (
                                <button className="button" type="button" onClick={this.handleEdit}>
                                    Edit
                                </button>
                            )}
                            {this.state.isEditionModeEnabled && (
                                <div>
                                    <button
                                        className={submitClass}
                                        disabled={isDisabled}
                                        style={{ marginRight: '5px' }}
                                    >
                                        Submit
                                    </button>
                                    <button className="button" type="button" onClick={this.handleCancelEdit}>
                                        Cancel
                                    </button>
                                </div>
                            )}
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
    user: state.auth.user,
});

export default connect(mapStateToProps)(UpdateEmail);
