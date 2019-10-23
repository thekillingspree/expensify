import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import { toTitleCase, displayAmount } from '../utils';

import MaterialTable from 'material-table';


class ExpenseTable extends Component {
    render() {
        let expenses = Array.from(this.props.expenses);
        console.log(expenses == this.props.expenses, "SAME");
        expenses = expenses.map(expense => {
            expense = {...expense}
            expense.fDate = moment(expense.date).format('Do MMMM, YYYY');
            expense.type = toTitleCase(expense.type);
            expense.dvalue = displayAmount(this.props.currency, expense.value);
            return expense;
        });
        return (
            <MaterialTable 
                style={{marginTop: 20}}
                title=""
                columns={[
                    {title: 'Title', field: 'title'},
                    {title: 'Amount', field: 'dvalue', type: "string", filtering: false, customSort: (a, b) => {
                        const valA = parseFloat(a.dvalue.split(" ")[1]);
                        const valB = parseFloat(b.dvalue.split(" ")[1]);
                        return valA - valB
                    }},
                    {title: 'Type', field: 'type', sorting: false, filtering: false},
                    {title: 'Date', field: 'fDate', filtering: false, customSort: (a,b) => {
                        const one = moment(a.date);
                        const two = moment(b.date);
                        return one.diff(two);
                    }},
                ]}
                data={expenses}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete Entry',
                        onClick: (event, data) => {
                            this.props.deleteExpense(data._id);
                        }
                    }
                ]}
                onRowClick={(event, rowData) => {
                    this.props.history.push(`/expense/${rowData._id}`)
                }}

                options  = {{
                    filtering: true,
                    exportButton: true,
                    exportFileName: `expensify-report-${moment().format('DD/MM/YYYY')}`,
                    pageSize: 20,
                    actionsColumnIndex: -1
                }}
            />
        )
    }
}

export default withRouter(ExpenseTable)
