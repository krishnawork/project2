import React, { Component } from "react";
import { isMobile, isTablet } from "react-device-detect";
import DashboardMob from "./DashboardMob";
import DashboardWeb from "./DashboardWeb";

export default class ServiceFee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>{isMobile || isTablet ? <DashboardMob /> : <DashboardWeb />}</div>
    );
  }
}
