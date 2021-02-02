import React, { Component } from "react";
import { isMobile, isTablet } from "react-device-detect";
import Test_mob from "./Test_mob";
import Test_web from "./Test_web";

export default class ServiceFee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>{isMobile || isTablet ? <Test_mob /> : <Test_web />}</div>;
  }
}
