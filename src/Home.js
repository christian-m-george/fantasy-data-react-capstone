import React, { Component } from "react";
import API_ENDPOINT from "./config";
import Player from "./Player";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        {/* <nav></nav> */}
        <h1>Fantasy Data</h1>
        <section className="main">
          <h3>Top Fantasy Players</h3>
        </section>
        <section><Player /></section>
      </div>
    );
  }
}
