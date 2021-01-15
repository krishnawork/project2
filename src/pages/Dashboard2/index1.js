import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import PollIcon from "@material-ui/icons/Poll";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

function index() {
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
          <div className="sidebar">
            <NavLink exact to="/dashboard" className="sidebar_option">
              <DashboardIcon /> Dashboard
            </NavLink>
            <NavLink exact to="/dashboard" className="sidebar_option">
              <PollIcon /> Test Reports
            </NavLink>
            <NavLink exact to="/dashboard" className="sidebar_option">
              <DynamicFeedIcon /> Clinical Progress
            </NavLink>
            <NavLink exact to="/dashboard" className="sidebar_option">
              <FavoriteBorderIcon /> Session History
            </NavLink>
            <NavLink exact to="/dashboard" className="sidebar_option">
              <StarBorderIcon /> FeedBack
            </NavLink>
          </div>
          <div className="content_box">
            <div>
              <ul>
                {/* <li className="search">
                  <Link to="/">Search</Link>
                </li> */}
                <li className="Apoiment">TOLL FREE NO :- 26492659</li>
                <li className="Apoiment">
                  <Link to="/services">Book Apoiment</Link>
                </li>
              </ul>
            </div>

            <div className="analitics">
              <h4 style={{ padding: "30px" }}>Analitics</h4>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default index;
