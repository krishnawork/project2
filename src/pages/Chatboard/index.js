import React, { useEffect, useState } from "react";
import "./chatboard.css";
import firebase from "../firebase";
import Login from "./Componet/Login/Login";
import New from "./New";

// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import reducer from "./Componet/Pageload/reducer/index";
// const store = createStore(reducer);

//
function Index() {
  return (
    <>
      {/* store={store} */}
      {/* <Provider> */}
      {/* <Login /> */}
      <New />
      {/* </Provider> */}
    </>
  );
}

export default Index;
