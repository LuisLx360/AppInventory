import React from "react";
import Navegation from "./navbar";
import "../App.css";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

const Inventory = () => {
  return (
    <>
      <Navegation />
      <img src={require("../assets/imgHome.png")} className="img-home" />
      <div className="body-inventory">
        <div className="container-box">
          <div className="button-box">
            <Link to="/toolmanager/e">
              <Button
                variant="outline-success"
                className="inventory-buttons"
                style={{
                  fontSize: "30px",
                }}
              >
                Enter Tool
              </Button>
            </Link>
          </div>
          <div className="button-box">
            <Link to={"/toolmanager/s"}>
              <Button
                variant="outline-danger"
                className="inventory-buttons"
                style={{
                  fontSize: "30px",
                }}
              >
                Remove Tool
              </Button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
