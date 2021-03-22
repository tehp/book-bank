import React from "react";

import "../css/App.css";
import "../css/Picnic.css";

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

    // const apiUrl = config.api.url + "/listings/" + id;
    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     this.setState({ listing: data });
    //   });
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

      console.log(content);
    })();
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <div class="content">
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
