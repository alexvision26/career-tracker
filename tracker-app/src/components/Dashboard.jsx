import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import {
  Work as WorkIcon,
  LocalActivity as LocalActivityIcon,
  Create as CreateIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  ExitToApp as ExitToAppIcon,
  Receipt as ReceiptIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import CreateJob from "./CreateJob";
import { theme } from "../styles/theme";
import { useHistory } from "react-router-dom";
import JobBoard from "./JobBoard";

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
          {children}
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
                  disabled
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
            <JobBoard />
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
