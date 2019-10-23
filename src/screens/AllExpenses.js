import React, { Component } from 'react';
import { connect } from 'react-redux';
import Appbar from '../components/Appbar';
import { Container } from '@material-ui/core';
import styles from '../styles/AllExpenses.module.scss';
import ExpenseTable from '../components/ExpenseTable';
import LoadingDialog from '../components/LoadingDialog';
import { deleteExpense } from '../actions';
import Snackbar from '../components/Snackbar';

class AllExpenses extends Component {

    state = {
        deleting: false,
        message: false,
        error: false
    }

    deleteExpense = async id =>  {
        this.setState({deleting: true, message: false, error: false});
        const error = await this.props.deleteExpense(id);
        this.setState({deleting: false, message: true, error});
    }

    render() {
        const {error, message} = this.state;
        return (
            <article>
                <Appbar title="All Entries" />
                <Snackbar 
                open={message} 
                variant={error ? 'error' : 'success'} 
                onClose={() => {
                    this.setState({message: false, error: false});
                }}
                message={error ? 'There was an error deleting the expense.' : 'Expense Deleted successfully.'}/>
                <LoadingDialog open={this.state.deleting} title="Deleting Entry"/>
                <Container className={styles.container}>
                    <h1>Your Entries</h1>
                    <ExpenseTable 
                    deleteExpense={this.deleteExpense}
                    currency={this.props.user.currency} 
                    expenses={this.props.expenses} />
                </Container>
            </article>
        )
    }
}

const mapStateToProps = ({expenses, user}) => ({
    expenses, user
});

const mapDispatchToProps = {
    deleteExpense
} 

export default connect(mapStateToProps, mapDispatchToProps)(AllExpenses)
