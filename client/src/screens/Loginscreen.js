import React, { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  async function login() {
    const user = {
      email,
      password
    };
    try {
      seterror(false);
      setloading(true);
      const result = (await axios.post("/api/users/login", user)).data;
      setloading(false);
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }

  return (
    <div className="container">
      {loading && <Loader />}
      <div className="row justify-content-center mt-5" style={{animationName:'floating',animationDuration:'2s',animationIterationCount:'2',animationTimingFunction:'ease-in-out'}}>
        <div className="col-md-5 m-5 bs">
          {error && <Error />}
          <div >
            <h1 className="row justify-content-center">Login to your account</h1>
            <br/>
            <input
              type="email"
              className="form-control form-control-lg mt-2"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control form-control-lg mt-2"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <div style={{ textAlign: "center" }} className="m-3">
              <button className="btn btn-warning mt-2 btn-lg" onClick={login}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
