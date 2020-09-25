import React, { Component } from "react";

export default class Navbar extends Component {
  onLogout = (e) => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
  };

  changeLogin = () => {
    if (window.location.pathname === "/") {
      return;
    } else if (window.location.pathname === "/register") {
      return;
    } else {
      return "Logout";
    }
  };

  render() {
    let logLink = this.changeLogin();

    return (
      <div className="main-nav">
        <div className="nav-left">
          <span className='home-link-wrapper'>
            <a href='/home' className='nav-link'>Home</a>
          </span>
          <span className='watchlist-link-wrapper'>
            <a href='/watchlist' className='nav-link'>Watchlist</a>
          </span>
        </div>
        <div className="logout-wrapper">
          <a href="/login" className='logout-button' onClick={this.onLogout}>
            {logLink}
          </a>
        </div>
      </div>
    );
  }
}
