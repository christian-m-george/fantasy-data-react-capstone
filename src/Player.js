import React, { Component } from "react";
import config from "./config";
import PlayerDetail from './PlayerDetail'
// import ValidationError from "../validation-error";
// import AuthApiService from "../Services/auth-api-services";

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    console.log(config.API_ENDPOINT, "this is the endpoint");
    const searchURL = `${config.API_ENDPOINT}/api/player-data/player/all`;

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

    fetch(`${config.API_ENDPOINT}/api/watchlist/watchlist/1`, {
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
    console.log(this.state, "this is the state ");

    let showPlayers = "";

    if (this.state.players.length !== 0) {
      showPlayers = this.state.players.map((player, key) => {
        return (
          <div className="list" key={key}>
            <h3>{player.Name}</h3>
            <p>Team: {player.Team}</p>
            <p>Posiiton: {player.Position}</p>
            <p>ADP: {player.AverageDraftPosition}</p>
            <p>ADP PPR: {player.AverageDraftPositionPPR}</p>
            <p>Bye Week: {player.ByeWeek}</p>
            <p>Last Season FP: {player.LastSeasonFantasyPoints}</p>
            <p>Projected FP: {player.ProjectedFantasyPoints}</p>
            <PlayerDetail PlayerID={player.PlayerID}/>
            <form 
            onSubmit={this.handleAddToWatchlist} className="addToWatchlist"
            >
              <input type="hidden" name='playerId' defaultValue={player.PlayerID}></input> 
              <input type="hidden" name='userId' defaultValue={1}></input> 
              <button type="submit" className="addToWatchlist">Add to watchlist</button>
            </form>
          </div>
        );
      });
    }
    return <div>{showPlayers}</div>;
  }
}
