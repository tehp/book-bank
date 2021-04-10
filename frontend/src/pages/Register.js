import React from "react";

import Nav from "../components/Nav";

import config from "../config.json";

var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

var poolData = {
  UserPoolId: config.cognito.UserPoolId,
  ClientId: config.cognito.ClientId,
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      location: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Cognito register
    var attributeList = [];

    var dataEmail = {
      Name: "email",
      Value: this.state.email,
    };

    var dataLocale = {
      Name: "locale",
      Value: this.state.location,
    };

    var attributeLocale = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataLocale
    );
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataEmail
    );

    attributeList.push(attributeLocale);
    attributeList.push(attributeEmail);

    let url = "/user/" + this.state.username;

    userPool.signUp(
      this.state.username,
      this.state.password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        var cognitoUser = result.user;
        console.log("user name is " + cognitoUser.getUsername());

        // cognitoUser.getAttributeVerificationCode("email", {
        //   onSuccess: function (result) {
        //     console.log("call result: " + result);
        //     this.props.history.push(url);
        //   },
        //   onFailure: function (err) {
        //     alert(err.message || JSON.stringify(err));
        //   },
        //   inputVerificationCode: function () {
        //     console.log("verifying...");
        //     var verificationCode = prompt(
        //       "Please input verification code: ",
        //       ""
        //     );
        //     cognitoUser.verifyAttribute("email", verificationCode, this);
        //   },
        // });

        let code = prompt("What is your email verification code?");
        cognitoUser.confirmRegistration(code, true, function (err, result) {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          console.log("call result: " + result);
          if (result === "SUCCESS") {
            alert("Success, you may now log in.");
          }
        });
      }
    );
    //this.props.history.push(url);
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <div class="content">
          <h1>Register</h1>
          <form class="flex two-800 one" onSubmit={this.handleSubmit}>
            <label>
              <input
                type="email"
                value={this.state.email}
                name="email"
                onChange={this.handleInputChange}
                placeholder="Email"
              ></input>
            </label>
            <label>
              <input
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.handleInputChange}
                placeholder="Password"
              ></input>
            </label>
            <label>
              <input
                type="text"
                value={this.state.username}
                name="username"
                onChange={this.handleInputChange}
                placeholder="Username"
              ></input>
            </label>
            <label>
              <input
                type="text"
                value={this.state.location}
                name="location"
                onChange={this.handleInputChange}
                placeholder="Location"
              ></input>
            </label>
            <div>
              <input type="submit" value="Submit"></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
