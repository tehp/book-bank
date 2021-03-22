import React from "react";

import book_placeholder from "../img/book.jpeg";

class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    const apiUrl = "https://api.github.com/users/tehp/repos";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let feed = data.map((id) => {
          return (
            <div key={id.name}>
              <article class="card">
                <img src={book_placeholder} alt={id.name}></img>
                <footer>
                  <h3>{id.name}</h3>
                  <p>David Foster Wallace</p>
                  <button>View</button>
                  <p>{this.state.feed}</p>
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
