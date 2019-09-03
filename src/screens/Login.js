import React, { Component } from 'react';
import '../styles/form.css';
import '../styles/auth.css';
import TextField from '@material-ui/core/TextField';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { authCall } from '../actions';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: null,
        loading: false
    }

    onChange = event => {
        let {name, value} = event.target;
        this.setState({[name]: value});
    }

    formSubmit = async event => {
        event.preventDefault(); 
        const { email, password} = this.state;

        if (password.length < 6) {
            return this.setState({error: 'Password must be at least 6 characters long.'});
        }

        this.setState({loading: true});
        const { error } = await this.props.authCall({email, password}, 'login');
        console.log(error);
        this.setState({loading: false});
    }

    onCloseSnackbar = () => {
        this.setState({error: ''});
    }

    render() {
        const {email, password, error, loading} = this.state;
        return (
            <div className="auth-form">
                <Dialog open={loading}>
                    <DialogTitle>Logging In</DialogTitle>
                    <DialogContent>
                        <DialogActions>
                            <CircularProgress style={{marginRight: 20, marginBottom: 10}} size={40}/>
                            <DialogContentText>Please wait</DialogContentText>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
                <ErrorSnackbar open={!!error} message={error} onClose={this.onCloseSnackbar} />
                <h1>Login</h1>
                <form onSubmit={this.formSubmit}>
                    <TextField className="auth-input" variant="outlined" type="email" name="email" id="email" value={email} label="Email" required placeholder="Eg. samsmith@email.com" onChange={this.onChange}/>
                    <TextField className="auth-input" variant="outlined" type="password" name="password" id="password" value={password} label="Password" required placeholder="At least 6 characters" error={password.length > 0 && password.length < 6} pattern=".{6,}" title="6 characters minimum" onChange={this.onChange}/>
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default connect(null, {authCall})(Login);
