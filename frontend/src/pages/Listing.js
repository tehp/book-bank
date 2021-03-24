import React from "react";

import "../css/App.css";
import "../css/Picnic.css";

import book_placeholder from "../img/book.jpeg";

import Nav from "../components/Nav";

import config from "../config.json";

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      listing_id: "",
    };
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    console.log("setting state id: " + id);
    this.setState({ listing_id: id });
    console.log("state: " + this.state.listing_id);

    // TODO: Pull listing info and display it

    const apiUrl = config.api.url + "/listings?listingID=" + id;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ listing: data[0] });
        console.log(data);
      });
  }

  removeListing(id) {
    console.log("removing: " + id);

    (async () => {
      const apiUrl = config.api.url + "/listings";
      const rawResponse = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listingID: this.state.listing_id }),
      });
      const content = await rawResponse.json();

      if (content.statusCode === 200) {
        alert("Listing removed.");
        this.props.history.push("/");
      } else {
        // TODO: Error modal
      }
    })();
  }

  requestListing(id) {
    console.log("requesting: " + id);

    (async () => {
      const apiUrl = config.api.url + "/requests";
      const rawResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "johndoe",
          listing: this.state.listing_id,
        }),
      });
      const content = await rawResponse.json();

      console.log(content);

      if (content.statusCode === 200) {
        alert("Request sent.");
        this.props.history.push("/");
      } else {
        // TODO: Error modal
      }
    })();
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <div class="content">
          <img
            style={{ width: 500 }}
            src={book_placeholder}
            alt={this.state.listing.Book}
          ></img>
          <h3>{this.state.listing.Book}</h3>
          <p>Available for: {this.state.listing.Duration}</p>
          <p>Location: {this.state.listing.Location}</p>
          <p>Listing status: {this.state.listing.Status}</p>

          <button
            class=""
            onClick={this.requestListing.bind(this, this.state.listing_id)}
          >
            Request to borrow this listing
          </button>

          <br></br>

          <button
            class="error"
            onClick={this.removeListing.bind(this, this.state.listing_id)}
          >
            Delete this listing
          </button>
        </div>
      </div>
    );
  }
}

export default Listing;
