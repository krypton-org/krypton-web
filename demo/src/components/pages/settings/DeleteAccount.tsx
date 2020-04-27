import React, { Component } from 'react';
import { RootState } from '../../../redux/Root';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DeleteAccountModal from '../../modals/DeleteAccountModal';

interface Props {
    dispatch: Dispatch<any>;
}

interface State {
    deleteAccountModal: boolean;
}

class DeleteAccount extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            deleteAccountModal: false,
        };
    }

    handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void | undefined => {
        this.setState({ deleteAccountModal: true });
    };

    closeModals = (e?: React.MouseEvent<Element, MouseEvent>) => {
        this.setState({ deleteAccountModal: false });
    };

    render() {
        return (
            <div className="columns" style={{ marginTop: '50px' }}>
                <div className="column is-half">
                    <article className="message is-danger">
                        <div className="message-header">
                            <p>Danger Zone</p>
                        </div>
                        <div className="message-body">
                            <button className="button is-danger is-outlined" onClick={this.handleClick}>
                                Delete account
                            </button>
                        </div>
                    </article>
                </div>
                <DeleteAccountModal isActive={this.state.deleteAccountModal} close={this.closeModals} />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(DeleteAccount);
