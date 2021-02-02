/* eslint-disable react/jsx-no-duplicate-props */
import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./index.css";
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
import { Paper } from "@material-ui/core";
import "./mobilecss.css";
function Index() {
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
  // let {};
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
    <Fragment>
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
        <div className="main_box">
          {/* row start */}
          <div className="row">
            <div className="col-12">
              {/* 2 col start sidebar */}
              <div className="col-2 sidenav">
                {/*  */}
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
                {/*  */}
                <NavLink exact to="/dashboard" className="col-12 menu_option">
                  <DashboardIcon /> Dashboard
                </NavLink>
                {/* </div> */}

                <NavLink
                  exact
                  to="/dashboard/test"
                  className="col-12 menu_option"
                >
                  <PollIcon /> Test Reports
                </NavLink>

                <NavLink exact to="/dashboard" className="col-12 menu_option">
                  <DynamicFeedIcon /> Clinical Progress
                </NavLink>

                <NavLink
                  exact
                  to="/dashboard/seassion"
                  className="col-12 menu_option"
                >
                  <FavoriteBorderIcon />
                  Service Session
                </NavLink>
                <NavLink
                  exact
                  to="/dashboard/program"
                  className="col-12 menu_option"
                >
                  <FavoriteBorderIcon />
                  Program Session
                </NavLink>

                <NavLink
                  exact
                  to="/dashboard/feedback"
                  className="col-12 menu_option"
                >
                  <StarBorderIcon /> FeedBack
                </NavLink>
              </div>
              {/* 10 col start  content box*/}
              <div className="col-10 sidebar">
                {/*  */}
                <div className="col-12">
                  <div className="col-6">
                    <p></p>
                  </div>
                  <div className="col-3 apoiment">
                    <Paper>
                      <Link className="linka" to="/services">
                        Book Appointment{" "}
                      </Link>
                    </Paper>
                  </div>
                  <div className="col-3 apoiment">
                    <Paper>
                      <Link to="/services" className="linka">
                        {" "}
                        Call Now :- 26492659{" "}
                      </Link>
                    </Paper>
                  </div>
                </div>
                {/*  */}
                <div className="col-12">
                  <h5>Analytics</h5>
                </div>
                {/*  */}
                {mainpage}
                {/*  */}
              </div>
            </div>
            {/*  12 col END*/}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Index;
