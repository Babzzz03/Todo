import React, { useState } from "react";
import "./Login.css";
import avater from "./images/pngwing.com.png";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";

function Login() {
    const history = useHistory();
     const [email, setEmail] = useState("");
     const [password, setPasaword] = useState("");
      const [error, setError] = useState("");
      const [error2, setError2] = useState("");
      const [error3, setError3] = useState("");


 async function signIn(e) {
   e.preventDefault();

   axios
     .post(`https://babzz-todo.herokuapp.com/api/v1/tasks/login`, {
       email,
       password,
     })
     .then((response) => {
       localStorage.setItem("token", response.data.token);
       alert("Welcome back");
       history.push("/");
     })
     .catch((err) => {
       // The request was made and the server responded with a status code
       // that falls out of the range of 2xx
       if (err.response) {
         setError(err.response.data.msg);
         setError2(err.response.data.msg1);
         setError3(err.response.data.msg2);
       }
     });
 }


  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={avater} alt="" />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <p className={error ? "login__active__alert" : "login__alert"}>
          ! {error}
        </p>
        <div>
          <h5>E-mail</h5>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={error2 ? "login__active__alert" : "login__alert"}>
            {error2}
          </p>
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPasaword(e.target.value)}
          />
          <p className={error3 ? "login__active__alert" : "login__alert"}>
            {error3}
          </p>
          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </div>

        <p>sign in for security</p>
        <div className="create__account__container">
          <div className="line">
            <hr className="horizontal" />
            <h3 className="line__tag">New to us?</h3>
            <hr className="horizontal" />
          </div>
          <Link to="/register">
            <button className="login__registerButton">
              Create your Todo Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
