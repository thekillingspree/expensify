import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import { toTitleCase } from '../utils';
import styles from '../styles/AllExpenses.module.scss';

class ExpenseTable extends Component {
    render() {
        const {expenses} = this.props;
        return (
            <div>
                <Paper className={styles.tableRoot}> 
                    <Table className={styles.table}>
                        <TableHead>
                            <TableCell className={styles.header}>Title</TableCell>
                            <TableCell className={styles.header}>Amount</TableCell>
                            <TableCell className={styles.header}>Type</TableCell>
                            <TableCell className={styles.header}>Date</TableCell>
                        </TableHead>
                        <TableBody>
                            {
                                expenses.map(expense => (
                                    <TableRow key={expense.date}>
                                        <TableCell>{expense.title}</TableCell>
                                        <TableCell>{expense.value}</TableCell>
                                        <TableCell>{toTitleCase(expense.type)}</TableCell>
                                        <TableCell>{moment(expense.date).format('Do MMMM, YYYY')}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default ExpenseTable
