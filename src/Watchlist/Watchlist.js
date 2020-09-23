import React, { Component } from "react";
import config from '../config';
import NavBar from "../NavBar/NavBar";
import './Watchlist.css'

export default class Watchlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [],
      error: '',
      hasHistoricData: null,
      showPlayerDetails: []
    };
  }

  componentDidMount() {
    // console.log(config.API_ENDPOINT, "this is the endpoint");
    const searchURL = `${config.API_ENDPOINT}/watchlist/${window.localStorage.getItem("user_id")}`;
    fetch(searchURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length === 0) throw new Error("No players found");
        else {

        // const showPlayerDetails = data.map((onePlayerId) => {
        //   return this.renderWatchlistPlayers(onePlayerId.player_id)
        data.map((onePlayerId) => {
          return this.renderWatchlistPlayers(onePlayerId.player_id)
        }
        )}
      // .then(console.log(this.state, 'this is state after component did mount'))
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  removePlayer = (removePlayerId) => {
    console.log(removePlayerId, 'this is remove player id')
    console.log(this.state, 'this is show player deets')
    let filteredArray = this.state.showPlayerDetails.filter(player => {
      console.log(removePlayerId, player.PlayerID)
      return player.PlayerID !== removePlayerId
    })
    console.log(filteredArray, 'this is filtered array')
    this.setState({ showPlayerDetails: filteredArray });
    console.log(this.state, 'final state')
  }

  // handleAddToWatchlist = (ev) => {
  //   // console.log('event triggered');
  //   ev.preventDefault();

  //   const data = {}

  //   const formData = new FormData(ev.target)

  //   for (let value of formData) {
  //     data[value[0]] = value[1]
  //   }

  //   // console.log(data, 'this is the data from event target')

  //   fetch(`${config.API_ENDPOINT}/watchlist/watchlist/${window.localStorage.user_id}`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       this.setState({
  //         error: err.message,
  //       });
  //     });
  // }

  renderWatchlistPlayers(playerId) {
    const searchURL = `${config.API_ENDPOINT}/player-detail/player/details/season/${playerId}`;
    console.log(searchURL, "this is the endpoint");

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
        console.log(data, 'this is data from detail fetch');
        output.push(data)
        if (data.length === 0) {
          this.setState({
            hasHistoricData: false
          });
          }
        else {
        // let existingPlayers = []
        let existingPlayers = this.state.showPlayerDetails
        existingPlayers.push(data[0])
        this.setState({
          showPlayerDetails: existingPlayers,
          error: null,
        });
      }
        // console.log(this.state.showPlayerDetails)
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  handleRemoveFromWatchlist = (removePlayerId, ev) => {
    console.log('event triggered');
    ev.preventDefault();
    fetch(`${config.API_ENDPOINT}/watchlist/${window.localStorage.getItem("user_id")}/${removePlayerId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(() =>  {
        this.removePlayer(removePlayerId)
      }
      )
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });

  }

  render() {
    // console.log(this.state)
    // let displayPlayerDetails = '';
    // if (this.state.showPlayerDetails.length != 0) {
    // if (this.state.hasHistoricData) {

    // }
    // else {

    // }
    let displayPlayerDetails = this.state.showPlayerDetails.map((onePlayerDetail) => {
      // console.log(onePlayerDetail)
      let shownDetails = '';
      if (onePlayerDetail != undefined) {
        switch (onePlayerDetail.Position) {
          case "QB":
            shownDetails = (
              <div className='watchlist-card' key={onePlayerDetail.PlayerID} id={onePlayerDetail.PlayerID}>
                <div className='player-title'>{onePlayerDetail.Name}, {onePlayerDetail.Position} - {onePlayerDetail.Team}</div>
                <div className='player-stat'>Activated: {onePlayerDetail.Activated},</div>
                <div className='player-stat'>Fumbles: {onePlayerDetail.Fumbles}</div>
                <div className='player-stat'>Number: {onePlayerDetail.Number}</div>
                <div className='player-stat'>Offensive Snaps Played: {onePlayerDetail.OffensiveSnapsPlayed}</div>
                <div className='player-stat'>Passing Attempts: {onePlayerDetail.PassingAttempts}</div>
                <div className='player-stat'>Passing Completion Percentage: {onePlayerDetail.PassingCompletionPercentage}</div>
                <div className='player-stat'>Passing Completions: {onePlayerDetail.PassingCompletions}</div>
                <div className='player-stat'>Passing Interceptions: {onePlayerDetail.PassingInterceptions}</div>
                <div className='player-stat'>Passing Long: {onePlayerDetail.PassingLong}</div>
                <div className='player-stat'>Passing Rating: {onePlayerDetail.PassingRating}</div>
                <div className='player-stat'>Passing SackYards: {onePlayerDetail.PassingSackYards}</div>
                <div className='player-stat'>Passing Sacks: {onePlayerDetail.PassingSacks}</div>
                <div className='player-stat'>Passing Touchdowns: {onePlayerDetail.PassingTouchdowns}</div>
                <div className='player-stat'>Passing Yards: {onePlayerDetail.PassingYards}</div>
                <div className='player-stat'>Passing Yards Per Attempt: {onePlayerDetail.PassingYardsPerAttempt}</div>
                <div className='player-stat'>Passing Yards Per Completion: {onePlayerDetail.PassingYardsPerCompletion}</div>
                <div className='player-stat'>Played: {onePlayerDetail.Played}</div>
                <div className='player-stat'>Touchdowns: {onePlayerDetail.Touchdowns}</div>
                <div className='player-stat'>Two Point Conversion Passes: {onePlayerDetail.TwoPointConversionPasses}\</div>
                <div className='player-stat'>Two Point Conversion Runs: {onePlayerDetail.TwoPointConversionRuns}</div>
                <div className='button-wrapper'>
                  <form
                    onSubmit={(ev) => this.handleRemoveFromWatchlist(onePlayerDetail.PlayerID, ev)}
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
                <div className='player-title'>{onePlayerDetail.Name}, {onePlayerDetail.Position} - {onePlayerDetail.Team}</div>
                <div className='player-stat'>Activated: {onePlayerDetail.Activated}</div>
                <div className='player-stat'>Fumbles: {onePlayerDetail.Fumbles}</div>
                <div className='player-stat'>Fumbles Lost: {onePlayerDetail.FumblesLost}</div>
                <div className='player-stat'>Fumbles Out Of Bounds: {onePlayerDetail.FumblesOutOfBounds}</div>
                <div className='player-stat'>Fumbles Own Recoveries: {onePlayerDetail.FumblesOwnRecoveries}</div>
                <div className='player-stat'>Fumbles Recovered: {onePlayerDetail.FumblesRecovered}</div>
                <div className='player-stat'>Number: {onePlayerDetail.Number}</div>
                <div className='player-stat'>Offensive Snaps Played: {onePlayerDetail.OffensiveSnapsPlayed}</div>
                <div className='player-stat'>Played: {onePlayerDetail.Played}</div>
                <div className='player-stat'>Receiving Long: {onePlayerDetail.ReceivingLong}</div>
                <div className='player-stat'>Receiving Targets: {onePlayerDetail.ReceivingTargets}</div>
                <div className='player-stat'>Receiving Touchdowns: {onePlayerDetail.ReceivingTouchdowns}</div>
                <div className='player-stat'>Receiving Yards: {onePlayerDetail.ReceivingYards}</div>
                <div className='player-stat'>Receiving Yards Per Reception: {onePlayerDetail.ReceivingYardsPerReception}</div>
                <div className='player-stat'>Receiving Yards Per Target: {onePlayerDetail.ReceivingYardsPerTarget}</div>
                <div className='player-stat'>Reception Percentage: {onePlayerDetail.ReceptionPercentage}</div>
                <div className='player-stat'>Receptions: {onePlayerDetail.Receptions}</div>
                <div className='player-stat'>Rushing Attempts: {onePlayerDetail.RushingAttempts}</div>
                <div className='player-stat'>Rushing Long: {onePlayerDetail.RushingLong}</div>
                <div className='player-stat'>Rushing Touchdowns: {onePlayerDetail.RushingTouchdowns}</div>
                <div className='player-stat'>Rushing Yards: {onePlayerDetail.RushingYards}</div>
                <div className='player-stat'>Rushing Yards Per Attempt: {onePlayerDetail.RushingYardsPerAttempt}</div>
                <div className='player-stat'>Started: {onePlayerDetail.Started}</div>
                <div className='player-stat'>Touchdowns: {onePlayerDetail.Touchdowns}</div>
                <div className='player-stat'>Two Point Conversion Receptions: {onePlayerDetail.TwoPointConversionReceptions}</div>
                <div className='player-stat'>TwoPoint Conversion Runs: {onePlayerDetail.TwoPointConversionRuns}</div>
                <div className='button-wrapper'>
                  <form
                    onSubmit={(ev) => this.handleRemoveFromWatchlist(onePlayerDetail.PlayerID, ev)}
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
                <div className='player-title'>{onePlayerDetail.Name}, {onePlayerDetail.Position} - {onePlayerDetail.Team}</div>
                <div className='player-stat'>Activated: {onePlayerDetail.Activated}</div>
                <div className='player-stat'>Fumbles: {onePlayerDetail.Fumbles}</div>
                <div className='player-stat'>Fumbles Lost: {onePlayerDetail.FumblesLost}</div>
                <div className='player-stat'>Fumbles OutOf Bounds: {onePlayerDetail.FumblesOutOfBounds}</div>
                <div className='player-stat'>Fumbles Own Recoveries: {onePlayerDetail.FumblesOwnRecoveries}</div>
                <div className='player-stat'>Fumbles Recovered: {onePlayerDetail.FumblesRecovered}</div>
                <div className='player-stat'>Number: {onePlayerDetail.Number}</div>
                <div className='player-stat'>Offensive Snaps Played: {onePlayerDetail.OffensiveSnapsPlayed}</div>
                <div className='player-stat'>Played: {onePlayerDetail.Played}</div>
                <div className='player-stat'>Receiving Long: {onePlayerDetail.ReceivingLong}</div>
                <div className='player-stat'>Receiving Targets: {onePlayerDetail.ReceivingTargets}</div>
                <div className='player-stat'>Receiving Touchdowns: {onePlayerDetail.ReceivingTouchdowns}</div>
                <div className='player-stat'>Receiving Yards: {onePlayerDetail.ReceivingYards}</div>
                <div className='player-stat'>Receiving YardsPer Reception: {onePlayerDetail.ReceivingYardsPerReception}</div>
                <div className='player-stat'>Receiving Yards Per Target: {onePlayerDetail.ReceivingYardsPerTarget}</div>
                <div className='player-stat'>Reception Percentage: {onePlayerDetail.ReceptionPercentage}</div>
                <div className='player-stat'>Receptions: {onePlayerDetail.Receptions}</div>
                <div className='player-stat'>Rushing Attempts: {onePlayerDetail.RushingAttempts}</div>
                <div className='player-stat'>Rushing Long: {onePlayerDetail.RushingLong}</div>
                <div className='player-stat'>Rushing Touchdowns: {onePlayerDetail.RushingTouchdowns}</div>
                <div className='player-stat'>Rushing Yards: {onePlayerDetail.RushingYards}</div>
                <div className='player-stat'>Rushing Yards Per Attempt: {onePlayerDetail.RushingYardsPerAttempt}</div>
                <div className='player-stat'>Started: {onePlayerDetail.Started}</div>
                <div className='player-stat'>Touchdowns: {onePlayerDetail.Touchdowns}</div>
                <div className='player-stat'>TwoPoint ConversionReceptions: {onePlayerDetail.TwoPointConversionReceptions}</div>
                <div className='player-stat'>Two Point Conversion Runs: {onePlayerDetail.TwoPointConversionRuns}</div>
                <div className='button-wrapper'>
                  <form
                    onSubmit={(ev) => this.handleRemoveFromWatchlist(onePlayerDetail.PlayerID, ev)}
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
                <div className='player-title'>{onePlayerDetail.Name}, {onePlayerDetail.Position} - {onePlayerDetail.Team}</div>
                <div className='player-stat'>Activated: {onePlayerDetail.Activated}</div>
                <div className='player-stat'>Fumbles: {onePlayerDetail.Fumbles}</div>
                <div className='player-stat'>Fumbles Lost: {onePlayerDetail.FumblesLost}</div>
                <div className='player-stat'>Fumbles Out Of Bounds: {onePlayerDetail.FumblesOutOfBounds}</div>
                <div className='player-stat'>Fumbles Own Recoveries: {onePlayerDetail.FumblesOwnRecoveries}</div>
                <div className='player-stat'>Fumbles Recovered: {onePlayerDetail.FumblesRecovered}</div>
                <div className='player-stat'>Number: {onePlayerDetail.Number}</div>
                <div className='player-stat'>Offensive Snaps Played: {onePlayerDetail.OffensiveSnapsPlayed}</div>
                <div className='player-stat'>Played: {onePlayerDetail.Played}</div>
                <div className='player-stat'>Receiving Long: {onePlayerDetail.ReceivingLong}</div>
                <div className='player-stat'>Receiving Targets: {onePlayerDetail.ReceivingTargets}</div>
                <div className='player-stat'>Receiving Touchdowns: {onePlayerDetail.ReceivingTouchdowns}</div>
                <div className='player-stat'>Receiving Yards: {onePlayerDetail.ReceivingYards}</div>
                <div className='player-stat'>Receiving Yards Per Reception: {onePlayerDetail.ReceivingYardsPerReception}</div>
                <div className='player-stat'>Receiving Yards Per Target: {onePlayerDetail.ReceivingYardsPerTarget}</div>
                <div className='player-stat'>Reception Percentage: {onePlayerDetail.ReceptionPercentage}</div>
                <div className='player-stat'>Receptions: {onePlayerDetail.Receptions}</div>
                <div className='player-stat'>Rushing Attempts: {onePlayerDetail.RushingAttempts}</div>
                <div className='player-stat'>Rushing Long: {onePlayerDetail.RushingLong}</div>
                <div className='player-stat'>Rushing Touchdowns: {onePlayerDetail.RushingTouchdowns}</div>
                <div className='player-stat'>Rushing Yards: {onePlayerDetail.RushingYards}</div>
                <div className='player-stat'>Rushing Yards Per Attempt: {onePlayerDetail.RushingYardsPerAttempt}</div>
                <div className='player-stat'>Started: {onePlayerDetail.Started}</div>
                <div className='player-stat'>Touchdowns: {onePlayerDetail.Touchdowns}</div>
                <div className='player-stat'>TwoPointConversionReceptions: {onePlayerDetail.TwoPointConversionReceptions}</div>
                <div className='button-wrapper'>
                  <form
                    onSubmit={(ev) => this.handleRemoveFromWatchlist(onePlayerDetail.PlayerID, ev)}
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
                <div className='player-title'>{onePlayerDetail.Name}, {onePlayerDetail.Position} - {onePlayerDetail.Team}</div>
                <div className='player-stat'>Activated: {onePlayerDetail.Activated}</div>
                <div className='player-stat'>Blocked Kicks: {onePlayerDetail.BlockedKicks}</div>
                <div className='player-stat'>Field Goal Percentage: {onePlayerDetail.FieldGoalPercentage}</div>
                <div className='player-stat'>Field Goals Attempted: {onePlayerDetail.FieldGoalsAttempted}</div>
                <div className='player-stat'>Field Goals Had Blocked: {onePlayerDetail.FieldGoalsHadBlocked}</div>
                <div className='player-stat'>Field Goals Longest Made: {onePlayerDetail.FieldGoalsLongestMade}</div>
                <div className='player-stat'>Field Goals Made: {onePlayerDetail.FieldGoalsMade}</div>
                <div className='player-stat'>Field Goals Made 0 to 19: {onePlayerDetail.FieldGoalsMade0to19}</div>
                <div className='player-stat'>Field Goals Made 20 to 29: {onePlayerDetail.FieldGoalsMade20to29}</div>
                <div className='player-stat'>Field Goals Made 30 to 39: {onePlayerDetail.FieldGoalsMade30to39}</div>
                <div className='player-stat'>Field Goals Made 40 to 49: {onePlayerDetail.FieldGoalsMade40to49}</div>
                <div className='player-stat'>Field Goals Made 50 Plus: {onePlayerDetail.FieldGoalsMade50Plus}</div>
                <div className='player-stat'>Extra Points Made: {onePlayerDetail.ExtraPointsMade}</div>
                <div className='player-stat'>Number: {onePlayerDetail.Number}</div>
                <div className='player-stat'>Played: {onePlayerDetail.Played}</div>
                <div className='player-stat'>Punt Average: {onePlayerDetail.PuntAverage}</div>
                <div className='player-stat'>Punt Inside 20: {onePlayerDetail.PuntInside20}</div>
                <div className='player-stat'>Punt Long: {onePlayerDetail.PuntLong}</div>
                <div className='player-stat'>Punt Net Average: {onePlayerDetail.PuntNetAverage}</div>
                <div className='player-stat'>Punt Net Yards: {onePlayerDetail.PuntNetYards}</div>
                <div className='player-stat'>Punt Yards: {onePlayerDetail.PuntYards}</div>
                <div className='player-stat'>Punts: {onePlayerDetail.Punts}</div>
                <div className='player-stat'>Punts Had Blocked: {onePlayerDetail.PuntsHadBlocked}</div>
                <div className='button-wrapper'>
                  <form
                    onSubmit={(ev) => this.handleRemoveFromWatchlist(onePlayerDetail.PlayerID, ev)}
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
      }
      console.log(this.state)
    })

    return (
      <div>
        <NavBar />
        <div className='home-header-wrapper'>
          <h1 className='home-header'>Fantasy Data</h1>
        </div>
        <div className='watchlist-header-wrapper'>
          <h2>Your Watchlist</h2>
        </div>
        <div className='watchlist-list-wrapper'>
          {displayPlayerDetails}
        </div>
      </div>
    );
  }
}


