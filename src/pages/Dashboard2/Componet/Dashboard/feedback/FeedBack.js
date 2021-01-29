import React from "react";
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import firebase from "../../../../firebase";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Feedback } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import api_url from "../../../../../api_url";
import axios from "axios";
let db = firebase.firestore();
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#005191",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(
  name,
  Strongly_Agree,
  Somewhat_Agree,
  No_Strong_Feeling,
  Somewhat_Disagree,
  Strongly_Disagree
) {
  return {
    name,
    Strongly_Agree,
    Somewhat_Agree,
    No_Strong_Feeling,
    Somewhat_Disagree,
    Strongly_Disagree,
  };
}

const rows = [
  createData(
    "My therapist listened to me effectively.",
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly Agree"
      name="group1"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Agree"
      name="group1"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="No Strong Feeling"
      name="group1"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Disagree"
      name="group1"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly_Disagree"
      name="group1"
    />
  ),
  createData(
    "My therapist seemed to understand my point of view.",
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly Agree"
      name="group2"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Agree"
      name="group2"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="No Strong Feeling"
      name="group2"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Disagree"
      name="group2"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly_Disagree"
      name="group2"
    />
  ),
  createData(
    "My therapist accepted what i said without judging me.",
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly Agree"
      name="group3"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Agree"
      name="group3"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="No Strong Feeling"
      name="group3"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Disagree"
      name="group3"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly_Disagree"
      name="group3"
    />
  ),
  createData(
    "My therapist had a sensible conceptualization of my concerns.",
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly Agree"
      name="group4"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Agree"
      name="group4"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="No Strong Feeling"
      name="group4"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Disagree"
      name="group4"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly_Disagree"
      name="group4"
    />
  ),
  createData(
    "I felt comfortable giving feedback to my therapist about my experience with them.",
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly Agree"
      name="group5"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Agree"
      name="group5"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="No Strong Feeling"
      name="group5"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Disagree"
      name="group5"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly_Disagree"
      name="group5"
    />
  ),
  createData(
    "My therapist seemed knowledgeable about the issues.",
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly Agree"
      name="group6"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Agree"
      name="group6"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="No Strong Feeling"
      name="group6"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Somewhat Disagree"
      name="group6"
    />,
    <input
      style={{ width: "auto" }}
      type="radio"
      value="Strongly_Disagree"
      name="group6"
    />
  ),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  let history = useHistory();

  let submit = () => {
    // let group1 = document.querySelector(
    //   "input[type='radio'][name='group1']:checked"
    // ).value;
    // let group2 = document.querySelector(
    //   "input[type='radio'][name='group2']:checked"
    // ).value;
    // let group3 = document.querySelector(
    //   "input[type='radio'][name='group3']:checked"
    // ).value;
    // let group4 = document.querySelector(
    //   "input[type='radio'][name='group4']:checked"
    // ).value;
    // let group5 = document.querySelector(
    //   "input[type='radio'][name='group5']:checked"
    // ).value;
    // let group6 = document.querySelector(
    //   "input[type='radio'][name='group6']:checked"
    // ).value;

    if (
      document.querySelector("input[type='radio'][name='group1']:checked") &&
      document.querySelector("input[type='radio'][name='group2']:checked") &&
      document.querySelector("input[type='radio'][name='group3']:checked") &&
      document.querySelector("input[type='radio'][name='group4']:checked") &&
      document.querySelector("input[type='radio'][name='group5']:checked") &&
      document.querySelector("input[type='radio'][name='group6']:checked")
    ) {
      let group1 = document.querySelector(
        "input[type='radio'][name='group1']:checked"
      ).value;
      let group2 = document.querySelector(
        "input[type='radio'][name='group2']:checked"
      ).value;
      let group3 = document.querySelector(
        "input[type='radio'][name='group3']:checked"
      ).value;
      let group4 = document.querySelector(
        "input[type='radio'][name='group4']:checked"
      ).value;
      let group5 = document.querySelector(
        "input[type='radio'][name='group5']:checked"
      ).value;
      let group6 = document.querySelector(
        "input[type='radio'][name='group6']:checked"
      ).value;

      db.collection("web_user")
        .doc(localStorage.getItem("email"))
        .collection("Feedback")
        .doc("Details")
        .set({
          My_therapist_listened_to_me_effectively: group1,
          My_therapist_seemed_to_understand_my_point_of_view: group2,
          My_therapist_accepted_what_i_said_without_judging_me: group3,
          My_therapist_had_a_sensible_conceptualization_of_my_concerns: group4,
          i_felt_comfortable_giving_feedback_to_my_therapist_about_my_experience_with_them: group5,
          My_therapist_seemed_knowledgeable_about_the_issues: group6,
        })
        .then((re) => {
          axios({
            method: "get",
            url: api_url + "feedback_email_send",
            params: {
              email: localStorage.getItem("email"),
              group1: group1,
              group2: group2,
              group3: group3,
              group4: group4,
              group5: group5,
              group6: group6,
            },
          }).then((re) => {
            Swal.fire({
              icon: "success",
              type: "success",
              text: "Your Feedback Has Been Successfully Submitted!",
              showConfirmButton: true,
              timer: 3500,
            }).then((s) => {
              history.push("/dashboard");
            });
          });
        });
    } else {
      toast.error("Please fill FeedBack Form");
    }
  };
  return (
    <form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                Working Relationship with your Therapist
              </StyledTableCell>
              <StyledTableCell align="center">Strongly Agree</StyledTableCell>
              <StyledTableCell align="center">Somewhat Agree</StyledTableCell>
              <StyledTableCell align="center">
                No Strong Feeling
              </StyledTableCell>
              <StyledTableCell align="center">
                Somewhat Disagree
              </StyledTableCell>
              <StyledTableCell align="center">
                Strongly Disagree
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.Strongly_Agree}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.Somewhat_Agree}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.No_Strong_Feeling}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.Somewhat_Disagree}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.Strongly_Disagree}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        style={{
          marginTop: "10px",
          backgroundColor: "#005191",
          color: "white",
        }}
        onClick={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        Submit
      </Button>
    </form>
  );
}
