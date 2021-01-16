import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import Journy from "./Journy";
import "./index.css";

function Dashboard() {
  const [page, setpage] = useState();
  return (
    <div>
      <div className="col-12" style={{ marginTop: "20px" }}>
        <div className="col-3">
          <Link to="/programs" className="box1">
            <i>
              <AddToPhotosOutlinedIcon style={{ fontSize: 40 }} />
            </i>
            <h6
              style={{
                color: "white",
                fontWeight: "bold",
                marginTop: "2px",
              }}
            >
              Book Your Next Seassion
            </h6>
          </Link>
        </div>
        <div className="col-3" onClick={() => setpage(<Journy />)}>
          <div className="box2">
            <i>
              <ScheduleOutlinedIcon style={{ fontSize: 40 }} />
            </i>
            <h6
              style={{
                color: "white",
                fontWeight: "bold",
                marginTop: "2px",
              }}
            >
              THERAPI JOURNEY
            </h6>
          </div>
        </div>
      </div>
      <div className="col-12" style={{ marginTop: "30px" }}>
        {page}
      </div>
    </div>
  );
}

export default Dashboard;
