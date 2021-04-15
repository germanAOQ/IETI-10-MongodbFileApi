import React, { useState } from "react";
import axios from 'axios';
import "./NewTask.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120,
  },
  
}));

const lista = [];

function NewTask() {
  const classes = useStyles();
  const [description, setDescription] = useState(0);
  const [responsable, setResponsable] = useState(0);
  const [status, setStatus] = React.useState("");
  const [fecha, setFecha] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(0);
  let [stringFile, setStringFile] = React.useState([]);
  
  const [elementos, setElementos] = React.useState([]);
	
  const historia = useHistory();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleTextChange(e) {
    setDescription(e.target.value);
  }

  function handleResponsableChange(e) {
    setResponsable(e.target.value);
  }

  function handleDateChange(e) {
    setFecha(e.target.value);
  }
  function handleInputChange(e) {
	  setFile(e.target.files[0]);
  }

  function handleSubmit() {
    alert('A name was submitted');
	let data = new FormData();
	data.append("file", file);
	
	
	//Save image
	axios.post('http://localhost:8080/api/files', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then(function (response){
		setStringFile(response.data);
		console.log(stringFile);
	}).catch(function (error){
		console.log(error);
	})
	
	//Save Todo
	let respuesta = {
	"description": description,
    "priority": 5,
    "dueDate": fecha,
    "responsible": {"name": responsable, "email":responsable+"@mail.com"},
    "status": status, 
    "fileUrl": stringFile
	}
	
	const options = {
		method: "POST",
		headers: { 'Content-Type' : 'application/json'},
		data: JSON.stringify(respuesta),
		url: "http://localhost:8080/api/todo"
	};
	axios(options).then(function (response) {
			console.log("file uploaded!", response);
		})
	.catch(function (error){
		console.log("failed file upload", error);
	});
	
  }
  
  function handleListChange(e) {
	  lista.push({descripcion:description, respons:responsable, stat:status, fech:fecha, imageURL: stringFile})
	  const respuesta = {
		"body": {
		"title": description,
		"priority": status,
		"dueDate": fecha,
		"responsable": responsable
		}
	  }
	  const requestOptions = {
		  method: "POST",
		  headers: { 'Content-Type' : 'application/json'},
		  body: JSON.stringify(respuesta)
	  };
	  fetch("https://ieti-task-api-function.azurewebsites.net/api/add-task?code=1LhDrhAXuocvBjeCgO3h0JDFL1DVi6BcAx0mYH7zYBpFEoykLpqnzQ==", requestOptions)
			.then(response => response.json())
			.then(data => console.log(data));
	  historia.push({
		pathname: "/inicio",
		state : { detail: lista }
	  });
	  
  }
  
  function handleBack() {
	  historia.push("/inicio");
  }

  return (
  <div>
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
    <Container maxWidth="sm">
      
	 
        <h1 style={{ fontSize: "100px" }}>New Task</h1>
        <div>
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
                style={{ margin: 8 }}
                placeholder="Description"
                onChange={handleTextChange}
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
                style={{ margin: 8 }}
                placeholder="Responsable"
                onChange={handleResponsableChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={status}
                onChange={handleStatusChange}
              >
                <MenuItem value={"Ready"}>Ready</MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Done"}>Done</MenuItem>
              </Select>
            </FormControl>
            <Grid item xs={12}>
              <TextField
                id="date"
                label="Due date"
                type="date"
                className={classes.textField}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
			<br></br>
		    <input type="file" id="file" onChange={handleInputChange} />
		    <input type="submit" value="Submit" onClick={handleSubmit}/>
			<Grid	
								container
								direction="column"
								justify="flex-end"
								alignItems="flex-end">
								<Fab color="primary" aria-label="add" className="useStyles().fab" onClick={handleListChange}>
								  <CheckCircleIcon />
								</Fab>
							</Grid>
          </Grid>
        </div>
      
    </Container>
	</div>
  );
}

export default NewTask;
