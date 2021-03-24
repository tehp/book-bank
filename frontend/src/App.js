import React from "react";

import "./css/App.css";
import "./css/Picnic.css";

import Nav from "./components/Nav";
import Feed from "./components/Feed";

function App() {
  return (
    <div className="App">
      <Nav />

      <div class="content">
        <h2>
          Welcome to Book Bank: The peer to peer library for physical books.
        </h2>

        <Feed />
      </div>
    </div>
  );
}

export default App;
