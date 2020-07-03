import React, { Component } from "react";
import ValidationError from "../validation-error";
import AuthApiService from "../Services/auth-api-services";

export default class Player extends Component {
  render() {
    return (
      <div>
        <h1>Player page</h1>
        <section>
          <div class="name">
            <p>Player name</p>
          </div>
          <div class="headshot">
            <p>player headshot</p>
          </div>
          <div class="stats">
            <p>Team</p>
            <p>Position</p>
            <p>ADP</p>
            <p>Last Season stats</p>
            <p>Projected Season stats</p>
          </div>
        </section>
        <script src="script.js"></script>
      </div>
    );
  }
}
