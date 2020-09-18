import React, { Component } from "react";
import Player from "../Player/Player";
import NavBar from "../NavBar/NavBar";
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
        <NavBar />
        <div className='home-header-wrapper'>
        <h1 className='home-header'>Fantasy Data</h1>
        </div>
        <section className="main">
          <div className='top-players-title-wrapper'>
          <h3 className='top-players-title'>Top Fantasy Players</h3>
        </div>
        </section>
        <section className='player-list-wrapper'><Player /></section>
      </div>
    );
  }
}
