import React from "react";
import * as AWS from "aws-sdk/global";

import "../css/App.css";
import "../css/Picnic.css";

import Nav from "../components/Nav";

import config from "../config.json";

var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

var poolData = {
  UserPoolId: config.cognito.UserPoolId,
  ClientId: config.cognito.ClientId,
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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

    console.log("submit login");

    var authenticationData = {
      Username: this.state.username,
      Password: this.state.password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );
    var userData = {
      Username: this.state.username,
      Pool: userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();

        AWS.config.region = "us-east-1";

        const credentialKey = `cognito-idp.us-east-1.amazonaws.com/${config.cognito.UserPoolId}`

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: config.cognito.IdentityPoolId, // your identity pool id here
          Logins: {
            [credentialKey]: result
              .getIdToken()
              .getJwtToken(),
          },
        });

        AWS.config.credentials.refresh((error) => {
          if (error) {
            console.error(error);
          } else {
            // Instantiate aws sdk service objects now that the credentials have been updated.
            console.log("Successfully logged! token: " + accessToken);
          }
        });
      },

      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <div class="content">
          <h1>Login</h1>
          <form class="flex two-800 one" onSubmit={this.handleSubmit}>
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
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.handleInputChange}
                placeholder="Password"
              ></input>
            </label>
            <div>
              <input type="submit" value="Login"></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
