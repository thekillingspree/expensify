import React, { Component } from 'react'
import AppBar from '../components/Appbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Check';
import styles from '../styles/CreateExpense.module.scss';

class CreateExpense extends Component {
    render() {
        return (
            <div>
                <AppBar title="Create Entry" />
                <Fab color="primary" className="fab success">
                    <AddIcon />
                </Fab>
                <h1>Create Expense</h1>
            </div>
        )
    }
}

export default CreateExpense;
