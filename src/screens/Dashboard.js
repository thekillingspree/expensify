import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {PieChart, Pie, Cell, Tooltip as ToolTip, Label} from 'recharts';
import AppBar from '../components/Appbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import styles from '../styles/Dashboard.module.scss';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { displayAmount, resendMail } from '../utils';
import { updateProfile, getExpenses } from '../actions';
import LoadingDialog from '../components/LoadingDialog';
import Snackbar from '../components/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import RecentCard from '../components/RecentCard';
import { success, red } from '../constants';

class Dashboard extends Component {

    state = {
        sendingEmail: false,
        sendingFailed: false,
        emailResult: '',
        emailSent: false,
        loaded: false,
        income: 0,
        expense: 0,
        created: false
    }

    constructor (props) {
        super(props);
        this.sendMail = this.sendMail.bind(this);
    }

    async componentDidMount() {
        await this.props.updateProfile();
        await this.props.getExpenses();
        let income = 0, expense = 0;
        this.props.expenses.forEach(ex => {
            if (ex.type === 'expense') {
                expense += ex.value
            } else {
                income += ex.value;
            }
        })
        this.setState({loaded: true, income, expense});
        console.log(this.props.expenses);
    }

    async sendMail() {
        console.log('clicked');
        try {
            this.setState({sendingEmail: true});
            const result = await resendMail();
            console.log(result);
            this.setState({sendingEmail: false, emailResult: result, emailSent: true});
        } catch (error) {
            this.setState({sendingFailed: true, sendingEmail: false, emailSent: false, emailResult: error.message});
        }
    }

    onSnackbarClose = () => {
        this.setState({sendingFailed: false, emailSent: false});
    }

    getSummaryData = () => {
        let {income, expense} = this.state;
        let total = income + expense;
        let result = [
            {
                name: 'Income',
                value: 0
            },
            {
                name: 'Expense',
                value: 0
            }
        ]
        if (total === 0) return result;
        result[0].value = income;
        result[1].value = expense;
        return result
            .map(e => ({...e, value: parseFloat((e.value * (100 / total)).toFixed(2))}))
    }

    render() {
        const {history, user} = this.props;
        const {sendingEmail, 
            sendingFailed, 
            emailResult,
            emailSent, 
            income, 
            expense,
            created,
            loaded} = this.state;
        const summary = this.getSummaryData();
        console.log(summary)
        return (
            <div className="container">
                <AppBar title="Dashboard" />
                <LoadingDialog open={sendingEmail} title="Sending Email"/>
                <Snackbar 
                open={sendingFailed || emailSent}
                variant={emailSent ? "success": "error"}
                message={emailResult}
                onClose={this.onSnackbarClose}
                />
                <Snackbar 
                open={created}
                variant={"success"}
                message={`Added successfully.`}
                onClose={() => this.setState({created: false})}
                />
                <Tooltip title="Add Expense">
                    <Fab color="primary" className="fab"  onClick={() => history.push('/create')}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                {!loaded &&
                    <div style={{width: '100%', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <CircularProgress style={{marginRight: 20, marginBottom: 10}} size={60}/>
                    </div>
                }
                {loaded && <Container className={styles.main}>
                    {!user.isVerified &&
                        <div className={styles.info}>
                            <InfoIcon className={styles.warnIcon}/>
                            <div className={styles.warnMessage}>
                                <h3>It seems like you've not confirmed your email address.</h3>
                                <p>Please verify your email address to start using Expensify.</p>
                                <Button onClick={this.sendMail} variant="outlined" style={{marginTop: 10}}>
                                    RESEND CONFIRMATION
                                </Button>    
                            </div>
                        </div>
                    }
                    
                    <section className={styles.balanceCard}>
                        <div>
                            <h2>Balance</h2>
                            <h1 className={user.balance >= 0 ? "pos": "neg"}>{displayAmount(user.currency, user.balance)}</h1>
                            <div className={styles.types}>
                                <div>
                                    <h2>Income</h2>
                                    <p className="pos">{displayAmount(user.currency, income)}</p>
                                </div>
                                <div>
                                    <h2>Expenses</h2>
                                    <p className="neg">{displayAmount(user.currency, expense)}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <PieChart width={300} height={300}>
                                <ToolTip />
                                <Pie 
                                cx={150}
                                cy={150}
                                fill={success}
                                outerRadius={90}
                                innerRadius={60}
                                labelLine={false}
                                label
                                data={summary}>
                                   <Cell stroke={success} key="cell-0" fill={success} />
                                   <Cell stroke={red} key="cell-1" fill={red} />
                                </Pie>
                            </PieChart>
                        </div>
                    </section>
                    <section className={styles.recentEntries}>
                        <h2>Recent Entries</h2>
                        <p>Your last 5 entries</p>
                        {this.props.expenses.slice(0,5).map(exp => <RecentCard expense={exp} currency={user.currency}/>)}
                        <Button disabled={this.props.expenses.length <= 0} style={{margin: '40px 0'}} variant="outlined" color="primary" onClick={() => {
                            history.push('/expenses')
                        }}>View All Expenses</Button>
                    </section>
                </Container>}
            </div>
        )
    }
}

const mapStateToProps = ({user, expenses}) => {
    return {user, expenses}
}

export default withRouter(connect(mapStateToProps, {updateProfile, getExpenses})(Dashboard));
