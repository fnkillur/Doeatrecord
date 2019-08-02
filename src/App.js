import 'core-js/stable';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {hot} from "react-hot-loader";
import './App.scss';
import {UserProvider} from './contexts/UserContext';
import Login from './pages/auth/Login';
import Main from './pages/main/Main';
import List from './pages/diary/List';
import Map from './pages/diary/Map';
import Stats from './pages/diary/Stats';

const App = () => {
	
	const [user, setUser] = useState({
		id: null,
		nickname: null,
		token: null
	});
	
	return (
		<UserProvider value={{user, setUser}}>
			<Router>
				<Route exact path="/" component={Login}/>
				<Route path="/main" component={Main}/>
				<Route path="/list" component={List}/>
				<Route path="/map" component={Map}/>
				<Route path="/stats" component={Stats}/>
			</Router>
		</UserProvider>
	);
};

export default hot(module)(App);