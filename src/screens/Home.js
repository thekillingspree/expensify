import React, { Component } from 'react';
import qs from 'qs';
import '../styles/home.scss';
import { Link } from 'react-router-dom';
import bg from '../img/budget.jpg';
import SimpleDialog from '../components/SimpleDialog';
class Home extends Component {

    state = {
        verification: null,
        verificationMessage: '',
    }

    componentDidMount() {
        let {search} = this.props.location
        search = qs.parse(search, {ignoreQueryPrefix: true});
        console.log(search.v)
        this.setState({verification: search.v === 'true', verificationMessage: search.msg});
    }

    render() {
        return (
            <div>
                <img src={bg} alt="Expenses" className="full-img" />
                <div className="overlay"></div>
                <SimpleDialog 
                open={this.state.verification === true}
                title="Email Verified."
                msg={this.state.verificationMessage}
                onSuccessMessage="Login"
                onSuccess={() => this.props.history.push('/login')}
                />
                <SimpleDialog 
                open={this.state.verification === false}
                title="Email Verification failed."
                msg={this.state.verificationMessage}
                onSuccessMessage="Login"
                onSuccess={() => this.props.history.push('/login')}
                />
                <nav>
                    <h1>Expense.ly</h1>
                    <div className="hamburger">
                        <ul>
                            <Link className="li" to="/signup">Signup</Link>
                            <Link className="li" to="/login">Login</Link>
                            <Link className="li" to="/faq">FAQ</Link>
                            <Link className="li" to="/About">About</Link>
                        </ul>
                    </div>
                </nav>
                <div className="hero">
                    <h1>Expense.ly</h1>
                    <p>Track your daily expenses.</p>
                    <Link className="btn" to="/signup">Get Started</Link>
                </div>
            </div>
        );
    }
}

export default Home;
