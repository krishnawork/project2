import React, { Component } from "react";
import { isMobile, isTablet } from "react-device-detect";
import Journey_web from "./Journey_web";
import Journey_mob from "./Journey_mob";

export default class ServiceFee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>{isMobile || isTablet ? <Journey_mob /> : <Journey_web />}</div>
    );
  }
}
