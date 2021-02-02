import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalBody,
  Collapse,
} from "reactstrap";
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
import moment from "moment";
import $ from "jquery";
import { faSun, faCloudSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Tabs, { TabPane } from "rc-tabs";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Depression extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      program_id: this.props.match.params.programID,
      program_Name: this.props.match.params.programName,
      //
      //
      date: null,
      time: null,
      timeSelected: null,
      dateSelected: null,
      showSlotBook: false,
      dates: [],
      //
      openAfter: false,
      openEven: false,
      openMorn: true,
      selected: "",
      selectedDates: "",
      todaytime: new Date().getHours(),
      todayminit: new Date().getMinutes(),
    };
  }

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  checkoutProgram = (amount, sessions, program_id, program_name) => {
    if (this.state.selected && this.state.selectedDates) {
      this.setState({
        showSlotBook: false,
      });
      this.props.history.push({
        pathname: "/checkout",
        state: [
          amount,
          sessions,
          program_id,
          "program",
          program_name,
          "extra",
          this.state.selected,
          this.state.selectedDates,
        ],
      });
    } else {
      this.setState({
        showSlotBook: true,
      });
    }
  };
  //
  ////
  selectSlot = () => {
    this.setState({
      showSlotBook: true,
    });
  };
  //
  componentDidMount = () => {
    // this.state.dates.push(moment(today));
    var today = moment();
    for (var i = 0; i < 13; i++) {
      this.state.dates.push(moment(today).add(i, "days").format("MM-DD-YYYY"));
    }
  };

  setTime = (time) => {
    this.setState({
      timeSelected: time.formatted24,
    });
  };

  setDate = (date) => {
    this.setState({
      date: date,
      dateSelected: moment(date).format(),
    });
  };

  selectSlot = () => {
    this.setState({
      showSlotBook: true,
    });
  };

  hideAll = () => {
    this.setState({
      showSlotBook: false,
    });
  };

  //
  toggleAfter = () => {
    this.setState((prevState) => ({
      openAfter: !prevState.openAfter,
      openMorn: false,
      openEven: false,
    }));
  };

  toggleEven = () => {
    this.setState((prevState) => ({
      openEven: !prevState.openEven,
      openAfter: false,
      openMorn: false,
    }));
  };

  toggleMorn = () => {
    this.setState((prevState) => ({
      openMorn: !prevState.openMorn,
      openEven: false,
      openAfter: false,
    }));
  };

  selecteddates = (time) => {
    console.log(this.state.selectedDates);
    this.setState({
      selectedDates: time,
    });
    this.setState({
      showSlotBook: false,
    });
  };
  select = (time) => {
    var $cols = $(".slot").click(function (e) {
      $cols.removeClass("selected");
      $(this).addClass("selected");
    });
    this.setState({
      selected: time,
    });
    console.log(this.state.selectedDates);
  };

  render() {
    return (
      <Fragment>
        <Modal
          isOpen={this.state.showSlotBook}
          centered={true}
          size="lg"
          toggle={this.hideAll}
        >
          <ModalBody>
            <div style={{ textAlign: "center", padding: "15px" }}>
              <div style={{ fontFamily: "Nunito-SemiBold", fontSize: "26px" }}>
                Select your slot
              </div>
              <div>
                <Tabs
                  defaultActiveKey="0"
                  renderTabBar={() => <ScrollableInkTabBar />}
                  renderTabContent={() => <TabContent />}
                >
                  {this.state.dates.map((date, index) => (
                    <TabPane tab={date} key={index}>
                      <div>
                        <div onClick={this.toggleMorn} className="dayTime">
                          Morning
                          <span>
                            <FontAwesomeIcon
                              icon={faSun}
                              style={{
                                color: "#005191",
                                fontSize: "20px",
                                marginLeft: "20px",
                              }}
                            />
                          </span>
                        </div>

                        <Collapse isOpen={this.state.openMorn}>
                          <div className="slotGrid">
                            {index === 0 && this.state.todaytime >= 9 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                9:00 AM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:00 AM");
                                }}
                              >
                                9:00 AM
                              </div>
                            )}
                            {index === 0 &&
                            this.state.todaytime >= 9 &&
                            this.state.todayminit >= 44 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                9:45 AM
                              </div>
                            ) : index === 0 && this.state.todaytime > 9 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                9:45 AM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                9:45 AM
                              </div>
                            )}
                            {/*  */}
                            {index === 0 &&
                            this.state.todaytime >= 10 &&
                            this.state.todayminit >= 29 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                10:30 AM
                              </div>
                            ) : index === 0 && this.state.todaytime > 10 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                10:30 AM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                10:30 AM
                              </div>
                            )}
                            {/*  */}
                            {/*  */}
                            {index === 0 &&
                            this.state.todaytime >= 11 &&
                            this.state.todayminit >= 14 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                11:15 AM
                              </div>
                            ) : index === 0 && this.state.todaytime > 11 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                11:15 AM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                11:15 AM
                              </div>
                            )}
                            {/*  */}

                            {index === 0 && this.state.todaytime >= 12 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                12:00 AM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => this.select("12:00 AM")}
                              >
                                12:00 AM
                              </div>
                            )}
                            {/*  */}
                          </div>
                        </Collapse>

                        <div onClick={this.toggleAfter} className="dayTime">
                          Afternoon
                          <span>
                            <FontAwesomeIcon
                              icon={faCloudSun}
                              style={{
                                color: "#005191",
                                fontSize: "20px",
                                marginLeft: "20px",
                              }}
                            />
                          </span>
                        </div>
                        <Collapse isOpen={this.state.openAfter}>
                          <div className="slotGrid">
                            {/*  */}
                            {index === 0 &&
                            this.state.todaytime >= 12 &&
                            this.state.todayminit >= 44 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                12:45 PM
                              </div>
                            ) : index === 0 && this.state.todaytime > 12 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                12:45 PM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                12:45 PM
                              </div>
                            )}
                            {/*  */}
                            {index === 0 &&
                            this.state.todaytime >= 13 &&
                            this.state.todayminit >= 29 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                1:30 PM
                              </div>
                            ) : index === 0 && this.state.todaytime > 13 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                1:30 PM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                1:30 PM
                              </div>
                            )}
                            {/*  */}
                            {index === 0 &&
                            this.state.todaytime >= 14 &&
                            this.state.todayminit >= 14 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                2:15 PM
                              </div>
                            ) : index === 0 && this.state.todaytime > 14 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                2:15 PM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                2:15 PM
                              </div>
                            )}

                            {/*  */}

                            {index === 0 && this.state.todaytime >= 15 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                3:00 PM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => this.select("3:00 AM")}
                              >
                                3:00 PM
                              </div>
                            )}
                            {/*  */}

                            {index === 0 &&
                            this.state.todaytime >= 15 &&
                            this.state.todayminit >= 44 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                3:45 PM
                              </div>
                            ) : index === 0 && this.state.todaytime > 15 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                3:45 PM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                3:45 PM
                              </div>
                            )}

                            {/*  */}
                            {index === 0 &&
                            this.state.todaytime >= 16 &&
                            this.state.todayminit >= 29 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                4:30 PM
                              </div>
                            ) : index === 0 && this.state.todaytime > 16 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                4:30 PM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                4:30 PM
                              </div>
                            )}

                            {/*  */}
                          </div>
                        </Collapse>
                        <div onClick={this.toggleEven} className="dayTime">
                          Evening
                          <span>
                            <FontAwesomeIcon
                              icon={faMoon}
                              style={{
                                color: "#005191",
                                fontSize: "20px",
                                marginLeft: "20px",
                              }}
                            />
                          </span>
                        </div>
                        <Collapse isOpen={this.state.openEven}>
                          <div className="slotGrid">
                            {index === 0 &&
                            this.state.todaytime >= 17 &&
                            this.state.todayminit >= 14 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                5:15 PM
                              </div>
                            ) : index === 0 && this.state.todaytime > 17 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                5:15 PM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                5:15 PM
                              </div>
                            )}
                            {/*  */}
                            {index === 0 && this.state.todaytime >= 18 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                6:00 PM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => this.select("6:00 AM")}
                              >
                                6:00 PM
                              </div>
                            )}
                            {/*  */}
                            {index === 0 &&
                            this.state.todaytime >= 18 &&
                            this.state.todayminit >= 44 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                6:45 PM
                              </div>
                            ) : index === 0 && this.state.todaytime > 18 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                6:45 PM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                6:45 PM
                              </div>
                            )}

                            {/*  */}
                            {index === 0 &&
                            this.state.todaytime >= 19 &&
                            this.state.todayminit >= 29 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                7:30 PM
                              </div>
                            ) : index === 0 && this.state.todaytime > 19 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                7:30 PM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                7:30 PM
                              </div>
                            )}

                            {/*  */}
                            {index === 0 &&
                            this.state.todaytime >= 20 &&
                            this.state.todayminit >= 14 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                8:15 PM
                              </div>
                            ) : index === 0 && this.state.todaytime > 20 ? (
                              <div
                                className="slot"
                                style={{ backgroundColor: "gray" }}
                              >
                                8:15 PM
                              </div>
                            ) : (
                              <div
                                className="slot"
                                onClick={() => {
                                  this.select("9:45 AM");
                                }}
                              >
                                8:15 PM
                              </div>
                            )}

                            {/*  */}
                          </div>
                        </Collapse>
                      </div>
                      {/*  */}
                      <div style={{ textAlign: "center", margin: "25px auto" }}>
                        <Button
                          className="buttonSolid"
                          onClick={() => {
                            this.selecteddates(date);
                            //
                          }}
                        >
                          Book Now
                        </Button>
                      </div>
                      {/*  */}
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </div>
          </ModalBody>
        </Modal>
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
