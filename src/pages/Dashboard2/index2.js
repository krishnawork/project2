import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Page1 from "./Componet/Page1";
import Dashboard from "./Componet/Dashboard/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { Adduseremail } from "../action/action";
import Button from "@material-ui/core/Button";
import Logo from "../../assets/images/logo.png";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  user: {
    color: "white",
    marginRight: theme.spacing(2),
  },
  btn: {
    marginRight: theme.spacing(2),
  },
  logo: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function ResponsiveDrawer(props) {
  useEffect(() => {
    setpage(<Dashboard />);
  }, []);
  let history = useHistory();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={() => setpage(<Dashboard />)}>
          <ListItemText primary="DASHBOARD"></ListItemText>
        </ListItem>
        {/* <ListItem button>
          <ListItemText primary="TEST REPORTS"></ListItemText>
        </ListItem> */}
        <ListItem button>
          <ListItemText primary="CLINICAL PROGRESS"></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText primary="SESSION HISTORY"></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText primary="FEEDBACK"></ListItemText>
        </ListItem>
        <ListItem button>
          <Link to="/chatboard">
            <ListItemText primary="Chatboard"></ListItemText>
          </Link>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  // My work
  const [page, setpage] = useState();
  //

  return (
    <>
      <div
        className={classes.root}
        style={{
          position: "absolute",
          width: "100%",
          minHeight: "100vh",
          backgroundSize: "cover",
          zIndex: 100000,
          backgroundColor: "White",
        }}
      >
        <div
          className={classes.logo}
          style={{
            position: "fixed",
            backgroundColor: "black",
            top: "0px",
            left: "7px",
            textAlign: "center",
            padding: "6px",
            zIndex: 10000,
            width: "220px",
            cursor: "pointer",
          }}
          onClick={() => {
            history.push(`/`);
          }}
        >
          <img
            src={Logo}
            alt=""
            style={{ width: "130px", height: "45px", margin: "0px" }}
          />
        </div>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => {
                history.push(`/services`);
              }}
            >
              Services
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => {
                history.push(`/programs`);
              }}
            >
              Programs
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => {
                history.push(`/self-test`);
              }}
            >
              Self-Tests
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => {
                history.push(`/paid-test`);
              }}
            >
              Paid-Tests
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => {
                history.push(`/profile`);
              }}
            >
              my profile
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => {
                history.push(`/consultant`);
              }}
            >
              Our Experts
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => {
                history.push(`/corporate-counselling`);
              }}
            >
              For Corporates
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => {
                history.push(`/blog`);
              }}
            >
              Blog
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() => {
                history.push(`/gift`);
              }}
            >
              Gift Hapiness
            </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {page}
        </main>
      </div>
    </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
