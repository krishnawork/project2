import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import firebase from "../../../../firebase";
import generatePDF from "../../../../../services/reportGenerator";

let db = firebase.firestore();
const useStyles = makeStyles((theme) => ({
  root: {
    // Width: 275,
    // height:
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 10,
    height: 50,
    cursor: "pointer",
  },
  psychology: {
    background: "linear-gradient(45deg, #8bc34a 30%, #a2cf6e 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  seassion: {
    background: "linear-gradient(45deg, #cddc39  30%, #d7e360 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  therapi: {
    background: "linear-gradient(45deg, #ff5722, 30%, #ff784e 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  white: {
    color: "white",
  },
}));

function AllTest() {
  const [Loadind, setLoadind] = useState("Loading");
  const [selfdata, setselfdata] = useState([]);
  const [paiddata, setpaiddata] = useState([]);
  const classes = useStyles();
  //
  useEffect(() => {
    let x = localStorage.getItem("email");
    setselfdata([]);
    db.collection("web_user")
      .doc(x)
      .collection("Self")
      .orderBy("TimeNow", "desc")
      .get()
      .then((result) => {
        if (!result.empty) {
          result.forEach((d) => {
            setselfdata((old) => [...old, d.data()]);
          });
        } else {
          setLoadind("Data Not Available");
        }
      });
    return () => {
      setLoadind("Loading");
    };
  }, []);
  useEffect(() => {
    let x = localStorage.getItem("email");
    setselfdata([]);
    db.collection("web_user")
      .doc(x)
      .collection("Paid")
      .orderBy("TimeNow", "desc")
      .get()
      .then((result) => {
        if (!result.empty) {
          result.forEach((d) => {
            setpaiddata((old) => [...old, d.data()]);
          });
        } else {
          setLoadind("Data Not Available");
        }
      });
    return () => {
      setLoadind("Loading");
    };
  }, []);

  //
  let GeneratePDF = (data, type) => {
    if (localStorage.getItem("type") === type) {
      generatePDF(data);
    } else {
    }
  };

  //
  return (
    <div>
      {/* <h1>Hari</h1> */}
      <Grid container spacing={3}>
        {selfdata.length > 0
          ? selfdata.map((d) => {
              return (
                <>
                  <Grid item xs={6} sm={3}>
                    <Card className={classes.root} variant="outlined">
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          {d.Test}
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {d.TimeNow}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          Test_type: <br />
                          {d.Test_type}
                          <br />
                        </Typography>
                        <Typography variant="body2" component="p">
                          <br />
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => {
                            localStorage.setItem("type", d.Test_type);
                            generatePDF(d.Details, d.Test_type);
                          }}
                        >
                          DownLoad PDF{" "}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              );
            })
          : Loadind}

        {/*  */}
        {paiddata.length > 0
          ? paiddata.map((d) => {
              return (
                <>
                  <Grid item xs={6} sm={3}>
                    <Card className={classes.root} variant="outlined">
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          {d.Test}
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {d.TimeNow}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          Test_type: <br />
                          {d.Test_type}
                          <br />
                        </Typography>
                        <Typography variant="body2" component="p">
                          <br />
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => {
                            localStorage.setItem("type", d.Test_type);
                            GeneratePDF(d.Details, d.Test_type);
                          }}
                        >
                          DownLoad PDF{" "}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              );
            })
          : ""}
      </Grid>
    </div>
  );
}

export default AllTest;
