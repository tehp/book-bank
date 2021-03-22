import logo from "../img/book.webp";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="App-header">
      <nav class="demo">
        <Link class="brand" to="/">
          <img class="logo" src={logo} />
          <span>Book Bank</span>
        </Link>

        <input id="bmenub" type="checkbox" class="show"></input>
        <label for="bmenub" class="burger pseudo button">
          Menu
        </label>

        <div class="menu">
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

export default Nav;
