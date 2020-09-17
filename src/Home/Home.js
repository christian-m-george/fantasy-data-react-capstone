import React, { Component } from "react";
import Player from "../Player/Player";
import './Home.css'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='home'>
        {/* <nav></nav> */}
        <h1 className='home-header'>Fantasy Data</h1>
        <section className="main">
          <h3>Top Fantasy Players</h3>
        </section>
        <section><Player /></section>
      </div>
    );
  }
}
