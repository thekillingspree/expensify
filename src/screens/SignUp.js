import React, { Component } from 'react';
import '../styles/form.css';
import '../styles/auth.css';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { signUpCall } from '../actions';

class SignUp extends Component {

    state = {
        fname: '',
        lname: '',
        email: '',
        currency: '',
        password: '',
        error: null,
        loading: false
    }

    onChange = event => {
        let {name, value, type} = event.target;
        value = type === 'checkbox' ? event.target.checked : value;
        console.log(name, value)
        this.setState({[name]: value});
    }

    formSubmit = async event => {
        event.preventDefault(); 
        const {fname, lname, email, currency, password} = this.state;
        const name = fname + ' ' + lname;
        if (password.length < 6) {
            return this.setState({error: 'Password must be at least 6 characters long.'});
        }
        if (!currency) {
            return this.setState({error: 'Please select currency.'});
        }
        this.setState({loading: true});
        const { error } = await this.props.signUpCall({name, email, currency, password});
        if (error) {
            if (error.code === 11000) {
                this.setState({error: 'This email is already associated with an account. Please Login.'});
            } else if (error.errors.email) {
                this.setState({error: 'Please provide a valid email.'});
            }
        }
        this.setState({loading: false});
    }

    onCloseSnackbar = () => {
        this.setState({error: ''});
    }

    render() {
        const {fname, currency, lname, email, password, error, loading} = this.state;
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
                    <TextField className="auth-input" variant="outlined" type="email" name="email" id="email" value={email} label="Email" required placeholder="Eg. samsmith@email.com" onChange={this.onChange}/>
                    <TextField className="auth-input" variant="outlined" type="password" name="password" id="password" value={password} label="Password" required placeholder="At least 6 characters" error={password.length > 0 && password.length < 6} pattern=".{6,}" title="6 characters minimum" onChange={this.onChange}/>
                    <FormControl variant="outlined" className="auth-input">
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
                    </FormControl>
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        );
    }
}

export default connect(null, {signUpCall})(SignUp);
