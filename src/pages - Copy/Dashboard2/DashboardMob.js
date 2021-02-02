// /* eslint-disable react/jsx-no-duplicate-props */
import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import PollIcon from "@material-ui/icons/Poll";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Dashboard from "./dashboard_web/Dashboard";
import Test from "./Componet/Dashboard/test/Test";
import Service from "./Componet/Dashboard/service/Service";
import Program from "./Componet/Dashboard/program/Program";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FeedBack from "./Componet/Dashboard/feedback/FeedBack";
import { Button, Paper } from "@material-ui/core";

function DashboardMob() {
  const { componet } = useParams();
  const [mainpage, setmainpage] = useState();
  useEffect(() => {
    setmainpage(<Dashboard />);
  }, []);
  const [state, setstate] = useState([]);
  useEffect(() => {
    if (componet === "test") {
      setmainpage(<Test />);
    } else if (componet === "seassion") {
      setmainpage(<Service />);
    } else if (componet === "program") {
      setmainpage(<Program />);
    } else if (componet === "feedback") {
      setmainpage(<FeedBack />);
    } else {
      setmainpage(<Dashboard />);
    }
  }, [componet]);
  let Closenav = () => {
    document.querySelector(".sidenav2").style.width = "0%";
  };
  let Opennav = () => {
    document.querySelector(".sidenav2").style.width = "100%";
  };
  //
  useEffect(() => {
    if (localStorage.getItem("userData") !== null) {
      let user = JSON.parse(localStorage.getItem("userData"));
      setstate({
        id: user.id,
        fname: user.first_name,
        lname: user.last_name,
        number: user.number,
        email: user.email,
        loggedIn: true,
      });
    } else {
      window.location.assign("/");
    }
  }, []);
  return (
    <>
      <div style={{ marginBottom: "200px" }}>
        <div
          className="direction_column flexCenter"
          style={{
            justifyContent: "flex-end",
            height: "70px",
          }}
        ></div>
        <div id="mySidenav" className="sidenav2">
          <Button
            variant="contained"
            className="closebtn"
            onClick={() => Closenav()}
          >
            x
          </Button>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <AccountBoxIcon style={{ color: "white" }} fontSize="large" />
            <h5
              style={{
                color: "white",
                fontWeight: "bold",
                margin: "2px",
              }}
            >
              {state.fname}
            </h5>

            <Link
              to="/profile"
              style={{
                color: "black",
                backgroundColor: "white",
                padding: "2px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Edit Profile
            </Link>
          </div>
          <NavLink
            exact
            to="/dashboard"
            className="col-9 menu_option"
            onClick={() => Closenav()}
          >
            <DashboardIcon /> Dashboard
          </NavLink>
          <NavLink
            exact
            to="/dashboard/test"
            className="col-9 menu_option"
            onClick={() => Closenav()}
          >
            <PollIcon /> Test Reports
          </NavLink>
          <NavLink
            exact
            to="/dashboard"
            className="col-9 menu_option"
            onClick={() => Closenav()}
          >
            <DynamicFeedIcon /> Clinical Progress
          </NavLink>
          <NavLink
            exact
            to="/dashboard/seassion"
            className="col-9 menu_option"
            onClick={() => Closenav()}
          >
            <FavoriteBorderIcon />
            Service Session
          </NavLink>
          <NavLink
            exact
            to="/dashboard/program"
            className="col-9 menu_option"
            onClick={() => Closenav()}
          >
            <FavoriteBorderIcon />
            Program Session
          </NavLink>
          <NavLink
            exact
            to="/dashboard/feedback"
            className="col-9 menu_option"
            onClick={() => Closenav()}
          >
            <StarBorderIcon /> FeedBack
          </NavLink>
        </div>
        <div>
          <Button
            style={{
              borderRadius: "4px",
              background: "#005191",
              border: "none",
              padding: "10px 20px",
              fontSize: "14px",
              color: "white",
              width: "100%",
              textAlign: "left",
            }}
            onClick={() => Opennav()}
          >
            Select Fild
          </Button>

          <div className="mobilecontent">{mainpage}</div>
        </div>
      </div>
    </>
  );
}

export default DashboardMob;

// import { Button } from "@material-ui/core";
// import React from "react";

// function DashboardMob() {
//   return (
//     <div>
//       <Button
//         style={{
//           borderRadius: "4px",
//           background: "#005191",
//           border: "none",
//           padding: "10px 20px",
//           fontSize: "14px",
//           color: "white",
//           marginTop: "20px",
//           width: "100%",
//         }}
//         onClick={() => alert("hello")}
//       >
//         Select Time
//       </Button>
//     </div>
//   );
// }

// export default DashboardMob;
