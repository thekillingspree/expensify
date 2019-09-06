import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
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
                    
                    <div className={styles.balanceCard}>
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
                </Container>}
            </div>
        )
    }
}

const mapStateToProps = ({user, expenses}) => {
    return {user, expenses}
}

export default withRouter(connect(mapStateToProps, {updateProfile, getExpenses})(Dashboard));
