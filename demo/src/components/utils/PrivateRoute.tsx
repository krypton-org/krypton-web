import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../redux/Root';
import { notify } from '../../redux/actions/NotifyActions';
import { Severity } from '../../redux/states/NotifState';

const PrivateRoute: React.FC<any> = ({ children, isLoggedIn, dispatch, ...rest }: any) => {
    const computeStatus = (): boolean => {
        if (isLoggedIn) {
            return true;
        } else {
            dispatch(
                notify({
                    message: 'Please log-in',
                    date: new Date(),
                    type: Severity.WARNING,
                    title: 'Error',
                }),
            );
            return false;
        }
    };

    return (
        <Route
            {...rest}
            render={({ location }) =>
                computeStatus() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

const mapStateToProps = (state: RootState) => ({
    isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
