import React, { Component } from 'react'
import { connect } from 'react-redux'
import Appbar from '../components/Appbar'
import { Container } from '@material-ui/core'
import styles from '../styles/AllExpenses.module.scss';
import ExpenseTable from '../components/ExpenseTable';

class AllExpenses extends Component {
    render() {
        return (
            <article>
                <Appbar title="All Entries" />
                <Container className={styles.container}>
                    <h1>Your Entries</h1>
                    <ExpenseTable expenses={this.props.expenses} />
                </Container>
            </article>
        )
    }
}

const mapStateToProps = ({expenses}) => ({
    expenses
});

const mapDispatchToProps = {
    
} 

export default connect(mapStateToProps, mapDispatchToProps)(AllExpenses)
