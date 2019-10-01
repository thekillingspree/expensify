import React from 'react';
import './styles/App.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from './store';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppRouter from './routes';
import { connect } from 'react-redux'

const color = store.getState().theme.color;
console.log('Theme Color', color);

let Layout = ({theme: {color, darkMode}}) => {
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: color,
				light: color,
				dark: color,
			},
			type: darkMode ? "dark" : "light"
		},
		typography: {
			fontFamily: "'Poppins', sans-serif"
		}
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<PersistGate persistor={persistor}>
				<AppRouter />
			</PersistGate>
		</ThemeProvider>
	)
}

Layout = connect(({theme}) => ({theme}))(Layout)

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Layout />
			</Provider>
		)
	}
}

export default App;