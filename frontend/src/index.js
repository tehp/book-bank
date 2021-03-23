import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";

import HomePage from "./App";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import NewListingPage from "./pages/NewListing";
import ListingPage from "./pages/Listing";
import NewUserReview from "./pages/NewUserReview";
import UserReviewPage from "./pages/UserReview";
import UserPage from "./pages/User";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/newlisting" component={NewListingPage} />
      <Route exact path="/listing/:id" component={ListingPage} />
      <Route exact path="/user/:id" component={UserPage} />
      <Route exact path="/new-review" component={NewUserReview} />
      <Route exact path="/user-review/:id" component={UserReviewPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

