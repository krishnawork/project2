import React, { useEffect, useState } from "react";
import "../index.css";
import Firebase from "../../firebase";
let db = Firebase.firestore();

function Journy() {
  const [journydata, setjournydata] = useState([]);
  const [Loadind, setLoadind] = useState("Loading");
  useEffect(() => {
    let x = localStorage.getItem("email");
    db.collection("web_user")
      .doc(x)
      .collection("Histry")
      .get()
      .then((result) => {
        if (!result.empty) {
          result.forEach((data) => {
            setjournydata((old) => [...old, data.data()]);
            console.log(data.data());
          });
        } else {
          setLoadind("Data Not Available");
        }
      });
    return () => {
      setLoadind("Loading");
    };
  }, []);

  return (
    <div>
      {journydata.length > 0
        ? journydata.map((d, index) => {
            return (
              <div className="col-12" key={index}>
                <div className="journey_box">
                  <p style={{ fontSize: "20px" }}>
                    service Name: <br /> {d.service_name}
                  </p>
                  <h6>service Type: {d.service_type}</h6>
                  <p> Session complet : {d.seassion}</p>
                  <h6>Date : {d.TimeNow}</h6>
                </div>
              </div>
            );
          })
        : Loadind}
    </div>
  );
}

export default Journy;
