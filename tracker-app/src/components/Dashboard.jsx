import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import WorkIcon from "@material-ui/icons/Work";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import CreateIcon from "@material-ui/icons/Create";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import SecurityIcon from "@material-ui/icons/Security";
import clsx from "clsx";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CreateJob from "./CreateJob";
import { theme } from "../styles/theme";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fafafa",
    color: "black",
    borderBottom: "1px",
  },
  indicator: {
    backgroundColor: "#7000ff",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0.5,
    fontSize: "1.4rem",
  },
  tabs: {
    flexGrow: 0.5,
  },
  toolBar: {
    boxShadow: "1px 1px 6px rgba(0, 0, 0, 0.151)",
    height: "50px",
  },
  createButton: {
    backgroundColor: "#7000ff",
    color: "white",
    fontSize: ".9rem",
    padding: "7px 15px",
    "&:hover": {
      backgroundColor: "#7000ff",
      color: "white",
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ backgroundColor: "white", height: "auto" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Dashboard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [state, setState] = useState({
    //Side bar open and close state
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [newJob, setNewJob] = useState(false); //Create Job Modal Open State

  const handleOpen = () => {
    setNewJob(true);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const iconMap = (idx) => {
    switch (idx) {
      case 0:
        return <SettingsIcon />;
      case 1:
        return <SecurityIcon />;
      case 2:
        return <ReceiptIcon />;
      case 3:
        return <ExitToAppIcon />;
      default:
    }
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["General", "Security", "Billing", "Logout"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              switch (index) {
                case 0:
                  console.log("general");
                  break;
                case 1:
                  console.log("security");
                  break;
                case 2:
                  console.log("billing");
                  break;
                case 3:
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  history.push("/login");
                  props.handleLogoutClick();
                  break;
                default:
              }
            }}
          >
            <ListItemIcon>{iconMap(index)}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <ThemeProvider theme={theme} />
      <div>
        <React.Fragment key="left">
          <Drawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
      </div>

      <CreateJob newJob={newJob} setNewJob={setNewJob} />

      <div className="div-container">
        <div className={classes.root}>
          <AppBar position="static" className={classes.root}>
            <Toolbar className={classes.toolBar}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>

              <Typography variant="h5" className={classes.title}>
                Tracker.io
              </Typography>

              <Tabs
                value={value}
                className={classes.tabs}
                classes={{ indicator: classes.indicator }}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Board" icon={<WorkIcon />} {...a11yProps(0)} />
                <Tab
                  label="Contacts"
                  icon={<PermContactCalendarIcon />}
                  {...a11yProps(1)}
                />
                <Tab
                  label="Activities"
                  icon={<LocalActivityIcon />}
                  {...a11yProps(2)}
                />
              </Tabs>

              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.createButton}
                startIcon={<CreateIcon />}
                onClick={handleOpen}
              >
                Add New Job
              </Button>
            </Toolbar>
          </AppBar>

          <TabPanel value={value} index={0}>
            Board TEST
          </TabPanel>
          <TabPanel value={value} index={1}>
            Contacts
          </TabPanel>
          <TabPanel value={value} index={2}>
            Activities
          </TabPanel>
        </div>
      </div>
      <ThemeProvider />
    </>
  );
};

export default Dashboard;
