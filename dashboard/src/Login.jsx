
import React, { useState } from "react";
import "./index.css"
const Login = ({ onLogin }) => {
  const [pin, setPin] = useState("");

  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div id="login-body">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input type="password" value={pin} onChange={handlePinChange} />
            <label>Password</label>
          </div>
          <a href="#" type="submit">
            <span />
            <span />
            <span />
            <span />
            <button className="btn btn-outline-none btn-bg-transparent">Submit</button>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
