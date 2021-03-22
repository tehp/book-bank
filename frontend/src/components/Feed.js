import React from "react";
import book_placeholder from "../img/book.jpeg";

import { Link } from "react-router-dom";

import config from "../config.json";

class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    const apiUrl = config.api.url + "/listings";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let feed = "";
        if (Object.keys(data).length === 0) {
          feed =
            "Uh oh. Looks like there aren't any books available for this search.";
        } else {
          feed = data.map((id) => {
            console.log(id.ListingID);
            let listingURL = "/listing/" + id.ListingID;
            return (
              <div key={id.ListingID}>
                <article class="card">
                  <img src={book_placeholder} alt={id.name}></img>
                  <footer>
                    <h3>{id.Book}</h3>
                    <p>by: David Foster Wallace</p>
                    <p>Location: {id.Location}</p>
                    <p>Posted by: {id.Username}</p>
                    <div>
                      <Link class="" to={listingURL}>
                        <button>View</button>
                      </Link>
                    </div>
                    <div>
                      <Link class="" to={listingURL}>
                        <button class="error">Remove</button>
                      </Link>
                    </div>
                  </footer>
                </article>
              </div>
            );
          });
        }

        console.log("feed" + feed);

        this.setState({ feed: feed });
      });
  }

  render() {
    return (
      <div>
        <div class="flex three-800 one">
          <div>
            <input type="text" placeholder="Book"></input>
          </div>
          <div>
            <input type="text" placeholder="Location"></input>
          </div>
          <div class="menu">
            <select>
              <option>Novels</option>
              <option>Textbooks</option>
              <option>Magazines</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div class="results flex four-1100 three-800 two-500 one">
          {this.state.feed}
        </div>
      </div>
    );
  }
}

export default Feed;
