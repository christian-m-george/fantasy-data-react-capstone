import React, { Component } from "react";
import config from '../config';
import './Watchlist.css'

export default class Watchlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [],
      error: '',
      showPlayerDetails: []
    };
  }

  componentDidMount() {
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

        const showPlayerDetails = data.map((onePlayerId) => {
          // console.log(onePlayerId.player_id)
          return this.renderWatchlistPlayers(onePlayerId.player_id)
        })

        this.setState({
          showPlayerDetails: showPlayerDetails,
        });
        // console.log(this.state)
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  handleAddToWatchlist = (ev) => {
    // console.log('event triggered');
    ev.preventDefault();

    const data = {}

    const formData = new FormData(ev.target)

    for (let value of formData) {
      data[value[0]] = value[1]
    }

    // console.log(data, 'this is the data from event target')

    fetch(`${config.API_ENDPOINT}/watchlist/watchlist/${window.localStorage.user_id}`, {
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

  renderWatchlistPlayers(playerId) {
    const searchURL = `${config.API_ENDPOINT}/player-detail/player/details/season/${playerId}`;
    // console.log(searchURL, "this is the endpoint");

    const options = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    };

    let output = [];

    fetch(searchURL, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        output.push(data)
        if (data.totalItems === 0) throw new Error("No players found");
        let existingPlayers = this.state.showPlayerDetails
        existingPlayers.push(data[0])
        this.setState({
          showPlayerDetails: existingPlayers,
          error: null,
        });
        // console.log(this.state.showPlayerDetails)
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  handleRemoveFromWatchlist = (ev) => {
    console.log('event triggered');
    ev.preventDefault();

    const data = {}

    const formData = new FormData(ev.target)

    for (let value of formData) {
      data[value[0]] = value[1]
    }

    console.log(data, 'this is the data from event target')

    fetch(`${config.API_ENDPOINT}/watchlist/${window.localStorage.getItem("user_id")}/${data.playerId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      // body: JSON.stringify(data)
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
      window.location ='/watchlist'
  }

  render() {
    // console.log(this.state)
    // let displayPlayerDetails = '';
    // if (this.state.showPlayerDetails.length != 0) {
    let displayPlayerDetails = this.state.showPlayerDetails.map((onePlayerDetail) => {
      console.log(onePlayerDetail)
      let shownDetails = '';
      if (onePlayerDetail != undefined) {
        switch (onePlayerDetail.Position) {
          case "QB":
            shownDetails = (
              <div className='watchlist-card' key={onePlayerDetail.PlayerID} id={onePlayerDetail.PlayerID}>
                <div className='player-title player-stat'>{onePlayerDetail.Name}, {onePlayerDetail.Position}</div>
                <div className='player-stat'>Activated: {onePlayerDetail.Activated},</div>
                <div className='player-stat'>Fumbles: {onePlayerDetail.Fumbles}</div>
                <div className='player-stat'>Number: {onePlayerDetail.Number}</div>
                <div className='player-stat'>OffensiveSnapsPlayed: {onePlayerDetail.OffensiveSnapsPlayed}</div>
                <div className='player-stat'>OffensiveTeamSnaps: {onePlayerDetail.OffensiveTeamSnaps}</div>
                <div className='player-stat'>OffensiveTouchdowns: {onePlayerDetail.OffensiveTouchdowns}</div>
                <div className='player-stat'>PassingAttempts: {onePlayerDetail.PassingAttempts}</div>
                <div className='player-stat'>PassingCompletionPercentage: {onePlayerDetail.PassingCompletionPercentage}</div>
                <div className='player-stat'>PassingCompletions: {onePlayerDetail.PassingCompletions}</div>
                <div className='player-stat'>PassingInterceptions: {onePlayerDetail.PassingInterceptions}</div>
                <div className='player-stat'>PassingLong: {onePlayerDetail.PassingLong}</div>
                <div className='player-stat'>PassingRating: {onePlayerDetail.PassingRating}</div>
                <div className='player-stat'>PassingSackYards: {onePlayerDetail.PassingSackYards}</div>
                <div className='player-stat'>PassingSacks: {onePlayerDetail.PassingSacks}</div>
                <div className='player-stat'>PassingTouchdowns: {onePlayerDetail.PassingTouchdowns}</div>
                <div className='player-stat'>PassingYards: {onePlayerDetail.PassingYards}</div>
                <div className='player-stat'>PassingYardsPerAttempt: {onePlayerDetail.PassingYardsPerAttempt}</div>
                <div className='player-stat'>PassingYardsPerCompletion: {onePlayerDetail.PassingYardsPerCompletion}</div>
                <div className='player-stat'>Played: {onePlayerDetail.Played}</div>
                <div className='player-stat'>Touchdowns: {onePlayerDetail.Touchdowns}</div>
                <div className='player-stat'>TwoPointConversionPasses: {onePlayerDetail.TwoPointConversionPasses}\</div>
                <div className='player-stat'>TwoPointConversionReceptions: {onePlayerDetail.TwoPointConversionReceptions}</div>
                <div className='player-stat'>TwoPointConversionReturns: {onePlayerDetail.TwoPointConversionReturns}</div>
                <div className='player-stat'>TwoPointConversionRuns: {onePlayerDetail.TwoPointConversionRuns}</div>
                <div className='button-wrapper'>
                  <form
                    onSubmit={this.handleRemoveFromWatchlist}
                    className="removeFromWatchlist"
                  >
                    <input type="hidden" name='playerId' defaultValue={onePlayerDetail.PlayerID}></input>
                    <input type="hidden" name='userId' defaultValue={window.localStorage.getItem("user_id")}></input>
                    <button type="submit" className="removeFromWatchlist">Remove from watchlist</button>
                  </form>
                </div>
              </div>
            )
            break;
          case "RB":
            shownDetails = (
              <div className='watchlist-card' key={onePlayerDetail.PlayerID} id={onePlayerDetail.PlayerID}>
                <div className='player-title player-stat'>{onePlayerDetail.Name}, {onePlayerDetail.Position}</div>
                <div className='player-stat'>Activated: {onePlayerDetail.Activated}</div>
                <div className='player-stat'>Fumbles: {onePlayerDetail.Fumbles}</div>
                <div className='player-stat'>FumblesLost: {onePlayerDetail.FumblesLost}</div>
                <div className='player-stat'>FumblesOutOfBounds: {onePlayerDetail.FumblesOutOfBounds}</div>
                <div className='player-stat'>FumblesOwnRecoveries: {onePlayerDetail.FumblesOwnRecoveries}</div>
                <div className='player-stat'>FumblesRecovered: {onePlayerDetail.FumblesRecovered}</div>
                <div className='player-stat'>Number: {onePlayerDetail.Number}</div>
                <div className='player-stat'>OffensiveSnapsPlayed: {onePlayerDetail.OffensiveSnapsPlayed}</div>
                <div className='player-stat'>OffensiveTeamSnaps: {onePlayerDetail.OffensiveTeamSnaps}</div>
                <div className='player-stat'>OffensiveTouchdowns: {onePlayerDetail.OffensiveTouchdowns}</div>
                <div className='player-stat'>Played: {onePlayerDetail.Played}</div>
                <div className='player-stat'>ReceivingLong: {onePlayerDetail.ReceivingLong}</div>
                <div className='player-stat'>ReceivingTargets: {onePlayerDetail.ReceivingTargets}</div>
                <div className='player-stat'>ReceivingTouchdowns: {onePlayerDetail.ReceivingTouchdowns}</div>
                <div className='player-stat'>ReceivingYards: {onePlayerDetail.ReceivingYards}</div>
                <div className='player-stat'>ReceivingYardsPerReception: {onePlayerDetail.ReceivingYardsPerReception}</div>
                <div className='player-stat'>ReceivingYardsPerTarget: {onePlayerDetail.ReceivingYardsPerTarget}</div>
                <div className='player-stat'>ReceptionPercentage: {onePlayerDetail.ReceptionPercentage}</div>
                <div className='player-stat'>Receptions: {onePlayerDetail.Receptions}</div>
                <div className='player-stat'>RushingAttempts: {onePlayerDetail.RushingAttempts}</div>
                <div className='player-stat'> RushingLong: {onePlayerDetail.RushingLong}</div>
                <div className='player-stat'>RushingTouchdowns: {onePlayerDetail.RushingTouchdowns}</div>
                <div className='player-stat'>RushingYards: {onePlayerDetail.RushingYards}</div>
                <div className='player-stat'>RushingYardsPerAttempt: {onePlayerDetail.RushingYardsPerAttempt}</div>
                <div className='player-stat'>Started: {onePlayerDetail.Started}</div>
                <div className='player-stat'>Touchdowns: {onePlayerDetail.Touchdowns}</div>
                <div className='player-stat'>TwoPointConversionPasses: {onePlayerDetail.TwoPointConversionPasses}</div>
                <div className='player-stat'> TwoPointConversionReceptions: {onePlayerDetail.TwoPointConversionReceptions}</div>
                <div className='player-stat'> TwoPointConversionRuns: {onePlayerDetail.TwoPointConversionRuns}</div>
                <div className='button-wrapper'>
                  <form
                    onSubmit={this.handleRemoveFromWatchlist}
                    className="removeFromWatchlist"
                  >
                    <input type="hidden" name='playerId' defaultValue={onePlayerDetail.PlayerID}></input>
                    <input type="hidden" name='userId' defaultValue={window.localStorage.getItem("user_id")}></input>
                    <button type="submit" className="removeFromWatchlist">Remove from watchlist</button>
                  </form>
                </div>
              </div>
            )
            break;
          case "WR":
            shownDetails = (
              <div className='watchlist-card' key={onePlayerDetail.PlayerID} id={onePlayerDetail.PlayerID}>
                <div className='player-title player-stat'>{onePlayerDetail.Name}, {onePlayerDetail.Position}</div>
                <div className='player-stat'>Activated: {onePlayerDetail.Activated}</div>
                <div className='player-stat'>Fumbles: {onePlayerDetail.Fumbles}</div>
                <div className='player-stat'>FumblesLost: {onePlayerDetail.FumblesLost}</div>
                <div className='player-stat'>FumblesOutOfBounds: {onePlayerDetail.FumblesOutOfBounds}</div>
                <div className='player-stat'>FumblesOwnRecoveries: {onePlayerDetail.FumblesOwnRecoveries}</div>
                <div className='player-stat'>FumblesRecovered: {onePlayerDetail.FumblesRecovered}</div>
                <div className='player-stat'>Number: {onePlayerDetail.Number}</div>
                <div className='player-stat'>OffensiveSnapsPlayed: {onePlayerDetail.OffensiveSnapsPlayed}</div>
                <div className='player-stat'>OffensiveTeamSnaps: {onePlayerDetail.OffensiveTeamSnaps}</div>
                <div className='player-stat'>OffensiveTouchdowns: {onePlayerDetail.OffensiveTouchdowns}</div>
                <div className='player-stat'>Played: {onePlayerDetail.Played}</div>
                <div className='player-stat'>ReceivingLong: {onePlayerDetail.ReceivingLong}</div>
                <div className='player-stat'>ReceivingTargets: {onePlayerDetail.ReceivingTargets}</div>
                <div className='player-stat'>ReceivingTouchdowns: {onePlayerDetail.ReceivingTouchdowns}</div>
                <div className='player-stat'>ReceivingYards: {onePlayerDetail.ReceivingYards}</div>
                <div className='player-stat'>ReceivingYardsPerReception: {onePlayerDetail.ReceivingYardsPerReception}</div>
                <div className='player-stat'>ReceivingYardsPerTarget: {onePlayerDetail.ReceivingYardsPerTarget}</div>
                <div className='player-stat'>ReceptionPercentage: {onePlayerDetail.ReceptionPercentage}</div>
                <div className='player-stat'>Receptions: {onePlayerDetail.Receptions}</div>
                <div className='player-stat'>RushingAttempts: {onePlayerDetail.RushingAttempts}</div>
                <div className='player-stat'>RushingLong: {onePlayerDetail.RushingLong}</div>
                <div className='player-stat'>RushingTouchdowns: {onePlayerDetail.RushingTouchdowns}</div>
                <div className='player-stat'>RushingYards: {onePlayerDetail.RushingYards}</div>
                <div className='player-stat'>RushingYardsPerAttempt: {onePlayerDetail.RushingYardsPerAttempt}</div>
                <div className='player-stat'>Started: {onePlayerDetail.Started}</div>
                <div className='player-stat'>Touchdowns: {onePlayerDetail.Touchdowns}</div>
                <div className='player-stat'>TwoPointConversionPasses: {onePlayerDetail.TwoPointConversionPasses}</div>
                <div className='player-stat'>TwoPointConversionReceptions: {onePlayerDetail.TwoPointConversionReceptions}</div>
                <div className='player-stat'>TwoPointConversionRuns: {onePlayerDetail.TwoPointConversionRuns}</div>
                <div className='button-wrapper'>
                  <form
                    onSubmit={this.handleRemoveFromWatchlist}
                    className="removeFromWatchlist"
                  >
                    <input type="hidden" name='playerId' defaultValue={onePlayerDetail.PlayerID}></input>
                    <input type="hidden" name='userId' defaultValue={window.localStorage.getItem("user_id")}></input>
                    <button type="submit" className="removeFromWatchlist">Remove from watchlist</button>
                  </form>
                </div>
              </div>
            )
            break;
          case "TE":
            shownDetails = (
              <div className='watchlist-card' key={onePlayerDetail.PlayerID} id={onePlayerDetail.PlayerID}>
                <div className='player-title player-stat'>{onePlayerDetail.Name}, {onePlayerDetail.Position}</div>
                <div className='player-stat'>Activated: {onePlayerDetail.Activated}</div>
                <div className='player-stat'>Fumbles: {onePlayerDetail.Fumbles}</div>
                <div className='player-stat'> FumblesLost: {onePlayerDetail.FumblesLost}</div>
                <div className='player-stat'>FumblesOutOfBounds: {onePlayerDetail.FumblesOutOfBounds}</div>
                <div className='player-stat'>FumblesOwnRecoveries: {onePlayerDetail.FumblesOwnRecoveries}</div>
                <div className='player-stat'>FumblesRecovered: {onePlayerDetail.FumblesRecovered}</div>
                <div className='player-stat'>Number: {onePlayerDetail.Number}</div>
                <div className='player-stat'>OffensiveSnapsPlayed: {onePlayerDetail.OffensiveSnapsPlayed}</div>
                <div className='player-stat'>OffensiveTeamSnaps: {onePlayerDetail.OffensiveTeamSnaps}</div>
                <div className='player-stat'>OffensiveTouchdowns: {onePlayerDetail.OffensiveTouchdowns}</div>
                <div className='player-stat'>Played: {onePlayerDetail.Played}</div>
                <div className='player-stat'>ReceivingLong: {onePlayerDetail.ReceivingLong}</div>
                <div className='player-stat'>ReceivingTargets: {onePlayerDetail.ReceivingTargets}</div>
                <div className='player-stat'>ReceivingTouchdowns: {onePlayerDetail.ReceivingTouchdowns}</div>
                <div className='player-stat'>ReceivingYards: {onePlayerDetail.ReceivingYards}</div>
                <div className='player-stat'>ReceivingYardsPerReception: {onePlayerDetail.ReceivingYardsPerReception}</div>
                <div className='player-stat'>ReceivingYardsPerTarget: {onePlayerDetail.ReceivingYardsPerTarget}</div>
                <div className='player-stat'>ReceptionPercentage: {onePlayerDetail.ReceptionPercentage}</div>
                <div className='player-stat'>Receptions: {onePlayerDetail.Receptions}</div>
                <div className='player-stat'>RushingAttempts: {onePlayerDetail.RushingAttempts}</div>
                <div className='player-stat'>RushingLong: {onePlayerDetail.RushingLong}</div>
                <div className='player-stat'>RushingTouchdowns: {onePlayerDetail.RushingTouchdowns}</div>
                <div className='player-stat'>RushingYards: {onePlayerDetail.RushingYards}</div>
                <div className='player-stat'>RushingYardsPerAttempt: {onePlayerDetail.RushingYardsPerAttempt}</div>
                <div className='player-stat'>Started: {onePlayerDetail.Started}</div>
                <div className='player-stat'>Touchdowns: {onePlayerDetail.Touchdowns}</div>
                <div className='player-stat'>TwoPointConversionPasses: {onePlayerDetail.TwoPointConversionPasses}</div>
                <div className='player-stat'>TwoPointConversionReceptions: {onePlayerDetail.TwoPointConversionReceptions}</div>
                <div className='player-stat'>TwoPointConversionRuns: {onePlayerDetail.TwoPointConversionRuns}</div>
                <div className='button-wrapper'>
                  <form
                    onSubmit={this.handleRemoveFromWatchlist}
                    className="removeFromWatchlist"
                  >
                    <input type="hidden" name='playerId' defaultValue={onePlayerDetail.PlayerID}></input>
                    <input type="hidden" name='userId' defaultValue={window.localStorage.getItem("user_id")}></input>
                    <button type="submit" className="removeFromWatchlist">Remove from watchlist</button>
                  </form>
                </div>
              </div>
            )
            break;
          case "K":
            shownDetails = (
              <div className='watchlist-card' key={onePlayerDetail.PlayerID} id={onePlayerDetail.PlayerID}>
                <div className='player-title player-stat'>{onePlayerDetail.Name}, {onePlayerDetail.Position}</div>
                <div className='player-stat'>Activated: {onePlayerDetail.Activated}</div>
                <div className='player-stat'>BlockedKicks: {onePlayerDetail.BlockedKicks}</div>
                <div className='player-stat'>FieldGoalPercentage: {onePlayerDetail.FieldGoalPercentage}</div>
                <div className='player-stat'>FieldGoalReturnTouchdowns: {onePlayerDetail.FieldGoalReturnTouchdowns}</div>
                <div className='player-stat'>FieldGoalReturnYards: {onePlayerDetail.FieldGoalReturnYards}</div>
                <div className='player-stat'>FieldGoalsAttempted: {onePlayerDetail.FieldGoalsAttempted}</div>
                <div className='player-stat'>FieldGoalsHadBlocked: {onePlayerDetail.FieldGoalsHadBlocked}</div>
                <div className='player-stat'>FieldGoalsLongestMade: {onePlayerDetail.FieldGoalsLongestMade}</div>
                <div className='player-stat'>FieldGoalsMade: {onePlayerDetail.FieldGoalsMade}</div>
                <div className='player-stat'>FieldGoalsMade0to19: {onePlayerDetail.FieldGoalsMade0to19}</div>
                <div className='player-stat'>FieldGoalsMade20to29: {onePlayerDetail.FieldGoalsMade20to29}</div>
                <div className='player-stat'>FieldGoalsMade30to39: {onePlayerDetail.FieldGoalsMade30to39}</div>
                <div className='player-stat'>FieldGoalsMade40to49: {onePlayerDetail.FieldGoalsMade40to49}</div>
                <div className='player-stat'>FieldGoalsMade50Plus: {onePlayerDetail.FieldGoalsMade50Plus}</div>
                <div className='player-stat'>ExtraPointsMade: {onePlayerDetail.ExtraPointsMade}</div>
                <div className='player-stat'>Number: {onePlayerDetail.Number}</div>
                <div className='player-stat'>Played: {onePlayerDetail.Played}</div>
                <div className='player-stat'>PuntAverage: {onePlayerDetail.PuntAverage}</div>
                <div className='player-stat'>PuntInside20: {onePlayerDetail.PuntInside20}</div>
                <div className='player-stat'>PuntLong: {onePlayerDetail.PuntLong}</div>
                <div className='player-stat'>PuntNetAverage: {onePlayerDetail.PuntNetAverage}</div>
                <div className='player-stat'>PuntNetYards: {onePlayerDetail.PuntNetYards}</div>
                <div className='player-stat'>PuntYards: {onePlayerDetail.PuntYards}</div>
                <div className='player-stat'>Punts: {onePlayerDetail.Punts}</div>
                <div className='player-stat'>PuntsHadBlocked: {onePlayerDetail.PuntsHadBlocked}</div>
                <div className='button-wrapper'>
                  <form
                    onSubmit={this.handleRemoveFromWatchlist}
                    className="removeFromWatchlist"
                  >
                    <input type="hidden" name='playerId' defaultValue={onePlayerDetail.PlayerID}></input>
                    <input type="hidden" name='userId' defaultValue={window.localStorage.getItem("user_id")}></input>
                    <button type="submit" className="removeFromWatchlist">Remove from watchlist</button>
                  </form>
                </div>
              </div>
            )
            break;
          default:
        }
        return shownDetails
        // (





        // <div className='watchlist-card' key={onePlayerDetail.PlayerID}>

        //   <div className='player-title player-stat'>{onePlayerDetail.Name}, {onePlayerDetail.Team}</div>
        //   <div className='player-stat'>AverageDraftPosition: {onePlayerDetail.AverageDraftPosition}</div>
        //   <div className='player-stat'>AverageDraftPositionPPR: {onePlayerDetail.AverageDraftPositionPPR}</div>
        //   <div className='player-stat'>ByeWeek: {onePlayerDetail.ByeWeek}</div>
        //   <div className='player-stat'>LastSeasonFantasyPoints: {onePlayerDetail.LastSeasonFantasyPoints}</div>
        //   {/* <div className='player-stat'>PlayerID: {onePlayerDetail.PlayerID}</div> */}
        //   <div className='player-stat'>Position: {onePlayerDetail.Position}</div>
        //   <div className='player-stat'>ProjectedFantasyPoints: {onePlayerDetail.ProjectedFantasyPoints}</div>
        // <div className='button-wrapper'>
        //   <form
        //     onSubmit={this.handleRemoveFromWatchlist}
        //     className="removeFromWatchlist"
        //   >
        //     <input type="hidden" name='playerId' defaultValue={onePlayerDetail.PlayerID}></input>
        //     <input type="hidden" name='userId' defaultValue={window.localStorage.getItem("user_id")}></input>
        //     <button type="submit" className="removeFromWatchlist">Remove from watchlist</button>
        //   </form>
        // </div>

        // </div>


        // )
      }
    })
    // }

    return (
      <div>
        <div className='watchlist-header-wrapper'>
          <h2>Your Watchlist</h2>
        </div>
        {displayPlayerDetails}
        {/* <nav>Nav</nav>
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
          </div> */}
        {/* </section> */}
      </div>
    );
  }
}


