import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
//import Link from '@material-ui/core/Link';
import DefaultPage from './DefaultPage'
import {BrowserRouter as Router, Route, Link, useLocation} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import UserList from "./UserList"


const useStyles = makeStyles((theme) => ({
	  root: {
		flexGrow: 1,
	  },
	  paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	  },
	}));	



export class Login extends React.Component{
	
	render(){
		return(
			<CenteredGrid />
		);
	}
}

const DefaultPageView = () => (
	<DefaultPage />
	);
	

function CenteredGrid(){	
	const classes = useStyles();
	const historia = useHistory();
	const [username, setUsername] = useState(0);
	const [password, setPassword] = useState(0);
	const [userList, setUserList] = useState([]);
	const [first, setFirst] = useState(true);
	
	
	function handleClick(){
		if(localStorage.getItem(username)!= null){
			let cadenaDatos = localStorage.getItem(username).split(",");
			let isLogin = cadenaDatos[1] === password;
			if(isLogin){
				localStorage.setItem("sesion",username);
				historia.push("/inicio");
			}
		}else{
				alert("Usuario no registrado, oprima el botón Create Account");
			}
	}
	
	function handleTextChange(e){
		setUsername(e.target.value);
	}

	function handlePasswordChange(e){
		setPassword(e.target.value);
	}
	
	function makeRegistro(){
		//localStorage.setItem(username,password);
		//alert("Usuario registrado satisfactoriamente");
		historia.push("/registro");
	}
	
	
	function componentDidMount() {
		setFirst(false);
        fetch("http://ieti-backend-taskplanner.eastus.azurecontainer.io:8080/users")
            .then(response => response.json())
            .then(data => {
                let usersList = [];
                data.forEach(function (user) {
					usersList.push(user);

                });
                setUserList(usersList)
            });
    }
	
		return(
			  <Container maxWidth="sm">
				{first ? componentDidMount():console.log("No first")}
				{localStorage.setItem("userIETI",["userIETI@mail.com", "passwordIETI"])}
				  <div className={classes.root}>
					   <Grid container
							  direction="column"
							  justify="center"
							  alignItems="center"
							  spacing={3}>
						<Grid item xs={12}>
							<h1>Task Planner</h1>
						</Grid>
						<Grid item xs={12}>
								<AssignmentIcon style={{ fontSize: 200, align:"center"}}/>
						</Grid>
					</Grid>
					<Grid container
						  direction="column"
						  justify="space-evenly"
						  alignItems="stretch"
						  spacing={3}>
						<Grid item xs={12}>
							<TextField
							  required
							  id="standard-required"
							  //label="Label"
							  style={{ margin: 8 }}
							  placeholder="Username"
							  onChange={handleTextChange}
							  //helperText="Full width!"
							  fullWidth
							  margin="normal"
							  InputLabelProps={{
								shrink: true,
							  }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
							  required
							  id="standard-full-width"
							  //label="Label"
							  type="password"
							  style={{ margin: 8 }}
							  placeholder="Password"
							  onChange={handlePasswordChange}
							  //helperText="Full width!"
							  fullWidth
							  margin="normal"
							  InputLabelProps={{
								shrink: true,
							  }}
							/>

						</Grid>
					</Grid>
					<Grid
					  container
					  direction="column"
					  justify="center"
					  alignItems="stretch"
					  spacing={3}>
										<Button variant="contained" color="white" to="/inicio" onClick={handleClick}>
										  Login
										</Button>
						<Grid item xs={12}>
							<Router>
								<div>
									<Link to="/registro" onClick = {makeRegistro}>
										  <h1>Create Account</h1>
										</Link>
									
								</div>
							</Router>
						</Grid>
					</Grid>
					</div>
					<div>
						<Grid container
					  direction="column"
					  justify="center"
					  alignItems="stretch"
					  spacing={3}>
						<h1>Some of our users</h1>
						<UserList lista={userList} />
						</Grid>
					</div>
				</Container>

		);
	}
