import React, { Component } from 'react';
import '../styles/form.css';
import '../styles/auth.css';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { authCall } from '../actions';
import { checkEmail } from '../utils';

class SignUp extends Component {

    state = {
        fname: '',
        lname: '',
        email: '',
        currency: '',
        password: '',
        error: null,
        cerror: null,
        loading: false
    }


    constructor(props) {
        super(props);
        this.emailLabel = React.createRef();
        this.passwordLabel = React.createRef();
    }

    componentDidMount() {
        this.setState({
            emailWidth: this.emailLabel.current.offsetWidth,
            passWidth: this.passwordLabel.current.offsetWidth,
        });
    }


    onChange = event => {
        let {name, value, type} = event.target;
        value = type === 'checkbox' ? event.target.checked : value;
        this.setState({[name]: value, error: null, cerror: null});
    }

    formSubmit = async event => {
        event.preventDefault(); 
        const {fname, lname, email, currency, password} = this.state;
        const name = fname + ' ' + lname;
        if (password.length < 6 || !checkEmail(email)) {
            return ;
        }
        if (!currency) {
            return this.setState({cerror: 'Please select currency.'});
        }
        this.setState({loading: true});
        const { error } = await this.props.authCall({name, email, currency, password}, 'signup');
        if (error) {
            if (error.code === 11000) {
                this.setState({error: 'This email is already associated with an account. Please Login.'});
            } else if (error.errors.email) {
                this.setState({error: 'Please provide a valid email.'});
            } else {
                this.setState({error: 'There was an error while signing you up.'});
            }
        }
        this.setState({loading: false});
    }

    onCloseSnackbar = () => {
        this.setState({error: ''});
    }

    render() {
        const {fname, currency, lname, email, password, error, cerror, loading, emailWidth, passWidth} = this.state;
        return (
            <div className="auth-form">
                <Dialog open={loading}>
                    <DialogTitle>Signing Up</DialogTitle>
                    <DialogContent>
                        <DialogActions>
                            <CircularProgress style={{marginRight: 20, marginBottom: 10}} size={40}/>
                            <DialogContentText>Please wait</DialogContentText>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
                <ErrorSnackbar open={!!error} message={error} onClose={this.onCloseSnackbar} />
                <h1>Sign Up</h1>
                <p>Please enter your information</p>
                <form onSubmit={this.formSubmit}>
                    <TextField className="auth-input" variant="outlined" name="fname" id="fname" value={fname} required label="First Name" placeholder="Eg. Sam" onChange={this.onChange}/>
                    <TextField className="auth-input" variant="outlined" name="lname" id="lname" value={lname} required label="Last Name" placeholder="Eg. Smith" onChange={this.onChange}/>
                    
                    <FormControl className="auth-input helper" variant="outlined" error={email.length > 0 && !checkEmail(email)}>
                        <InputLabel ref={this.emailLabel} htmlFor="email">Email *</InputLabel>
                        <OutlinedInput
                        type="email" 
                        name="email" 
                        id="email" 
                        value={email} 
                        labelWidth={emailWidth}
                        required placeholder="Eg. samsmith@email.com" 
                        onChange={this.onChange}
                        />
                        <FormHelperText>Please Provide a Valid Email</FormHelperText>
                    </FormControl>
                    <FormControl className="auth-input helper" variant="outlined" onBlur={this.setBlur} error={password.length > 0 && password.length < 6}>
                        <InputLabel ref={this.passwordLabel} htmlFor="password">Password *</InputLabel>
                        <OutlinedInput
                        type="password" 
                        name="password" 
                        id="password" 
                        value={password} 
                        labelWidth={passWidth}
                        required placeholder="Your password" 
                        onChange={this.onChange}
                        />
                        <FormHelperText>Password must be at-least 6 characters long.</FormHelperText>
                    </FormControl>


                    <FormControl variant="outlined" className="auth-input helper" error={!!cerror}>
                        <InputLabel htmlFor="outlined-age-simple">
                            Currency *
                        </InputLabel>
                        <Select
                        value={currency} 
                        onChange={this.onChange}
                        input={<OutlinedInput labelWidth={90} name="currency" id="currency" />}
                        >
                            <MenuItem value="inr">INR ( ₹ )</MenuItem>
                            <MenuItem value="usd">USD ( $ )</MenuItem>
                            <MenuItem value="eur">EUR ( € )</MenuItem>
                            <MenuItem value="btc">BTC ( ₿ )</MenuItem>
                            <MenuItem value="eth">ETH ( Ξ )</MenuItem>
                        </Select>
                        <FormHelperText>{cerror}</FormHelperText>
                    </FormControl>
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        );
    }
}

export default connect(null, {authCall})(SignUp);
