import React from "react";

import Nav from "../components/Nav";

import config from "../config.json";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      location: "",
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
    (async () => {
      const apiUrl = config.api.url + "/users";
      const rawResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      });
      const content = await rawResponse.json();

      if (content.statusCode === 200) {
        let url = "/user/" + content.body.username;
        console.log("redirecting to new user: " + url);
        this.props.history.push(url);
      } else {
        // TODO: Error modal
      }
    })();

    event.preventDefault();
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

// function Register() {
//   return (
//     <div className="App">
//       <Nav />
//       <div class="content">
//         <h1>Register</h1>
//         <fieldset class="flex two-800 one">
//           <label>
//             <input type="email" placeholder="Email"></input>
//           </label>
//           <label>
//             <input type="password" placeholder="Password"></input>
//           </label>
//           <label>
//             <input type="text" placeholder="Name"></input>
//           </label>
//           <label>
//             <input type="text" placeholder="Location"></input>
//           </label>
//         </fieldset>
//         <button>Register</button>
//       </div>
//     </div>
//   );
// }

// export default Register;
