import React, { Component } from "react";
import "./NavBar.css";

export default class Navbar extends Component {
  onLogout = (e) => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
  };

  // changeNav = () => {
  //   switch (window.location.pathname) {
  //     case "/watchlist":
  //       return "Home";
  //     case "/":
  //       return "Watchlist";
  //   }
  // };

  changeLogin = () => {
    if (window.location.pathname === "/login") {
      return;
    } else if (window.location.pathname === "/register") {
      return;
    } else {
      return "Logout";
    }
  };

  render() {
    // let navLink = this.changeNav();
    let logLink = this.changeLogin();

    // this.changeAnchor = () => {
    //   if (window.location.pathname === "/") {
    //     return <a href="/watchlist">{navLink}</a>;
    //   } else {
    //     return <a href="/">{navLink}</a>;
    //   }
    // };
    // let anchorChange = this.changeAnchor();

    return (
      <div className="main-nav">
        <div className="nav-left">
          <div className='home-link-wrapper'>
            <a href='/'>Home</a>
          </div>
          <div className='watchlist-link-wrapper'>
            <a href='/watchlist'>Watchlist</a>
          </div>
        </div>
        <div className="logout">
          <a href="/login" onClick={this.onLogout}>
            {logLink}
          </a>
        </div>
      </div>
    );
  }
}
