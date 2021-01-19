import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import Paper from "@material-ui/core/Paper";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import firebase from "../../../firebase";
let db = firebase.firestore();
//
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    backgroundColor: theme.palette.background.paper,
    cursor: "pointer",
  },
  paper: {
    textAlign: "center",
    backgroundColor: "#ecf4fd",
  },
  hover: {
    backgroundColor: "red",
  },
}));
//
function Doctor() {
  const classes = useStyles();
  //
  const [doctor, setdoctor] = useState([]);
  useEffect(() => {
    db.collection("Main_user")
      .get()
      .then((result) => {
        if (result) {
          result.forEach((data) => {
            setdoctor((old) => [...old, data.data()]);
          });
        }
      });
  }, []);
  return (
    <div>
      {doctor.length > 0
        ? doctor.map((d, index) => {
            return (
              <Paper key={index} className={classes.root}>
                <NavLink to={`/chatboard/${d.User}`}>
                  <List hover>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={d.User} src={d.User_Img} />
                      </ListItemAvatar>
                      <ListItemText primary={d.User_Name} />
                    </ListItem>
                  </List>
                </NavLink>
              </Paper>
            );
          })
        : "...Loading"}
    </div>
  );
}

export default Doctor;
