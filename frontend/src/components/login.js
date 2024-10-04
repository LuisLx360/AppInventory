import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, password };
    console.log(data);

    try {
      const response = await axios.post(`http://localhost:3000/login`, data, {
        withCredentials: true,
      });
      console.log("Response:", response.data);

      if (response.data) {
        navigate("/homepage");
      }
    } catch (error) {
      console.error("Error:", error);

      alert("Error: Incorrect credentials.");
    }
  };

  return (
    <>
      <div className="col-8">
        <img
          src={require("../assets/herramientas1.jpg")}
          className="img-background"
        />
      </div>
      <div>
        <div>
          <form onSubmit={handleSubmit} className="form-container">
            <h2 className="text-center">Login</h2>
            <div className="form-group">
              <label htmlFor="text"></label>
              <input
                type="text"
                id="text"
                placeholder="Username"
                className="form-input"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button className="btn-submit" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
