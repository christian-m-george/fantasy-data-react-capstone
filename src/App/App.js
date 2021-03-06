import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Link from "react-router-dom";
import Redirect from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from '../Home/Home';
import Watchlist from '../Watchlist/Watchlist';
import config from "../config";
import "./App.css";

class App extends Component {
  state = {
    user_id: "",
  };

  setUserId = (userId) => {
    this.setState({
      user_id: userId,
    });
  };

  render() {

    return (
      <div className="App">
        <Router>
          <main className="homepage">
            <Switch>
            <Route 
                path="/watchlist" 
                component={Watchlist} 
              />
            <Route
                path="/register"
                component={Register}
              />
              <Route
                exact
                path="/home"
                render={(props) => (
                  <Home {...props} userId={this.state.user_id} />
                )}
              />
              <Route
                path="/"
                render={(props) => (
                  <Login
                    {...props}
                    setUserId={(userId) => this.setUserId(userId)}
                  />
                )}
              />

              <Route 
                path="/home" 
                component={Home} 
              />
              

            </Switch>
          </main>
        </Router>
        <footer>
          <a
            href="https://www.linkedin.com/in/christian-m-george"
            className="linkedin-icon"
            target="_blank"
          >
            <i className="fa fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/christian-m-george"
            className="github-icon"
            target="_blank"
          >
            <i className="fa fa-github"></i>
            
          </a>
          <a
            href="https://christian-m-george.github.io/portfolio/"
            className="portfolio-icon"
            target="_blank"
          >
            <i className="fa fa-address-card"></i>
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
