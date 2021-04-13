import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function UserProfile() {
  const [fullname, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const classes = useStyles();
  const historia = useHistory();

  function handleSave() {
    if (localStorage.getItem(fullname) == [email, password]) {
      alert("Usuario ya registrado");
    } else {
      if (password === confirmPassword) {
        localStorage.setItem(fullname, [email, password]);
        historia.push("/");
      } else {
        alert("Las contraseñas no coinciden");
      }
    }
  }
  
  function handleBack() {
	  historia.push("/");
  }

  function handleFullNameChange(e) {
    setFullName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }
  

  return (
    <div className={classes.root}>
	<Container fixed>
	<Grid
		  container
          direction="row"
          justify="flex-start"
          alignItems="baseline"
          spacing={3}
		  >
		  <Button onClick={handleBack}>
			<ArrowBackIcon style={{ fontSize: 50}}/>
		  </Button>
		  </Grid>
		 </Container>
      <h1 style={{ fontSize: "60px" }}>Registration</h1>
      <Grid container direction="column" justify="center" alignItems="center">
        <PersonIcon style={{ fontSize: 120 }} />
      </Grid>
      <Container maxWidth="sm">
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TextField
              required
              id="standard-required"
              //label="Label"
              style={{ margin: 8 }}
              placeholder="Full name"
              onChange={handleFullNameChange}
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
              id="standard-required"
              //label="Label"
              style={{ margin: 8 }}
              placeholder="email"
              onChange={handleEmailChange}
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
              id="standard-required"
              //label="Label"
              type="password"
              style={{ margin: 8 }}
              placeholder="password"
              onChange={handlePasswordChange}
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
              id="standard-required"
              //label="Label"
              type="password"
              style={{ margin: 8 }}
              placeholder="confirm password"
              onChange={handleConfirmPasswordChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Container>
    </div>
  );
}

export default UserProfile;
