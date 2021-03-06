import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AllTest from "./AllTest";
import SelfTest from "./SelfTest";
import PaidTest from "./PaidTest";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
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
  box: {
    margin: "auto",
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

function Test({ service }) {
  const [page, setpage] = useState();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  let seassion1 = 1;
  let seassion3 = 3;
  let seassion5 = 5;
  useEffect(() => {
    setpage(<AllTest service="service" />);
  }, []);
  return (
    <div>
      <h4
        style={{ textAlign: "center", marginTop: "20px", marginBottom: "30px" }}
      ></h4>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Button
            className={`${classes.paper} ${classes.psychology} `}
            onClick={() => {
              setpage(<AllTest />);
            }}
          >
            All Test
          </Button>
        </Grid>
        {/*  */}
        <Grid item xs={6} sm={3}>
          <Button
            className={`${classes.paper} ${classes.psychology}`}
            onClick={() => {
              setpage(<SelfTest test={"Self"} />);
            }}
          >
            Self Test
          </Button>
        </Grid>
        {/*  */}
        <Grid item xs={6} sm={3}>
          <Button
            className={`${classes.paper} ${classes.psychology}`}
            onClick={() => {
              setpage(<PaidTest test={"Paid"} />);
            }}
          >
            Paid Test
          </Button>
        </Grid>
        {/*  */}

        {/*  */}
      </Grid>

      {/*  */}
      <div style={{ marginTop: "20px" }}>{page}</div>
    </div>
  );
}

export default Test;
