import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import Login from '../components/Login';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/Login" component={Login} />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
