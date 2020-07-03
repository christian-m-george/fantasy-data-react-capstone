import React, { Component } from "react";
import ValidationError from "../validation-error";
import AuthApiService from "../Services/auth-api-services";

export default class Player extends Component {
  render() {
    return (
        <div>
        <nav>Nav</nav>
        <h1>Fantasy Data</h1>
        <section>
          <h3>Your Watchlist</h3>
          <div class='player-list'>
            <div class='player-item'>
            <p> Player name</p><button>remove from watchlist</button>
            </div>
            <div class='player-item'>
            <p> Player name</p><button>remove from watchlist</button>
            </div>
            <div class='player-item'>
            <p> Player name</p><button>remove from watchlist</button>
            </div>
            <div class='player-item'>
            <p> Player name</p><button>remove from watchlist</button>
            </div>
            <div class='player-item'>
            <p> Player name</p><button>remove from watchlist</button>
            </div>
          </div>
        </section>
        </div>
    );
  }
}
