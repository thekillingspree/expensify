import React, { Component } from 'react';
import '../styles/form.css';
import '../styles/auth.css';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';


class SignUp extends Component {


    state = {
        fname: '',
        lname: '',
        email: '',
        currency: '',
        password: '',
        error: null,
    }

    onChange = event => {
        let {name, value, type} = event.target;
        value = type === 'checkbox' ? event.target.checked : value;
        console.log(name, value)
        this.setState({[name]: value});
    }

    formSubmit = event => {
        event.preventDefault(); 
        console.log('form submitted.');
        const {fname, lname, email, currency, password, error} = this.state;
    }

    render() {
        const {fname, currency, lname, email, password, error} = this.state;
        return (
            <div className="auth-form">
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

export default SignUp;
