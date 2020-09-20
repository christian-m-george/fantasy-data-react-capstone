import React, { Component } from "react";
import config from "../config";
import PlayerDetail from '../PlayerDetail/PlayerDetail';
import './Player.css'
// import ValidationError from "../validation-error";
// import AuthApiService from "../Services/auth-api-services";

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      watchlistPlayers: []
    };
  }

  componentDidMount() {
    // console.log(config.API_ENDPOINT, "this is the endpoint");
    this.checkWatchlist()
    const searchURL = `${config.API_ENDPOINT}/player-data/player/players`;

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
            average_draft_position,
            average_draft_position_ppr,
            bye_week,
            last_season_fantasy_points,
            player_name,
            player_id,
            position,
            projected_fantasy_points,
            team,
          } = player;

          return {
            AverageDraftPosition: average_draft_position,
            AverageDraftPositionPPR: average_draft_position_ppr,
            ByeWeek: bye_week,
            LastSeasonFantasyPoints: last_season_fantasy_points,
            Name: player_name,
            PlayerID: player_id,
            Position: position,
            ProjectedFantasyPoints: projected_fantasy_points,
            Team: team,
          };
        });
        console.log(players, 'this is players log')


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

    fetch(`${config.API_ENDPOINT}/watchlist/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      return response.json()
    })
    .then(console.log(this.state, 'first log'))
    .then(playerJson => this.setState({watchlistPlayers: [...this.state.watchlistPlayers, playerJson.player_id]}))
    .then(console.log(this.state), 'second log')
    .catch((err) => {
      this.setState({
        error: err.message,
      });
    });
    // window.location = '/'
  }













  checkWatchlist() {
    // console.log(config.API_ENDPOINT, "this is the endpoint");
    const searchURL = `${config.API_ENDPOINT}/watchlist/${window.localStorage.getItem("user_id")}`;

    const options = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    };

    fetch(searchURL, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.totalItems === 0) throw new Error("No players found");

        let watchlistArray = data.map(data => {
          return data.player_id
        })

        this.setState({
          watchlistPlayers: watchlistArray,
        });
        console.log(this.state)
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
        let watchlistPlayerArray = this.state.watchlistPlayers
        // console.log(watchlistPlayerArray, 'this is watchlist player array')
        if (!watchlistPlayerArray.includes(player.PlayerID)) {
          return (
            <div className="list player-card" key={key} id={key}>
              <p className='player-title'>{player.Name}, {player.Team}</p>
              {/* <p className='player-stat'>Team: {player.Team}</p> */}
              <p className='player-stat'>Position: {player.Position}</p>
              <p className='player-stat'>ADP: {player.AverageDraftPosition}</p>
              <p className='player-stat'>ADP PPR: {player.AverageDraftPositionPPR}</p>
              <p className='player-stat'>Bye Week: {player.ByeWeek}</p>
              <p className='player-stat'>Last Season FP: {player.LastSeasonFantasyPoints}</p>
              <p className='player-stat'>Projected FP: {player.ProjectedFantasyPoints}</p>
              <div className='button-wrapper'>
              {/* <PlayerDetail PlayerID={player.PlayerID}/> */}
              <form 
              onSubmit={this.handleAddToWatchlist} className="add-to-watchlist"
              >
                <input type="hidden" name='playerId' defaultValue={player.PlayerID}></input> 
                <input type="hidden" name='userId' defaultValue={window.localStorage.getItem("user_id")}></input> 
                <button type="submit" className="add-to-watchlist">Add to watchlist</button>
              </form>
              </div>
            </div>
          );
        }
        else {
          return (
          <div className="list player-card" key={key} id={key}>
          <p className='player-title'>{player.Name}, {player.Team}</p>
          {/* <p className='player-stat'>Team: {player.Team}</p> */}
          <p className='player-stat'>Position: {player.Position}</p>
          <p className='player-stat'>ADP: {player.AverageDraftPosition}</p>
          <p className='player-stat'>ADP PPR: {player.AverageDraftPositionPPR}</p>
          <p className='player-stat'>Bye Week: {player.ByeWeek}</p>
          <p className='player-stat'>Last Season FP: {player.LastSeasonFantasyPoints}</p>
          <p className='player-stat'>Projected FP: {player.ProjectedFantasyPoints}</p>
          <div className='button-wrapper'>
          {/* <PlayerDetail PlayerID={player.PlayerID}/> */}
          <div className='added-to-watchlist-wrapper'>
            {/* <input type="hidden" name='playerId' defaultValue={player.PlayerID}></input> 
            <input type="hidden" name='userId' defaultValue={window.localStorage.getItem("user_id")}></input>  */}
            <div className="added-to-watchlist">Added</div>
          </div>
          </div>
        </div>
          )
        }
      });
    }
    return <div>{showPlayers}</div>;
  }
}
