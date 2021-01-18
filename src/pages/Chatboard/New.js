import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function New() {
  const classes = useStyles();
  return (
    <div>
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
          <Grid item xs={12}></Grid>
        </Grid>
      </div>
    </div>
  );
}

export default New;
