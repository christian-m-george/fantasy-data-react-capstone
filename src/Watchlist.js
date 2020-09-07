import React, { Component } from "react";
import config from './config';
import ValidationError from "./validation-error";
import AuthApiService from "./Services/auth-api-services";

export default class Watchlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [],
      error: '',
    };
  }

  componentDidMount() {
    console.log(config.API_ENDPOINT, "this is the endpoint");
    const searchURL = `${config.API_ENDPOINT}/watchlist/watchlist/${window.localStorage.user_id}`;

    const options = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    };

    fetch(searchURL, options)
      .then((res) => {
        console.log(searchURL);
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.totalItems === 0) throw new Error("No players found");

        const players = data.map((player) => {
          const {
            AverageDraftPosition,
            AverageDraftPositionPPR,
            ByeWeek,
            LastSeasonFantasyPoints,
            Name,
            PlayerID,
            Position,
            ProjectedFantasyPoints,
            Team,
          } = player;

          return {
            AverageDraftPosition: AverageDraftPosition,
            AverageDraftPositionPPR: AverageDraftPositionPPR,
            ByeWeek: ByeWeek,
            LastSeasonFantasyPoints: LastSeasonFantasyPoints,
            Name: Name,
            PlayerID: PlayerID,
            Position: Position,
            ProjectedFantasyPoints: ProjectedFantasyPoints,
            Team: Team,
          };
        });

        this.setState({
          players: players,
          error: null,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  handleAddToWatchlist = (ev) => {
    console.log('event triggered');
    ev.preventDefault();

    const data = {}

    const formData = new FormData(ev.target)

    for (let value of formData) {
        data[value[0]] = value[1]
    }

    console.log(data, 'this is the data from event target')

    fetch(`${config.API_ENDPOINT}/watchlist/watchlist/1`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      this.setState({
        error: err.message,
      });
    });

  }

  render() {
    return (
        <div>
        <nav>Nav</nav>
        <h1>Fantasy Data</h1>
        <section>
          <h3>Your Watchlist</h3>
          <div className='player-list'>
            <div className='player-item'>
            <p> Player name</p><button>remove from watchlist</button>
            </div>
            <div className='player-item'>
            <p> Player name</p><button>remove from watchlist</button>
            </div>
            <div className='player-item'>
            <p> Player name</p><button>remove from watchlist</button>
            </div>
            <div className='player-item'>
            <p> Player name</p><button>remove from watchlist</button>
            </div>
            <div className='player-item'>
            <p> Player name</p><button>remove from watchlist</button>
            </div>
          </div>
        </section>
        </div>
    );
  }
}
