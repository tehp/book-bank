import React from "react";

import "../css/App.css";
import "../css/Picnic.css";

import Nav from "../components/Nav";

function Login() {
  return (
    <div className="App">
      <Nav />
      <div class="content">
        <h1>Login</h1>
        <fieldset class="flex two-800 one">
          <label>
            <input type="email" placeholder="Email"></input>
          </label>
          <label>
            <input type="password" placeholder="Password"></input>
          </label>
        </fieldset>
        <button>Login</button>
      </div>
    </div>
  );
}

export default Login;
