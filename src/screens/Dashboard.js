import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '../components/Appbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styles from '../styles/Dashboard.module.css';

class Dashboard extends Component {
    render() {
        const {history} = this.props;
        return (
            <div>
                <AppBar title="Dashboard" />
                <h1>Dashboard</h1>
                <Fab color="primary" className="fab"  onClick={() => history.push('/create')}>
                    <AddIcon />
                </Fab>
            </div>
        )
    }
}

export default withRouter(Dashboard);
