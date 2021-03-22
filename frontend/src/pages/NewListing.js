import React from "react";

import "../css/App.css";
import "../css/Picnic.css";

import Nav from "../components/Nav";

function NewListing() {
  return (
    <div className="App">
      <Nav />
      <div class="content">
        <h1>New Listing</h1>
        <h4>Item Information</h4>
        <fieldset class="flex two-800 one">
          <label>
            <input type="text" placeholder="Book Title"></input>
          </label>
          <label>
            <input type="text" placeholder="Author"></input>
          </label>
          <label>
            <input type="text" placeholder="Location"></input>
          </label>
        </fieldset>
        <div class="menu">
          <select>
            <option>Paperback</option>
            <option>Hardcover</option>
          </select>
        </div>
        <h4>Photo of book (highly reccomended)</h4>
        <div style={{ width: 200 }}>
          <label class="dropimage">
            <input title="Drop image or click me" type="file"></input>
          </label>
        </div>
        <button>Post</button>
      </div>
    </div>
  );
}

export default NewListing;
