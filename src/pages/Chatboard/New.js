import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import "./new.css";
import Doctor from "./Componet/newcomponet/Doctor";
import ChatRoom from "./Componet/newcomponet/ChatRoom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "90%",
    margin: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    backgroundColor: "#9196b5",
  },
}));

function New() {
  const { docter_name } = useParams();
  const [User, setuser] = useState();
  const [page, setpage] = useState(<Doctor />);
  const [page2, setpage2] = useState(null);
  const classes = useStyles();
  //
  useEffect(() => {
    if (localStorage.getItem("userData") !== null) {
      let user = JSON.parse(localStorage.getItem("userData"));
      setuser(user.first_name);
    } else {
      // alert("Please Login Account");
      // window.location.assign("/");
    }
  }, []);

  useEffect(() => {
    if (docter_name) {
      setpage2(<ChatRoom />);
    }
  }, [docter_name]);

  //

  return (
    <div style={{ marginBottom: "50px" }}>
      <div
        className="direction_column flexCenter"
        style={{
          justifyContent: "flex-end",
          textAlign: "center",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          height: "240px",
        }}
      ></div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid container item sm={12} className="chatbox_container">
            {/*  */}
            <Grid
              item
              container
              sm={1}
              justify="center"
              className="sidebox_firstbox"
            >
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item style={{ marginBottom: "20px" }}>
                  <Avatar alt={User} src="/static/images/avatar/1.jpg" />
                </Grid>
                <Grid item style={{ marginBottom: "20px" }}>
                  <NavLink exact to="/chatboard" className="link_test">
                    <Paper>
                      <ChatBubbleIcon />
                    </Paper>
                  </NavLink>
                </Grid>
                <Grid item style={{ marginBottom: "20px" }}>
                  <Link to="/chatboard" className="link_test">
                    <Paper>
                      <LocalGroceryStoreIcon />
                    </Paper>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            {/*  */}

            <Grid
              container
              item
              sm={3}
              justify="center"
              className="sidebox_secondbox"
            >
              <Grid container direction="column" justify="flex-start">
                <Grid item className="doctor_hading">
                  <h5>Doctor List</h5>
                </Grid>
                {page}
                {/* <Grid item>jkldfj</Grid>
                <Grid item>jkldfj</Grid>
                <Grid item>jkldfj</Grid>
                <Grid item>jkldfj</Grid> */}
              </Grid>
            </Grid>
            <Grid item container sm={8} className="sidebox_thiredbox">
              <Grid container direction="column" justify="flex-start">
                <Grid item className="doctor_hading"></Grid>
                {page2}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default New;
