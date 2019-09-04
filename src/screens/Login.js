import React, { Component } from 'react';
import '../styles/form.scss';
import '../styles/auth.scss';
import TextField from '@material-ui/core/TextField';
import Snackbar from '../components/Snackbar';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import { authCall } from '../actions';
import { checkEmail } from '../utils';
import LoadingDialog from '../components/LoadingDialog';

class Login extends Component {

    state = {
        email: '',
        password: '',
        emailWidth: 0,
        passWidth: 0,
        blur: null,
        error: null,
        errorInput: null,
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
        let {name, value} = event.target;
        this.setState({[name]: value});
        console.log(checkEmail(this.state.email));
    }

    formSubmit = async event => {
        event.preventDefault(); 
        const { email, password} = this.state;

        if (password.length < 6) {
            return ;
        }

        if (!checkEmail(email)) {
            return ;
        }

        this.setState({loading: true});
        const { error } = await this.props.authCall({email, password}, 'login');
        if (error) {
            this.setState({error});
        }
        this.setState({loading: false});
    }

    onCloseSnackbar = () => {
        this.setState({error: ''});
    }

    setBlur = e => {
        this.setState({blur: e.target.name});
    }

    render() {
        const {email, password, error, loading, emailWidth, passWidth, blur} = this.state;
        return (
            <div className="auth-form">
                <LoadingDialog open={loading} title="Logging In" msg="Please Wait" />
                <Snackbar 
                open={!!error} 
                message={error} 
                variant="info"
                onClose={this.onCloseSnackbar} />
                <h1>Login</h1>
                <form onSubmit={this.formSubmit}>
                    <FormControl className="auth-input helper" variant="outlined" onBlur={this.setBlur} error={email.length > 0 && !checkEmail(email)}>
                        <InputLabel ref={this.emailLabel} htmlFor="email">Email</InputLabel>
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
                        <InputLabel ref={this.passwordLabel} htmlFor="password">Password</InputLabel>
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
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default connect(null, {authCall})(Login);
