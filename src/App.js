import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Dimensions, Text } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import {
	Scene,
	Router,
	Stack,
} from 'react-native-router-flux';

import configureStore from './store';

import Home from './components/Home';
import Login from './components/Login';

const store = configureStore();

class App extends Component {

	constructor() {
		super();

		this.state = {
			loading: true,
		};
	}

	componentWillMount() {
		persistStore(store, {
			storage: AsyncStorage,
		}, () => {
			this.setState({
				loading: false,
			});
		});
	}

	render() {
		return (
			<Provider store={store}>
				<Router>
					<Stack key="root">
						<Scene key="login" component={Login} hideNavBar />
						<Scene key="home" component={Home} />
					</Stack>
				</Router>
			</Provider>
		);
	}
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	body: {
		minHeight: height,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});

export default App;