import React from 'react';
import UpdateEmail from './UpdateEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

export default () => {
    return (
        <div className="container">
            <h1 className="title">Settings</h1>
            <UpdateEmail />
            <ChangePassword />
            <DeleteAccount />
        </div>
    );
};
