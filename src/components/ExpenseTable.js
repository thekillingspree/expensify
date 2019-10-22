import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import { toTitleCase, displayAmount } from '../utils';
import styles from '../styles/AllExpenses.module.scss';
import MaterialTable from 'material-table';

class ExpenseTable extends Component {
    render() {
        let expenses = [...this.props.expenses];
        expenses = expenses.map(expense => {
            expense.fDate = moment(expense.date).format('Do MMMM, YYYY');
            expense.type = toTitleCase(expense.type);
            expense.value = displayAmount(this.props.currency, expense.value);
            return expense;
        });
        // return (
        //     <div>
        //         <Paper className={styles.tableRoot}> 
        //             <Table className={styles.table}>
        //                 <TableHead>
        //                     <TableCell className={styles.header}>Title</TableCell>
        //                     <TableCell className={styles.header}>Amount</TableCell>
        //                     <TableCell className={styles.header}>Type</TableCell>
        //                     <TableCell className={styles.header}>Date</TableCell>
        //                 </TableHead>
        //                 <TableBody>
        //                     {
        //                         expenses.map(expense => (
        //                             <TableRow key={expense.date}>
        //                                 <TableCell>{expense.title}</TableCell>
        //                                 <TableCell>{expense.value}</TableCell>
        //                                 <TableCell>{toTitleCase(expense.type)}</TableCell>
        //                                 <TableCell>{moment(expense.date).format('Do MMMM, YYYY')}</TableCell>
        //                             </TableRow>
        //                         ))
        //                     }
        //                 </TableBody>
        //             </Table>
        //         </Paper>
        //     </div>
        // )
        return (
            <MaterialTable 
                style={{marginTop: 20}}
                title=""
                columns={[
                    {title: 'Title', field: 'title'},
                    {title: 'Amount', field: 'value', type: "string", filtering: false, customSort: (a, b) => {
                        console.log(typeof a);
                        const valA = parseFloat(a.value.split(" ")[1]);
                        const valB = parseFloat(b.value.split(" ")[1]);
                        return valA - valB
                    }},
                    {title: 'Type', field: 'type', sorting: false, filtering: false},
                    {title: 'Date', field: 'fDate', customSort: (a,b) => {
                        const one = moment(a.date);
                        const two = moment(b.date);
                        return one.diff(two);
                    }},
                ]}
                data={expenses}
                options  = {{
                    filtering: true
                }}
            />
        )
    }
}

export default ExpenseTable
