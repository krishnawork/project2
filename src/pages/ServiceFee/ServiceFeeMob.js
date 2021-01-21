import {
  faCheck,
  faSun,
  faCloudSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Radio } from "antd";
import axios from "axios";
import React, { Component, Fragment } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import { Link, withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Tabs, { TabPane } from "rc-tabs";
import "rc-tabs/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Modal,
  ModalBody,
  Row,
  dre,
  Collapse,
} from "reactstrap";
import serviceBack from "../../assets/images/Elements.png";
import fb from "../../assets/images/fb.png";
import google from "../../assets/images/google-icon.png";
import Subscribe from "../../components/Subscribe";
import Price from "react-forex-price";
import moment from "moment";
import $ from "jquery";
import api_url from "../../api_url";
import Swal from "sweetalert2";
import firebase, { auth, provider, provider2 } from "../../pages/firebase";
let db = firebase.firestore();
var validator = require("email-validator");

class ServiceFee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      name: "",
      email: "",
      number: "",
      loggedIn: false,
      showLogin: false,
      service_id: this.props.match.params.serviceID,
      service_name: this.props.match.params.serviceName,
      service_type: this.props.match.params.serviceType,

      //
      date: null,
      time: null,
      timeSelected: null,
      dateSelected: null,
      showSlotBook: true,
      dates: [],
      //
      openAfter: false,
      openEven: false,
      openMorn: true,
      selected: "",
      selectedDates: "",
    };
  }

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  responseGoogle = (response) => {
    console.log(response);
    let res = response.profileObj;
    let data = {
      name: res.name,
      email: res.email,
    };
    localStorage.setItem("userData", JSON.stringify(data));
    localStorage.setItem("isLoggedIn", true);
    this.hideAll();
    this.componentDidMount();
    window.location.reload();
  };

  responseFacebook = (response) => {
    console.log(response);
    let res = response.profileObj;
    let data = {
      name: res.name,
      email: res.email,
    };
    localStorage.setItem("userData", JSON.stringify(data));
    localStorage.setItem("isLoggedIn", true);
    this.hideAll();
    this.componentDidMount();
    window.location.reload();
  };

  hideAll = () => {
    this.setState({
      showLogin: false,
    });
  };

  componentDidMount = () => {
    let user;
    if (localStorage.getItem("isLoggedIn")) {
      user = JSON.parse(localStorage.getItem("userData"));
      this.setState({
        name: user.name,
        email: user.email,
        number: user.number,
        loggedIn: true,
      });
    }
  };
  //
  addfacebook = () => {
    auth.signInWithPopup(provider2).then((result) => {
      if (result) {
        db.collection("web_user").doc(result.user.displayName).set(
          {
            email: result.user.email,
            fname: result.user.displayName,
            number: result.user.phoneNumber,
          },
          { merge: true }
        );
      }
      console.log(result.user);
      axios
        .post(api_url + "sign-up", {
          fname: result.user.displayName,
          password: "password",
          email: result.user.email,
        })
        .then(function (response) {
          console.log("eee");
          console.log(result.user.displayName);

          let data = response.data.user;
          console.log("sdsdsdsdsds", data);
          let user = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            number: data.number,
          };

          localStorage.setItem("userData", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("email", result.user.displayName);
          window.location.reload();
        });
    });
  };

  //

  addgoogle = () => {
    auth.signInWithPopup(provider).then((result) => {
      if (result) {
        db.collection("web_user").doc(result.user.email).set(
          {
            email: result.user.email,
          },
          { merge: true }
        );
      }
      if (result) {
        axios
          .post(api_url + "sign-up", {
            email: result.user.email,
            fname: result.user.displayName,
            number: result.user.phoneNumber,
            password: "password",
          })
          .then(function (response) {
            let data = response.data.user;
            localStorage.setItem("email", data.email);
            let user = {
              id: data.id,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              number: data.number,
            };
            localStorage.setItem("userData", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", true);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
        // console.log(result.user);
        // db.collection("web_user")
        //   .doc(result.user.email)
        //   .set(
        //     {
        //       email: result.user.email,
        //       fname: result.user.displayName,
        //       number: result.user.phoneNumber,
        //     },
        //     { merge: true }
        //   )
        //   .then((d) => {
        //     localStorage.setItem("email", result.user.email);
        //     let user = {
        //       first_name: result.user.displayName,
        //       email: result.user.email,
        //     };
        //     localStorage.setItem("isLoggedIn", true);
        //     localStorage.setItem("userData", JSON.stringify(user));
        //     window.location.reload();
        //   });
      }
    });
  };
  openCheckout = (amount, sessions) => {
    if (this.state.loggedIn) {
      this.props.history.push({
        pathname: "/checkout",
        state: [amount, sessions],
      });
    } else {
      this.setState({
        showLogin: true,
      });
    }
  };

  emailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  passChange = (event) => {
    this.setState({ password: event.target.value });
  };

  login = () => {
    if (
      this.state.email == "" ||
      validator.validate(this.state.email) === false
    ) {
      toast.error("Please enter a valid email address!");
    } else if (this.state.password == "") {
      toast.error("Please enter a password!");
    } else {
      let self = this;
      axios
        .post(api_url + "login", {
          email: this.state.email,
          password: this.state.password,
        })
        .then(function (response) {
          if (response.data.message === "No user found") {
            self.hideAll();
            // self.props.history.push({
            //     pathname: '/signup',
            // })
            Swal.fire({
              icon: "success",
              type: "success",
              text: "No user found",
              showConfirmButton: true,
              timer: 3500,
            });
          } else {
            let data = response.data.user;
            let user = {
              id: data.id,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              number: data.number,
            };
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userData", JSON.stringify(user));
            window.location.reload();
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });

      // let data = {
      //     email: this.state.email,
      // };
      // localStorage.setItem('userData',JSON.stringify(data));
    }
  };
  //
  //
  //
  //
  componentDidMount = () => {
    // this.state.dates.push(moment(today));
    var today = moment();
    for (var i = 0; i < 13; i++) {
      this.state.dates.push(moment(today).add(i, "days").format("MM-DD-YYYY"));
    }

    if (localStorage.getItem("isLoggedIn")) {
      this.setState({
        state: this.state,
        loggedIn: true,
      });
    } else {
      this.setState({
        state: this.state,
        loggedIn: false,
      });
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
        {/*  */}
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
                            <div
                              className="slot"
                              onClick={() => this.select("9:00 AM")}
                            >
                              9:00 AM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("9:45 AM")}
                            >
                              9:45 AM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("10:30 AM")}
                            >
                              10:30 AM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("11:15 AM")}
                            >
                              11:15 AM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("12:00 AM")}
                            >
                              12:00 AM
                            </div>
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
                            <div
                              className="slot"
                              onClick={() => this.select("12:45 AM")}
                            >
                              12:45 PM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("1:30 AM")}
                            >
                              1:30 PM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("2:15 AM")}
                            >
                              2:15 PM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("3:00 AM")}
                            >
                              3:00 PM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("3:45 AM")}
                            >
                              3:45 PM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("4:30 AM")}
                            >
                              4:30 PM
                            </div>
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
                            <div
                              className="slot"
                              onClick={() => this.select("5:15 AM")}
                            >
                              5:15 PM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("6:00 AM")}
                            >
                              6:00 PM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("6:45 AM")}
                            >
                              6:45 PM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("7:30 AM")}
                            >
                              7:30 PM
                            </div>
                            <div
                              className="slot"
                              onClick={() => this.select("8:15 AM")}
                            >
                              8:15 PM
                            </div>
                          </div>
                        </Collapse>
                      </div>
                      {/*  */}
                      <div style={{ textAlign: "center", margin: "25px auto" }}>
                        <Button
                          className="buttonSolid"
                          // onClick={() => this.service(Slots)}
                          onClick={() => this.selecteddates(date)}
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
        {/*  */}
        <ToastContainer />
        <Modal
          size="lg"
          centered={true}
          style={{ textAlign: "center" }}
          isOpen={this.state.showLogin}
          toggle={this.hideAll}
        >
          <ModalBody style={{ textAlign: "center" }}>
            <Row style={{ padding: "0px" }}>
              <Col
                className="flexCenter"
                style={{ flexDirection: "column", padding: "40px" }}
              >
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontFamily: "Roboto-Bold",
                    marginBottom: "15px",
                  }}
                >
                  Sign In to Your Account
                </div>
                <div style={{ margin: "10px 0px", width: "100%" }}>
                  <Input
                    className="inputStyle"
                    placeholder="Enter your email address"
                    onChange={this.emailChange}
                  />
                </div>
                <div style={{ margin: "20px 0px", width: "100%" }}>
                  <Input
                    className="inputStyle"
                    maxLength={10}
                    placeholder="Enter your password"
                    onChange={this.passChange}
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <Button
                    onClick={this.login}
                    style={{
                      fontFamily: "Roboto-Bold",
                      borderRadius: "8px",
                      border: "none",
                      width: "100%",
                      background: "#DF8F06",
                      padding: "10px 16px",
                      fontSize: "1rem",
                    }}
                  >
                    LOGIN NOW
                  </Button>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {/* <div style={{marginRight: '10px'}}>
                                        <FacebookLogin
                                            appId="318952325788846"
                                            // autoLoad
                                            callback={this.responseFacebook}
                                            render={renderProps => (
                                                    <span style={{cursor: 'pointer', fontSize: '13px', background: '#3b5998', color: 'white', padding: '6px 10px', display: 'inline-flex', alignItems: 'center', borderRadius: '8px'}} onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={fb} style={{height: '30px', marginRight: '10px', borderRadius: '6px'}}/><span>Login with Facebook</span></span>
                                                )}
                                            />
                                    </div> */}
                  <div>
                    <button
                      style={{
                        cursor: "pointer",
                        fontSize: "13px",
                        background: "#3b5998",
                        color: "white",
                        padding: "6px 10px",
                        display: "inline-flex",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                      onClick={this.addfacebook}
                    >
                      <img
                        src={fb}
                        style={{
                          height: "30px",
                          marginRight: "10px",
                          borderRadius: "6px",
                        }}
                      />
                      <span>Login with Facebook</span>
                    </button>
                  </div>
                  {/* <div>
                                        <GoogleLogin
                                            clientId="666008965252-p0f44125gort69gcqa1m6e25o3tujpvp.apps.googleusercontent.com"
                                            render={renderProps => (
                                                <span style={{cursor: 'pointer', fontSize: '13px', background: '#4285F4', color: 'white', padding: '6px 10px', display: 'inline-flex', alignItems: 'center', borderRadius: '8px'}} onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={google} style={{height: '30px', width: '30px', objectFit: 'contain', marginRight: '10px', padding: '5px', background: 'white', borderRadius: '6px'}}/><span>Login with Google</span></span>
                                            )}
                                            buttonText="Login"
                                            onSuccess={this.responseGoogle}
                                            // onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    </div> */}
                  <div>
                    <button
                      style={{
                        cursor: "pointer",
                        fontSize: "13px",
                        background: "#4285F4",
                        color: "white",
                        padding: "6px 10px",
                        display: "inline-flex",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                      onClick={this.addgoogle}
                    >
                      <img
                        src={google}
                        style={{
                          height: "30px",
                          width: "30px",
                          objectFit: "contain",
                          marginRight: "10px",
                          padding: "5px",
                          background: "white",
                          borderRadius: "6px",
                        }}
                      />
                      <span>Login with Google</span>
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    margin: "10px",
                    color: "#9f9f9f",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  OR
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <Link
                    className="linkStyle"
                    to="/signup"
                    onClick={this.hideAll}
                  >
                    <Button
                      style={{
                        fontFamily: "Roboto-Bold",
                        borderRadius: "8px",
                        background: "none",
                        width: "100%",
                        border: "solid 1px #DF8F06",
                        color: "#DF8F06",
                        padding: "10px 16px",
                        fontSize: "1rem",
                      }}
                    >
                      SIGN UP
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <div style={{ paddingTop: "20%" }}>
          <div
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: "30px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Our customized counselling packages:
          </div>
          <div
            style={{
              textAlign: "center",
              margin: "0px 10px",
              fontSize: "14px",
            }}
          >
            Select any of the below packages and kickstart your journey of
            healing your Mind, Health and Optimizing life
          </div>
        </div>
        <div style={{ marginTop: "0px" }}>
          <div style={{ margin: "auto", padding: "50px 0px", width: "80%" }}>
            <div>I would like to talk to my counsellor via</div>
            <div style={{ marginTop: "20px" }}>
              <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio value={1}>
                  <span style={{ margin: "0px 18px" }}>Chat</span>
                </Radio>
                <Radio value={2}>
                  <span style={{ margin: "0px 18px" }}>Call</span>
                </Radio>
                <Radio value={3}>
                  <span style={{ margin: "0px 18px" }}>Video</span>
                </Radio>
              </Radio.Group>
            </div>
            <Row style={{ marginTop: "20px" }}>
              <Col xs={12}>
                <Card
                  className="noBorder"
                  style={{
                    boxShadow: "0px 10px 25px #0000000F",
                    height: "100%",
                    backgroundImage: "url(" + serviceBack + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <CardBody>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Nunito-Bold",
                        color: "#DF8F06",
                      }}
                    >
                      Learn
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Nunito-Bold",
                        fontSize: "28px",
                        marginTop: "10px",
                      }}
                    >
                      ₹ 1,000/-
                    </div>

                    <hr
                      style={{
                        color: "#D3E2EE",
                        width: "50%",
                        border: "1px solid",
                      }}
                    />
                    <Button
                      style={{
                        borderRadius: "4px",
                        background: "#005191",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: "14px",
                        color: "white",
                        marginTop: "20px",
                        width: "100%",
                      }}
                      onClick={this.selectSlot}
                    >
                      Select Time
                    </Button>
                    <Button
                      style={{
                        borderRadius: "4px",
                        background: "#005191",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: "14px",
                        color: "white",
                        marginTop: "20px",
                        width: "100%",
                      }}
                      onClick={() => this.openCheckout(1000, 1)}
                    >
                      Book appointment
                    </Button>
                    <div className="serviceFeeGrid">
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "#DF8F06", marginRight: "20px" }}
                        />
                      </div>
                      1 session
                    </div>
                    <div className="serviceFeeGrid">
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "#DF8F06", marginRight: "20px" }}
                        />
                      </div>
                      Discuss how to solve them with ease
                    </div>
                    <div className="serviceFeeGrid">
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "#DF8F06", marginRight: "20px" }}
                        />
                      </div>
                      Share your problems
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} style={{ marginTop: "20px" }}>
                <Card
                  className="noBorder"
                  style={{
                    boxShadow: "0px 10px 25px #0000000F",
                    height: "100%",
                    backgroundImage: "url(" + serviceBack + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <CardBody>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Nunito-Bold",
                        color: "#DF8F06",
                      }}
                    >
                      Learn and Experience
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Nunito-Bold",
                        fontSize: "28px",
                        marginTop: "10px",
                      }}
                    >
                      ₹ 2,500/-
                    </div>
                    <hr
                      style={{
                        color: "#D3E2EE",
                        width: "50%",
                        border: "1px solid",
                      }}
                    />
                    <Button
                      style={{
                        borderRadius: "4px",
                        background: "#005191",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: "14px",
                        color: "white",
                        marginTop: "20px",
                        width: "100%",
                      }}
                      onClick={this.selectSlot}
                    >
                      Select Time
                    </Button>
                    <Button
                      style={{
                        borderRadius: "4px",
                        background: "#005191",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: "14px",
                        color: "white",
                        marginTop: "20px",
                        width: "100%",
                      }}
                      onClick={() => this.openCheckout(2500, 3)}
                    >
                      Book appointment
                    </Button>
                    <div className="serviceFeeGrid">
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "#DF8F06", marginRight: "20px" }}
                        />
                      </div>
                      3 sessions
                    </div>
                    <div className="serviceFeeGrid">
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "#DF8F06", marginRight: "20px" }}
                        />
                      </div>
                      Share problems and discuss practical solutions
                    </div>
                    <div className="serviceFeeGrid">
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "#DF8F06", marginRight: "20px" }}
                        />
                      </div>
                      Determine therapy goals
                    </div>
                    <div className="serviceFeeGrid">
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "#DF8F06", marginRight: "20px" }}
                        />
                      </div>
                      Become self-aware and confident
                    </div>
                    <div className="serviceFeeGrid">
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "#DF8F06", marginRight: "20px" }}
                        />
                      </div>
                      Restore happiness of your life
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} style={{ marginTop: "20px" }}>
                <Card
                  className="noBorder"
                  style={{
                    boxShadow: "0px 10px 25px #0000000F",
                    paddingBottom: "15px",
                    height: "100%",
                    backgroundImage: "url(" + serviceBack + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <CardBody>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Nunito-Bold",
                        color: "#DF8F06",
                      }}
                    >
                      Learn, Experience, and Thrive
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "Nunito-Bold",
                        fontSize: "28px",
                        marginTop: "10px",
                      }}
                    >
                      ₹ 4,000/-
                    </div>
                    <hr
                      style={{
                        color: "#D3E2EE",
                        width: "50%",
                        border: "1px solid",
                      }}
                    />
                    <Button
                      style={{
                        borderRadius: "4px",
                        background: "#005191",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: "14px",
                        color: "white",
                        marginTop: "20px",
                        width: "100%",
                      }}
                      onClick={this.selectSlot}
                    >
                      Select Time
                    </Button>
                    <Button
                      style={{
                        borderRadius: "4px",
                        background: "#005191",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: "14px",
                        color: "white",
                        marginTop: "20px",
                        width: "100%",
                      }}
                      onClick={() => this.openCheckout(4000, 5)}
                    >
                      Book appointment
                    </Button>
                    <div>
                      <div className="serviceFeeGrid">
                        <div>
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "#DF8F06", marginRight: "20px" }}
                          />
                        </div>
                        5 sessions
                      </div>
                      <div className="serviceFeeGrid">
                        <div>
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "#DF8F06", marginRight: "20px" }}
                          />
                        </div>
                        Share problems and discuss practical solutions
                      </div>
                      <div className="serviceFeeGrid">
                        <div>
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "#DF8F06", marginRight: "20px" }}
                          />
                        </div>
                        Determine therapy goals
                      </div>
                      <div className="serviceFeeGrid">
                        <div>
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "#DF8F06", marginRight: "20px" }}
                          />
                        </div>
                        Become self-aware and confident
                      </div>
                      <div className="serviceFeeGrid">
                        <div>
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "#DF8F06", marginRight: "20px" }}
                          />
                        </div>
                        Restore happiness of your life
                      </div>
                      <div className="serviceFeeGrid">
                        <div>
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "#DF8F06", marginRight: "20px" }}
                          />
                        </div>
                        Learn strategies to overcome life’s challenges
                      </div>
                      <div className="serviceFeeGrid">
                        <div>
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "#DF8F06", marginRight: "20px" }}
                          />
                        </div>
                        Discover a new version of yourself
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div style={{ width: "100%", margin: "auto", marginTop: "20px" }}>
              <div style={{ fontFamily: "Nunito-Bold" }}>
                Common features of all plans:
              </div>
              <div className="serviceFeeGrid">
                <div>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#DF8F06", marginRight: "20px" }}
                  />
                </div>
                <div>45 minutes session</div>
              </div>
              <div className="serviceFeeGrid">
                <div>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#DF8F06", marginRight: "20px" }}
                  />
                </div>
                Counselling by a trained psychologist
              </div>
              <div className="serviceFeeGrid">
                <div>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#DF8F06", marginRight: "20px" }}
                  />
                </div>
                You choose timings for your sessions
              </div>
              <div className="serviceFeeGrid">
                <div>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#DF8F06", marginRight: "20px" }}
                  />
                </div>
                Anonymous discussions
              </div>
              <div className="serviceFeeGrid">
                <div>
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#DF8F06", marginRight: "20px" }}
                  />
                </div>
                Private &amp; confidential
              </div>
            </div>
          </div>
        </div>
        <Subscribe />
      </Fragment>
    );
  }
}

export default withRouter(ServiceFee);
