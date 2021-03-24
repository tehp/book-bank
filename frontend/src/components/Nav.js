import React from "react";
import logo from "../img/book.webp";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <header className="App-header">
        <nav>
          <Link class="brand" to="/">
            <img class="logo" src={logo} alt="logo" />
            <span>Book Bank</span>
          </Link>

          <input id="bmenub" type="checkbox" class="show"></input>
          <label for="bmenub" class="burger pseudo button">
            Menu
          </label>

          <div class="menu">
            <Link class="button success" to="/newlisting">
              New Listing
            </Link>
            <Link class="button success" to="/new-review">
              New Review
            </Link>
            <Link class="button success" to="/user-reviews">
              See Reviews
            </Link>
            <Link class="pseudo button" to="/login">
              Login
            </Link>
            <Link class="button" to="/register">
              Register
            </Link>
          </div>
        </nav>
      </header>
    );
  }
}

export default Nav;
