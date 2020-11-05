import React, { useState } from "react";
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {theme} from '../styles/theme';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: "#7000ff"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: .5,
    },
    tabs: {
        flexGrow: .5,
    }
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
            <Box p={3} style={{backgroundColor: "white", height: "auto"}}>
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const Dashboard = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <>
        <ThemeProvider theme={theme} />
            <div className="div-container">
                <div className={classes.root}>
                    <AppBar position="static" className={classes.root}>
                        <Toolbar>
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <MenuIcon />
                                </IconButton>

                                <Typography variant="h6" className={classes.title}>
                                    Tracker.io
                                </Typography>

                                <Tabs value={value} className={classes.tabs} onChange={handleChange} aria-label="simple tabs example">
                                    <Tab label="Item One" {...a11yProps(0)} />
                                    <Tab label="Item Two" {...a11yProps(1)} />
                                    <Tab label="Item Three" {...a11yProps(2)} />
                                </Tabs>

                                <Button color="inherit">Logout</Button>
                        </Toolbar>
                    </AppBar>

                    <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </div>

            </div>
        <ThemeProvider/>
        </>
    )
}

export default Dashboard;