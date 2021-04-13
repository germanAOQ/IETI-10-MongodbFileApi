import React from "react";
import logo from './logo.svg';
import './App.css';
import {Login} from './Login'
import DefaultPage from './DefaultPage';
import NewTask from "./NewTask";
import UserProfile from "./UserProfile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const LoginView = () => (
	<Login />	
);

const DefaultPageView = () => (
	<DefaultPage />
);

function App() {
  return (
    <div className="App">
	  <Router>
		<div>
		  <ul>
		  </ul>

		  <hr />

		  <Route exact path="/" component={LoginView} />
		  <Route path="/inicio" component={DefaultPageView} />
		  <Route path="/newtask" component={NewTask} />
		  <Route path="/registro" component={UserProfile} />
		</div>
	  </Router>
    </div>
  );
}

export default App;
