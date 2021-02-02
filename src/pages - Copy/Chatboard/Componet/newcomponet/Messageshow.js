import React from "react";
import ForumIcon from "@material-ui/icons/Forum";
import backgroundImage from "../../../../assets/images/header-back.jpg";

function Messageshow() {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100%",
          textAlign: "center",
        }}
      >
        <img
          src={backgroundImage}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            zIndex: "-1",
          }}
          alt=""
        />
        <ForumIcon
          style={{ marginTop: "200px", fontSize: "100px", color: "#005191" }}
        />
        <h5 style={{ fontWeight: "bold" }}>No Chats Found</h5>
        <h5 style={{ marginTop: "20px" }}>You currently have no chats setup</h5>
      </div>
    </div>
  );
}

export default Messageshow;
