import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import { Provider } from 'react-redux';
import store from '../store';
import AppRouter from '../routes';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<AppRouter />
			</Provider>
		)
	}
}

export default App;