import React from "react";

import Nav from "../components/Nav";

function Register() {
  return (
    <div className="App">
      <Nav />
      <div class="content">
        <h1>Register</h1>
        <fieldset class="flex two-800 one">
          <label>
            <input type="email" placeholder="Email"></input>
          </label>
          <label>
            <input type="password" placeholder="Password"></input>
          </label>
          <label>
            <input type="text" placeholder="Name"></input>
          </label>
          <label>
            <input type="text" placeholder="Location"></input>
          </label>
        </fieldset>
        <button>Register</button>
      </div>
    </div>
  );
}

export default Register;
