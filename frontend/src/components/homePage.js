import React from "react";
import Navegation from "./navbar";
import "../App.css";

const HomePage = () => {
  return (
    <>
      <Navegation />;
      <div className="col-8">
        <img src={require("../assets/imgHome.png")} className="img-home" />
        <div className="body-text">
          Welcome to the tool inventory management app.
          <div className="body-description">
            You can find all the features you need in the header of the page...
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default HomePage;
