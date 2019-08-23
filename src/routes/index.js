import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../screens/Home';
import About from '../screens/About';
import SignUp from '../screens/SignUp';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/signup" component={SignUp} />
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;
