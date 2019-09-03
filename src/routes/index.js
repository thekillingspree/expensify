import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../screens/Home';
import About from '../screens/About';
import SignUp from '../screens/SignUp';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import CreateExpense from '../screens/CreateExpense';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <PublicRoute path="/signup" component={SignUp} />
                    <PublicRoute path="/login" component={Login} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <PrivateRoute path="/create" component={CreateExpense} />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
