import React from "react";
import { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Login } from "./Login";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: "white",
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    align: "left",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  avatar: {
    backgroundColor: "red",
    alignSelf: "center",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 480,
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function DefaultPage(props) {
  const classes = useStyles();
  const historia = useHistory();
  const [originalInformation, setOriginalInformation] = React.useState([]);
  const [reciveInfo, setReciveInfo] = React.useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openSelect, setOpenSelect] = React.useState(false);
  const [statusSelect, setStatusSelect] = React.useState("");
  const [responsable, setResponsable] = React.useState("");
  const [date, setDate] = React.useState("");

  const LoginView = () => <Login />;

  let query = useQuery();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={localStorage.getItem("sesion")}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {
                    localStorage
                      .getItem(localStorage.getItem("sesion"))
                      .split(",")[0]
                  }
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Router>
        <List alignItems="bottom">
          <div>
            <ListItem alignItems="center" button onClick={handleLogOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
            <ListItem alignItems="center" button onClick={handleOpen}>
              <ListItemIcon>
                <FilterListIcon />
              </ListItemIcon>
              <ListItemText primary="Task Filters" />
            </ListItem>
          </div>
        </List>
      </Router>
    </div>
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectOpen = () => {
    setOpenSelect(true);
  };

  const handleSelectClose = () => {
    setOpenSelect(false);
  };

  function handleResponsableModalChange(e) {
    setResponsable(e.target.value);
  }

  function handleStatusModalChange(e) {
    setStatusSelect(e.target.value);
  }

  function handleDateModalChange(e) {
    setDate(e.target.value);
  }

  const bodyModal = (
    <div style={modalStyle} className={classes.paper}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <h1 style={{ fontSize: "50px" }}>TASK FILTERS</h1>
      </Grid>
      <Container maxWidth="sm">
        <Grid
          containter
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <TextField
              required
              value={responsable}
              id="standard-required"
              style={{ margin: 8 }}
              placeholder="Responsable"
              onChange={handleResponsableModalChange}
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
              open={openSelect}
              onClose={handleSelectClose}
              onOpen={handleSelectOpen}
              value={statusSelect}
              onChange={handleStatusModalChange}
            >
              <MenuItem value={"Ready"}>Ready</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Done"}>Done</MenuItem>
            </Select>
          </FormControl>
          <br></br>
          <br></br>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={date}
              id="date"
              label="Due date"
              type="date"
              className={classes.textField}
              onChange={handleDateModalChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <br></br>
          <br></br>
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
          <br></br>
          <br></br>
          <Button variant="contained" onClick={handleClearAll}>
            Clear All
          </Button>
        </Grid>
      </Container>
    </div>
  );

  function handleApply() {
    const filterList = reciveInfo;
    const filterListReady = [];
    for (var i = 0; i < reciveInfo.length; i++) {
      if (
        filterList[i].respons == responsable &&
        filterList[i].stat == statusSelect &&
        filterList[i].fech == date
      ) {
        filterListReady.push(filterList[i]);
      } else if (responsable == "" && statusSelect != "" && date != "") {
        if (filterList[i].stat == statusSelect && filterList[i].fech == date) {
          filterListReady.push(filterList[i]);
        }
      } else if (responsable != "" && statusSelect == "" && date != "") {
        if (
          filterList[i].respons == responsable &&
          filterList[i].fech == date
        ) {
          filterListReady.push(filterList[i]);
        }
      } else if (responsable != "" && statusSelect != "" && date == "") {
        if (
          filterList[i].respons == responsable &&
          filterList[i].stat == statusSelect
        ) {
          filterListReady.push(filterList[i]);
        }
      } else if (responsable != "" && statusSelect == "" && date == "") {
        if (filterList[i].respons == responsable) {
          filterListReady.push(filterList[i]);
        }
      } else if (responsable == "" && statusSelect != "" && date == "") {
        if (filterList[i].stat == statusSelect) {
          filterListReady.push(filterList[i]);
        }
      } else if (responsable == "" && statusSelect == "" && date != "") {
        if (filterList[i].fech == date) {
          filterListReady.push(filterList[i]);
        }
      }
    }
    console.log(filterListReady);
    setReciveInfo(filterListReady);
  }

  function handleClearAll() {
    setReciveInfo(originalInformation);
    setResponsable("");
    setStatusSelect("");
    setDate("");
  }

  function handleLogOut() {
    localStorage.removeItem("sesion");
    historia.push("/");
  }

  function handleClick() {
    historia.push("/newtask");
  }

  const location = useLocation();
  const listaInformacion = [];
  const catchInformation = useEffect(() => {
    try {
      setOriginalInformation(location.state.detail);
      setReciveInfo(location.state.detail);
      console.log(location.state.detail);
    } catch (e) {
      console.log("Primer llamado");
    }
  }, [location]);
  const dynamicList = reciveInfo.map((elemento) => (
    <Grid item key="1" xs={12} sm={6} md={4}>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h2">
            {elemento.descripcion}
          </Typography>
          <Typography variant="body2" component="p">
            <br></br>
            {elemento.stat} - {elemento.fech}
          </Typography>
          <br></br>
          <Typography variant="h5" component="h2">
            {elemento.respons}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ));
  
  const [isFirstgetTask, setFirstgetTask] = React.useState(true);
  function getTask(){
	  setFirstgetTask(false)
	  fetch("https://ieti-task-api-function.azurewebsites.net/api/list-tasks?code=a4Ub/qbDWpYd8KMwlxhc8ISHrOw33XBcWuKp7Heq2xifpgeuKtELiQ==")
		.then(res => res.json())
		.then(
			(result) => {
				const lista = []
				for(var i=0;i<result.length;i++){
					var tarea = {
						descripcion: result[i].title,
						stat: result[i].status,
						fech: result[i].dueDate,
						respons: result[i].responsable
					};
					lista.push(tarea);
				}
				setReciveInfo(lista);
			}
		)
  }
  
  return (
    <React.Fragment>
	  {isFirstgetTask ? getTask() : console.log("")}
      <h1>{reciveInfo.stat}</h1>
      <CssBaseline />
      <div align="left">
        <Button onClick={toggleDrawer("left", true)}>Menú</Button>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </div>
      <div className={useStyles().heroContent}>
        <Container>
          <Typography align="center" color="textPrimary" gutterBottom>
            <h1 style={{ fontSize: "60px" }}>Tasks</h1>
          </Typography>
        </Container>
      </div>
      <Container className={useStyles().cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {dynamicList}
        </Grid>
        <br></br>
        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="flex-end"
        >
          <Fab
            color="primary"
            aria-label="add"
            className="useStyles().fab"
            onClick={handleClick}
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {bodyModal}
        </Modal>
      </Container>
    </React.Fragment>
  );
}

export default DefaultPage;
