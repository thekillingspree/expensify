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
import { greet, displayAmount, resendMail } from '../utils';
import { updateProfile } from '../actions/user';
import LoadingDialog from '../components/LoadingDialog';
import Snackbar from '../components/Snackbar';

class Dashboard extends Component {

    state = {
        sendingEmail: false,
        sendingFailed: false,
        emailResult: '',
        emailSent: false
    }

    constructor (props) {
        super(props);

        this.sendMail = this.sendMail.bind(this);
    }

    componentDidMount() {
        this.props.updateProfile();
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
        const {sendingEmail, sendingFailed, emailResult, emailSent} = this.state;
        return (
            <div>
                <AppBar title="Dashboard" />
                <LoadingDialog open={sendingEmail} title="Sending Email"/>
                <Snackbar 
                open={sendingFailed || emailSent}
                variant={emailSent ? "success": "error"}
                message={emailResult}
                onClose={this.onSnackbarClose}
                />
                <Tooltip title="Add Expense">
                    <Fab color="primary" className="fab"  onClick={() => history.push('/create')}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <Container className="container">
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
                    <h1>{greet()} {user.name}</h1>
                    <div className={styles.balanceCard}>
                        <h2>Current Balance</h2>
                        <p className={user.balance > 0 ? styles.pos: styles.neg}>{displayAmount(user.currency, user.balance)}</p>
                    </div>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => {
    return {user}
}

export default withRouter(connect(mapStateToProps, {updateProfile})(Dashboard));
