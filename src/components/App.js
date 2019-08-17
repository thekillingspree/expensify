import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import { Provider } from 'react-redux';
import store from '../store';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<div>
					<p>Expensify</p>
				</div>
			</Provider>
		)
	}
}

export default App;