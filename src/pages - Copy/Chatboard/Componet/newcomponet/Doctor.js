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
import backgroundImage from "../../../../assets/images/header-back.jpg";
import "./Doctor.css";
let db = firebase.firestore();
//
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    cursor: "pointer",
  },
  paper: {
    textAlign: "center",
  },
  hover: {
    backgroundColor: "red",
  },
}));
//
function Doctor({ setdocter_name }) {
  const classes = useStyles();
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
  }, [setdocter_name]);
  let showdocter_chat = (docter_name, id) => {
    if (docter_name) {
      doctor.map((d, k) => {
        if ("x" + k === id) {
          document.querySelector("#" + id).classList.add("click_color");
        } else {
          document.querySelector("#x" + k).classList.remove("click_color");
        }
      });
      // e.target.style.backgroundColor = "pink";
      setdocter_name(docter_name);
    }
  };
  return (
    <div>
      {doctor.length > 0
        ? doctor.map((d, index) => {
            return (
              <Paper
                key={index}
                id={"x" + index}
                className="abhikeliye"
                style={{ color: "white" }}
              >
                <List
                  hover="true"
                  onClick={(e) => showdocter_chat(d.User, "x" + index)}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt={d.User} src={d.User_Img} />
                    </ListItemAvatar>
                    <ListItemText primary={d.User_Name} />
                  </ListItem>
                </List>
              </Paper>
            );
          })
        : ""}
    </div>
  );
}

export default Doctor;
