/* eslint-disable react/jsx-no-duplicate-props */
import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./index.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import PollIcon from "@material-ui/icons/Poll";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Dashboard from "./Dashboard";
import Test from "./Componet/Dashboard/test/Test";
import Service from "./Componet/Dashboard/service/Service";
import Program from "./Componet/Dashboard/program/Program";

function Index() {
  const { componet } = useParams();
  const [mainpage, setmainpage] = useState();
  useEffect(() => {
    setmainpage(<Dashboard />);
  }, []);
  useEffect(() => {
    if (componet === "test") {
      setmainpage(<Test />);
    } else if (componet === "seassion") {
      setmainpage(<Service />);
    } else if (componet === "program") {
      setmainpage(<Program />);
    } else {
      setmainpage(<Dashboard />);
    }
  }, [componet]);
  // let {};
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
                {/* <div className="col-12"  */}
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
                  Service seassion
                </NavLink>
                <NavLink
                  exact
                  to="/dashboard/program"
                  className="col-12 menu_option"
                >
                  <FavoriteBorderIcon />
                  Program seassion
                </NavLink>

                <NavLink exact to="/dashboard" className="col-12 menu_option">
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
                    <Link to="/services">Book appointment </Link>
                  </div>
                  <div className="col-3 apoiment">
                    <Link>TOLL FREE NO :- 26492659 </Link>
                  </div>
                </div>
                {/*  */}
                <div className="col-12">
                  <h5>Analitics</h5>
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
