/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../../firebase";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import "./SendMessaj.css";
let db = firebase.firestore();
let store = firebase.storage();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper1: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    fontWeight: "Bold",
    backgroundColor: "#7b1fa2",
  },
  paper2: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    fontWeight: "Bold",
    backgroundColor: "#689f38",
    overflowWrap: "break-word",
  },
  main_container: {
    padding: "10px",
    height: "80vh",
    // border: "2px solid black",
    overflow: "auto",
  },
  type_container: {
    position: "absolute",
    bottom: "1px",
  },
  type_message: {
    width: "100%",
  },
  sendbtn: {
    height: "100%",
  },
  emojibtn: {
    height: "100%",
  },
}));

function SendMessaj({ id }) {
  const classes = useStyles();
  const [text, settext] = useState("");
  const [showemoji, setshowemoji] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  function Send() {
    let Msg = document.querySelector("#your-msg").value;
    let intery = Msg.replace(/ /g, "");
    if (intery.length > 0) {
      db.collection("web_user")
        .doc(localStorage.getItem("email"))
        .collection("ChatRoom")
        .doc(id)
        .collection("Chat_Store")
        .add({
          TimeNow: firebase.firestore.FieldValue.serverTimestamp(),
          Email: localStorage.getItem("email"),
          Chat_Text: Msg,
        })
        .then(() => {
          document.querySelector("#your-msg").value = null;
          settext("");
          //   done++;
        });
    }
  }

  let handleChange = (e) => {
    settext(e.target.value);
    setshowemoji(false);
  };

  let addEmoji = (e) => {
    let emoji = e.native;
    settext(text + emoji);
  };

  let Showemoji = () => {
    setshowemoji(!showemoji);
  };
  let Showfileselect = () => {
    document.querySelector("#fileLoader").click();
  };

  let filedetails = async (e) => {
    const file = e.target.files[0];
    const storageRef = store.ref(
      `/Chat_Image/${localStorage.getItem("email")}`
    );
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    // setFileUrl(await fileRef.getDownloadURL());
    console.log(file);
    if (
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/png"
    ) {
      db.collection("web_user")
        .doc(localStorage.getItem("email"))
        .collection("ChatRoom")
        .doc("krushnkantv1@gmail.com")
        .collection("Chat_Store")
        .add({
          TimeNow: firebase.firestore.FieldValue.serverTimestamp(),
          Email: localStorage.getItem("email"),
          ImageFile: await fileRef.getDownloadURL(),
        })
        .then((r) => {});
    } else {
      db.collection("web_user")
        .doc(localStorage.getItem("email"))
        .collection("ChatRoom")
        .doc("krushnkantv1@gmail.com")
        .collection("Chat_Store")
        .add({
          TimeNow: firebase.firestore.FieldValue.serverTimestamp(),
          Email: localStorage.getItem("email"),
          OtherFile: await fileRef.getDownloadURL(),
        })
        .then((r) => {});
    }
    // db.collection("web_user")
    //   .doc(id)
    //   .collection("ChatRoom")
    //   .doc("krushnkantv1@gmail.com")
    //   .collection("Chat_Store")
    //   .add({
    //     TimeNow: firebase.firestore.FieldValue.serverTimestamp(),
    //     Email: "krushnkantv1@gmail.com",
    //     File: await fileRef.getDownloadURL(),
    //   })
    //   .then((r) => {});
  };

  // return (
  //   <div>
  //     <form>
  //       <Grid container item sm={12} className={classes.type_container}>
  //         <Grid item sm={1}>
  //           <input
  //             type="file"
  //             id="fileLoader"
  //             name="files"
  //             title="Load File"
  //             onChange={filedetails}
  //           />
  //           <Button
  //             variant="contained"
  //             className={classes.emojibtn}
  //             onClick={Showfileselect}
  //           >
  //             <AttachFileIcon />
  //           </Button>
  //         </Grid>
  //         <Grid item sm={1}>
  //           <Button
  //             variant="contained"
  //             className={classes.emojibtn}
  //             // onClick={Showemoji}
  //           >
  //             🤨
  //           </Button>
  //         </Grid>
  //         <Grid item sm={1}>
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             className={classes.emojibtn}
  //             onClick={Showemoji}
  //           >
  //             🤨
  //           </Button>
  //         </Grid>
  //         <Grid item sm={9} style={{ padding: "0px 5px" }}>
  //           <TextField
  //             id="your-msg"
  //             value={text}
  //             onChange={handleChange}
  //             label="Type Your Message"
  //             type="text"
  //             variant="outlined"
  //             className={classes.type_message}
  //             autoComplete="off"
  //           />
  //         </Grid>
  //         {showemoji ? (
  //           <div style={{ position: "absolute", bottom: "70px" }}>
  //             <span>
  //               <Picker onSelect={addEmoji} />
  //             </span>
  //           </div>
  //         ) : (
  //           ""
  //         )}
  //         {/* <div style={{ position: "absolute", bottom: "70px"  }}>
  //           <span>
  //             <Picker onSelect={addEmoji} />
  //           </span>
  //         </div> */}

  //         <Grid item sm={1}>
  //           <button
  //             variant="contained"
  //             color="primary"
  //             value="submit"
  //             className={classes.sendbtn}
  //             onClick={(e) => {
  //               e.preventDefault();
  //               Send();
  //             }}
  //           >
  //             Send
  //           </button>
  //         </Grid>
  //       </Grid>
  //     </form>
  //   </div>
  // );
  return (
    <div>
      <form>
        <Grid container item sm={12} className={classes.type_container}>
          <Grid item sm={1}>
            <input
              type="file"
              id="fileLoader"
              name="files"
              title="Load File"
              onChange={filedetails}
            />
            <Button
              variant="contained"
              className={classes.emojibtn}
              onClick={Showfileselect}
            >
              <AttachFileIcon />
            </Button>
          </Grid>
          <Grid item sm={1}>
            <Button
              variant="contained"
              color="primary"
              className={classes.emojibtn}
              onClick={Showemoji}
            >
              🤨
            </Button>
          </Grid>
          <Grid item sm={9} style={{ padding: "0px 5px" }}>
            <TextField
              id="your-msg"
              value={text}
              onChange={handleChange}
              label="Type Your Message"
              type="text"
              variant="outlined"
              className={classes.type_message}
              autoComplete="off"
            />
          </Grid>
          {showemoji ? (
            <div style={{ position: "absolute", bottom: "70px" }}>
              <span>
                <Picker onSelect={addEmoji} />
              </span>
            </div>
          ) : (
            ""
          )}
          {/* <div style={{ position: "absolute", bottom: "70px"  }}>
            <span>
              <Picker onSelect={addEmoji} />
            </span>
          </div> */}

          <Grid item sm={1}>
            <button
              variant="contained"
              color="primary"
              value="submit"
              className={classes.sendbtn}
              onClick={(e) => {
                e.preventDefault();
                Send();
              }}
            >
              Send
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default SendMessaj;
