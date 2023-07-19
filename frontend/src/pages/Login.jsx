import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useUser } from "../context/user";
import Useraccount from "./Useraccount";
export default function Login() {
  const [verificationMessaget, setVerificationMessagett] = useState("");
  const { userState, UserLog } = useUser();
  const [logform, setlogform] = useState({
    email: "",
    password: "",
  });

  const loginform = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/ath/login",
       logform
      );

      Cookies.set("token", response.data.token);

     userState(true);
    } catch (error) {
     
      console.log(error.response.data);
     
    }
  };
  function HandleChange(event) {
    const { name, value } = event.target;

    setlogform((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }

  return (
    <div>
      {UserLog ? (
        <Useraccount />
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h2 className="text-center text-dark mt-5">Login Form</h2>
              
              <div className="card my-5">
                <form
                  className="card-body cardbody-color p-lg-5"
                  onSubmit={loginform}>
                  <div className="text-center">
                    <img
                      src="../assests/images/304977322_611153454041595_2432890234654814593_n.jpg"
                      className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                      width="200px"
                      alt="profile"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="Username"
                      name="email"
                      onChange={HandleChange}
                      value={logform.email}
                      aria-describedby="emailHelp"
                      placeholder="User Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={HandleChange}
                      name="password"
                      value={logform.password}
                      placeholder="password"
                    />
                  </div>
                  {verificationMessaget && (
                    <div
                      className={`alert alert-danger  mx-auto  alert-verification ${
                        verificationMessaget && "alertfadeup"
                      }`}
                      style={{ fontSize: "14px" }}
                      role="alert">
                      {verificationMessaget}
                    </div>
                  )}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-color px-5 mb-5 w-100">
                      Login
                    </button>
                  </div>
                  <div
                    id="emailHelp"
                    className="form-text text-center mb-5 text-dark">
                    Account Created By Kamel only{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
