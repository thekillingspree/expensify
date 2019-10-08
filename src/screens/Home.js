import React, { Component } from 'react';
import qs from 'qs';
import '../styles/home.scss';
import { Link } from 'react-router-dom';
import bg from '../img/budget.jpg';
import SimpleDialog from '../components/SimpleDialog';
class Home extends Component {

    state = {
        verification: false,
    }

    componentDidMount() {
        let {search} = this.props.location
        search = qs.parse(search, {ignoreQueryPrefix: true});
        if (search.v) {
            this.setState({verification: true});
        }
    }

    render() {
        return (
            <div>
                <img src={bg} alt="Expenses" className="full-img" />
                <div className="overlay"></div>
                <SimpleDialog 
                open={this.state.verification}
                title="Successfully Verified Email"
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
