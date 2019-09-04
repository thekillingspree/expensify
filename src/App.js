import React from 'react';
import './styles/App.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from './store';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppRouter from './routes';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#c0392b',
			light: '#c0392b',
			dark: '#c0392b',

		},
		secondary: {
			main: '#f1c40f'
		}
	},
	typography: {
		fontFamily: "'Poppins', sans-serif"
	}
});

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<PersistGate persistor={persistor}>
						<AppRouter />
					</PersistGate>
				</ThemeProvider>
			</Provider>
		)
	}
}

export default App;