import React, { Component } from "react";
import { isMobile, isTablet } from "react-device-detect";
import Dashboard_mob from "./Dashboard_mob";
import Dashboard_web from "./Dashboard_web";

export default class ServiceFee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>{isMobile || isTablet ? <Dashboard_mob /> : <Dashboard_web />}</div>
    );
  }
}
