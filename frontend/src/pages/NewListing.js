import React from "react";

import "../css/App.css";
import "../css/Picnic.css";

import Nav from "../components/Nav";

import config from "../config.json";

class NewListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      location: "",
      book: "",
      duration: "",
      author: "",
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
      const apiUrl = config.api.url + "/listings";
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
        let listingURL = "/listing/" + content.body.listingID;
        console.log("redirecting to new post: " + listingURL);
        this.props.history.push(listingURL);
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
          <h1>New Listing</h1>
          <h4>Item Information</h4>

          <form class="flex two-800 one" onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                value={this.state.book}
                name="book"
                onChange={this.handleInputChange}
                placeholder="Book Title"
              ></input>
            </label>
            <label>
              <input
                type="text"
                value={this.state.author}
                name="author"
                onChange={this.handleInputChange}
                placeholder="Author"
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
            <label>
              <input
                type="text"
                value={this.state.duration}
                name="duration"
                onChange={this.handleInputChange}
                placeholder="Duration"
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
            <div>
              <input type="submit" value="Submit"></input>
            </div>
          </form>

          <h4>Photo of book (highly reccomended)</h4>
          <div style={{ width: 200 }}>
            <label class="dropimage">
              <input title="Drop image or click me" type="file"></input>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default NewListing;
