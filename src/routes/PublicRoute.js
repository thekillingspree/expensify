import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PublicRoute = ({component: Component, user, ...rest}) => {
    return (
        <Route {...rest} render={props => 
            user.token ? 
            (<Redirect to={{
                pathname: '/dashboard',
                state: {from: props.location}
            }} />) : (<Component {...props} />) 
        } />
    );
}

const mapStateToProps = ({user}) => {
    return {user}
}

export default connect(mapStateToProps)(PublicRoute);