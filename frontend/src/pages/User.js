import React from "react";

import "../css/App.css";
import "../css/Picnic.css";

import Nav from "../components/Nav";

import config from "../config.json";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      user_id: "",
    };
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    console.log("setting state id: " + id);
    this.setState({ user_id: id });
    console.log("state: " + this.state.user_id);

    // TODO: Fetch user

    // const apiUrl = config.api.url + "/users?userID=" + id;
    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({ user: data[0] });
    //     console.log(data);
    //   });
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <div class="content">
          {/* <h3>User: {this.state.user.name}</h3> */}
          <h3>User: {this.state.user_id}</h3>
        </div>
      </div>
    );
  }
}

export default User;
