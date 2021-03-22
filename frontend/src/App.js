import React from "react";

import book_placeholder from "./img/book.jpeg";

import "./css/App.css";
import "./css/Picnic.css";

import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />

      <div class="content">
        <h2>
          Welcome to Book Bank: The peer to peer library for physical books.
        </h2>

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
          <div>
            <article class="card">
              <img src={book_placeholder}></img>
              <footer>
                <h3>Infinite Jest</h3>
                <p>David Foster Wallace</p>
                <button>View</button>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
