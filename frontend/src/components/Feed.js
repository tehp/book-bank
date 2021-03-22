import React from "react";
import book_placeholder from "../img/book.jpeg";

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
        let feed = data.body.map((id) => {
          return (
            <div key={id.ListingID}>
              <article class="card">
                <img src={book_placeholder} alt={id.name}></img>
                <footer>
                  <h3>{id.Book}</h3>
                  <p>by: David Foster Wallace</p>
                  <p>Location: {id.Location}</p>
                  <p>Posted by: {id.Username}</p>
                  <button>View</button>
                </footer>
              </article>
            </div>
          );
        });
        this.setState({ feed: feed });
        console.log(this.state.feed);
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
