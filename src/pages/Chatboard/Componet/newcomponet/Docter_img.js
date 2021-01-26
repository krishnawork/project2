import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import firebase from "../../../firebase";
import SendMessaj from "./SendMessaj";

let db = firebase.firestore();
let message;
function Docter_img({ id }) {
  const [docter, setdocter] = useState();
  const [chat, setchat] = useState(null);
  const [Message, setmessage] = useState("Docter Not Connected");
  useEffect(() => {
    if (id) {
      db.collection("Main_user")
        .doc(id)
        .get()
        .then((result) => {
          if (result) {
            setdocter(result.data());
            console.log("ddfdfdfdf", result.data());
          }
        });
    }
    return () => {};
  }, [id]);

  useEffect(() => {
    db.collection("web_user")
      .doc(localStorage.getItem("email"))
      .collection("ChatRoom")
      .where("Docter_email", "==", id)
      .limit(1)
      .onSnapshot((result) => {
        if (!result.empty) {
          result.forEach((d) => {
            setchat(d.data().StartChat);
          });
        } else {
          db.collection("web_user").doc(id).collection("ChatRoom").doc(id).set({
            StartChat: "start",
            Docter_email: id,
          });
        }
      });
  }, [id]);

  useEffect(() => {
    if (chat === "stop") {
      message = "hide";
      setmessage("Docter Connected");
    }
    if (chat === "start") {
      if (message === "hide") {
        setmessage("Docter Not Connected");
        message = "false";
      }
    }
  }, [chat, id]);
  return (
    <>
      {docter ? (
        <h6>
          <Avatar
            alt={docter.User}
            src={docter.User_Img}
            style={{ marginRight: "10px", marginTop: "5px" }}
          />
        </h6>
      ) : (
        ""
      )}
      {docter ? <h6 style={{ fontWeight: "bold" }}>{docter.User_Name}</h6> : ""}
      {/* <Avatar alt={docter.User} src={docter.User_Img} />; */}
      <h6
        style={{ position: "absolute", right: "10px", top: "13px" }}
        variant="contained"
        color="primary"
      >
        {Message}
      </h6>
    </>
  );
}

export default Docter_img;
