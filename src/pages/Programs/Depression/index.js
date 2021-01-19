import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import depression1 from "../../../assets/images/depression-1.png";
import depression2 from "../../../assets/images/depression-2.png";
import depression3 from "../../../assets/images/depression-3.png";
import anxiety from "../../../assets/images/anxiety.png";
import curve1 from "../../../assets/images/curve1.png";
import curve2 from "../../../assets/images/curve2.png";
import { isMobile } from "react-device-detect";
import programBanner from "../../../assets/images/programBanner.png";
import RecentCourses from "../../../components/RecentCourses";
import Subscribe from "../../../components/Subscribe";
import Includes from "../../../components/Includes";

class Depression extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      program_id: this.props.match.params.programID,
      program_Name: this.props.match.params.programName,
    };
  }

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  checkoutProgram = (amount, sessions, program_id, program_name) => {
    this.props.history.push({
      pathname: "/checkout",
      state: [amount, sessions, program_id, "program", program_name],
    });
  };

  render() {
    return (
      <Fragment>
        <div
          className="flexCenter height"
          style={{
            backgroundImage: "url(" + programBanner + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "340px",
          }}
        >
          <div className="programTitle">Program Detail</div>
        </div>
        <div className={isMobile ? "width-90m" : "width-70m"}>
          <div style={{ fontFamily: "Nunito-Bold", fontSize: "30px" }}>
            Overcome depression and anxiety
          </div>
          <Row style={{ marginTop: "20px" }}>
            <Col md={8}>
              <img
                src={anxiety}
                alt=""
                style={{ width: "100%", height: "350px", objectFit: "cover" }}
              />
            </Col>
            <Col md={4}>
              <Card className="noBorder shadowCard">
                <CardBody>
                  <div
                    style={{
                      fontFamily: "Roboto-SemiBold",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    Begin your wellness journey now!
                  </div>
                  <div style={{ fontSize: "14px", marginTop: "15px" }}>
                    Program fee
                    <span
                      style={{
                        float: "right",
                        color: "#DF8F06",
                        fontSize: "20px",
                        fontFamily: "Roboto-Bold",
                      }}
                    >
                      ₹4000
                    </span>
                  </div>
                  <div style={{ fontSize: "14px", marginTop: "15px" }}>
                    Program duration
                    <span style={{ float: "right" }}>5 Sessions</span>
                  </div>
                  <Button
                    className="programButton"
                    onClick={() =>
                      this.checkoutProgram(
                        4000,
                        5,
                        this.state.program_id,
                        this.state.program_Name
                      )
                    }
                  >
                    Start Now
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div className="stepsContainer">
            <div
              className="gridProgramP"
              style={{ gridTemplateColumns: "1fr 1.3fr" }}
            >
              <div>
                <img src={depression1} alt="" style={{ width: "100%" }} />
              </div>
              <div>
                <span className="programHeaders">You before this program</span>
                <ul className="listProgram">
                  <li>Feel a loss of interest in everything you love</li>
                  <li>Are nervous and restless</li>
                  <li>Have concentration problems</li>
                </ul>
              </div>
            </div>
            <div className="curveStyleProgram">
              <img src={curve1} alt="" />
            </div>
            <div
              className="gridProgramP"
              style={{ gridTemplateColumns: "1.3fr 1fr" }}
            >
              <div>
                <span className="programHeaders">You during this program</span>
                <ul className="listProgram">
                  <li>Understand the issues impacting your life</li>
                  <li>Develop strategies to cope with your stress</li>
                  <li>Learn to spot unhealthy behaviors</li>
                </ul>
              </div>
              <div>
                <img src={depression2} alt="" style={{ width: "100%" }} />
              </div>
            </div>
            <div className="curveStyleProgram">
              <img src={curve2} alt="" />
            </div>
            <div
              className="gridProgramP"
              style={{ gridTemplateColumns: "1fr 1.3fr" }}
            >
              <div>
                <img src={depression3} alt="" style={{ width: "100%" }} />
              </div>
              <div>
                <span className="programHeaders">You after this program</span>
                <ul className="listProgram">
                  <li>Can manage your anxiety</li>
                  <li>Deal with stressful situations easily</li>
                  <li>Can recognize your negative thoughts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Includes />
        <RecentCourses />
        <Subscribe />
      </Fragment>
    );
  }
}

export default withRouter(Depression);
