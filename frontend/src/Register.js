import React, { useState } from "react";
import "./Login.css";
import "./Register.css";
import avater from "./images/pngwing.com.png";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";

function Register() {
      
      const history = useHistory();
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPasaword] = useState("");
      const [error, setError] = useState("");
      const [error2, setError2] = useState("");
      const [error3, setError3] = useState("");
      const [error4, setError4] = useState("");
   
console.log(name)
    

      async function register(e) {
        e.preventDefault();

        axios
          .post(`https://babzz-todo.herokuapp.com/api/v1/tasks/register`, {
            name,
            email,
            password,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            alert("Welcome");
            history.push("/");
          })
          .catch((err) => {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (err.response) {
              setError4(err.response.data.msg);
              setError(err.response.data.msg1);
              setError2(err.response.data.msg2);
              setError3(err.response.data.msg3);
            }
          });
      }

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={avater} alt="" />
      </Link>
      <div className="login__container">
        <h1>Sign-Up</h1>
        <p className={error4 ? "create__active__alert2" : "create__alert2"}>
          {error4}
        </p>
        <div>
          <h5>Username</h5>
          <input
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className={error3 ? "create__active__alert1" : "create__alert1"}>
            {error3}
          </p>
          <h5>E-mail</h5>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={error ? "create__active__alert2" : "create__alert2"}>
            {error}
          </p>
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPasaword(e.target.value)}
          />
          <p className={error2 ? "create__active__alert2" : "create__alert2"}>
            {error2}
          </p>
          <button
            type="submit"
            onClick={register}
            className="login__signInButton"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
