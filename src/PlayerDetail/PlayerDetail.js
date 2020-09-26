import React, { Component } from "react";
import config from "../config";

export default class PlayerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
  }

  handleShowPlayerDetails(ev) {
    ev.preventDefault();

    const data = {}

    const formData = new FormData(ev.target)

    for (let value of formData) {
      data[value[0]] = value[1]
    }

    const searchURL = `${config.API_ENDPOINT}/player-detail/player/details/season/${data.PlayerID}`;

    const options = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      }
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
        const playerDetails = data[0];
        let shownDetails = {};
        switch (playerDetails.Position) {
          case "QB":
            shownDetails = {
              Activated: playerDetails.Activated,
              Fumbles: playerDetails.Fumbles,
              Number: playerDetails.Number,
              OffensiveSnapsPlayed: playerDetails.OffensiveSnapsPlayed,
              OffensiveTeamSnaps: playerDetails.OffensiveTeamSnaps,
              OffensiveTouchdowns: playerDetails.OffensiveTouchdowns,
              PassingAttempts: playerDetails.PassingAttempts,
              PassingCompletionPercentage: playerDetails.PassingCompletionPercentage,
              PassingCompletions: playerDetails.PassingCompletions,
              PassingInterceptions: playerDetails.PassingInterceptions,
              PassingLong: playerDetails.PassingLong,
              PassingRating: playerDetails.PassingRating,
              PassingSackYards: playerDetails.PassingSackYards,
              PassingSacks: playerDetails.PassingSacks,
              PassingTouchdowns: playerDetails.PassingTouchdowns,
              PassingYards: playerDetails.PassingYards,
              PassingYardsPerAttempt: playerDetails.PassingYardsPerAttempt,
              PassingYardsPerCompletion: playerDetails.PassingYardsPerCompletion,
              Played: playerDetails.Played,
              Touchdowns: playerDetails.Touchdowns,
              TwoPointConversionPasses: playerDetails.TwoPointConversionPasses,
              TwoPointConversionReceptions: playerDetails.TwoPointConversionReceptions,
              TwoPointConversionReturns: playerDetails.TwoPointConversionReturns,
              TwoPointConversionRuns: playerDetails.TwoPointConversionRuns
            }
            break;
          case "RB":
            shownDetails = {
              Activated: playerDetails.Activated,
              Fumbles: playerDetails.Fumbles,
              FumblesLost: playerDetails.FumblesLost,
              FumblesOutOfBounds: playerDetails.FumblesOutOfBounds,
              FumblesOwnRecoveries: playerDetails.FumblesOwnRecoveries,
              FumblesRecovered: playerDetails.FumblesRecovered,
              Number: playerDetails.Number,
              OffensiveSnapsPlayed: playerDetails.OffensiveSnapsPlayed,
              OffensiveTeamSnaps: playerDetails.OffensiveTeamSnaps,
              OffensiveTouchdowns: playerDetails.OffensiveTouchdowns,
              Played: playerDetails.Played,
              ReceivingLong: playerDetails.ReceivingLong,
              ReceivingTargets: playerDetails.ReceivingTargets,
              ReceivingTouchdowns: playerDetails.ReceivingTouchdowns,
              ReceivingYards: playerDetails.ReceivingYards,
              ReceivingYardsPerReception: playerDetails.ReceivingYardsPerReception,
              ReceivingYardsPerTarget: playerDetails.ReceivingYardsPerTarget,
              ReceptionPercentage: playerDetails.ReceptionPercentage,
              Receptions: playerDetails.Receptions,
              RushingAttempts: playerDetails.RushingAttempts,
              RushingLong: playerDetails.RushingLong,
              RushingTouchdowns: playerDetails.RushingTouchdowns,
              RushingYards: playerDetails.RushingYards,
              RushingYardsPerAttempt: playerDetails.RushingYardsPerAttempt,
              Started: playerDetails.Started,
              Touchdowns: playerDetails.Touchdowns,
              TwoPointConversionPasses: playerDetails.TwoPointConversionPasses,
              TwoPointConversionReceptions: playerDetails.TwoPointConversionReceptions,
              TwoPointConversionRuns: playerDetails.TwoPointConversionRuns
            }
            break;
          case "WR":
            shownDetails = {
              Activated: playerDetails.Activated,
              Fumbles: playerDetails.Fumbles,
              FumblesLost: playerDetails.FumblesLost,
              FumblesOutOfBounds: playerDetails.FumblesOutOfBounds,
              FumblesOwnRecoveries: playerDetails.FumblesOwnRecoveries,
              FumblesRecovered: playerDetails.FumblesRecovered,
              Number: playerDetails.Number,
              OffensiveSnapsPlayed: playerDetails.OffensiveSnapsPlayed,
              OffensiveTeamSnaps: playerDetails.OffensiveTeamSnaps,
              OffensiveTouchdowns: playerDetails.OffensiveTouchdowns,
              Played: playerDetails.Played,
              ReceivingLong: playerDetails.ReceivingLong,
              ReceivingTargets: playerDetails.ReceivingTargets,
              ReceivingTouchdowns: playerDetails.ReceivingTouchdowns,
              ReceivingYards: playerDetails.ReceivingYards,
              ReceivingYardsPerReception: playerDetails.ReceivingYardsPerReception,
              ReceivingYardsPerTarget: playerDetails.ReceivingYardsPerTarget,
              ReceptionPercentage: playerDetails.ReceptionPercentage,
              Receptions: playerDetails.Receptions,
              RushingAttempts: playerDetails.RushingAttempts,
              RushingLong: playerDetails.RushingLong,
              RushingTouchdowns: playerDetails.RushingTouchdowns,
              RushingYards: playerDetails.RushingYards,
              RushingYardsPerAttempt: playerDetails.RushingYardsPerAttempt,
              Started: playerDetails.Started,
              Touchdowns: playerDetails.Touchdowns,
              TwoPointConversionPasses: playerDetails.TwoPointConversionPasses,
              TwoPointConversionReceptions: playerDetails.TwoPointConversionReceptions,
              TwoPointConversionRuns: playerDetails.TwoPointConversionRuns
            }
            break;
          case "TE":
            shownDetails = {
              Activated: playerDetails.Activated,
              Fumbles: playerDetails.Fumbles,
              FumblesLost: playerDetails.FumblesLost,
              FumblesOutOfBounds: playerDetails.FumblesOutOfBounds,
              FumblesOwnRecoveries: playerDetails.FumblesOwnRecoveries,
              FumblesRecovered: playerDetails.FumblesRecovered,
              Number: playerDetails.Number,
              OffensiveSnapsPlayed: playerDetails.OffensiveSnapsPlayed,
              OffensiveTeamSnaps: playerDetails.OffensiveTeamSnaps,
              OffensiveTouchdowns: playerDetails.OffensiveTouchdowns,
              Played: playerDetails.Played,
              ReceivingLong: playerDetails.ReceivingLong,
              ReceivingTargets: playerDetails.ReceivingTargets,
              ReceivingTouchdowns: playerDetails.ReceivingTouchdowns,
              ReceivingYards: playerDetails.ReceivingYards,
              ReceivingYardsPerReception: playerDetails.ReceivingYardsPerReception,
              ReceivingYardsPerTarget: playerDetails.ReceivingYardsPerTarget,
              ReceptionPercentage: playerDetails.ReceptionPercentage,
              Receptions: playerDetails.Receptions,
              RushingAttempts: playerDetails.RushingAttempts,
              RushingLong: playerDetails.RushingLong,
              RushingTouchdowns: playerDetails.RushingTouchdowns,
              RushingYards: playerDetails.RushingYards,
              RushingYardsPerAttempt: playerDetails.RushingYardsPerAttempt,
              Started: playerDetails.Started,
              Touchdowns: playerDetails.Touchdowns,
              TwoPointConversionPasses: playerDetails.TwoPointConversionPasses,
              TwoPointConversionReceptions: playerDetails.TwoPointConversionReceptions,
              TwoPointConversionRuns: playerDetails.TwoPointConversionRuns
            }
            break;
          case "K":
            shownDetails = {
              Activated: playerDetails.Activated,
              BlockedKicks: playerDetails.BlockedKicks,
              FieldGoalPercentage: playerDetails.FieldGoalPercentage,
              FieldGoalReturnTouchdowns: playerDetails.FieldGoalReturnTouchdowns,
              FieldGoalReturnYards: playerDetails.FieldGoalReturnYards,
              FieldGoalsAttempted: playerDetails.FieldGoalsAttempted,
              FieldGoalsHadBlocked: playerDetails.FieldGoalsHadBlocked,
              FieldGoalsLongestMade: playerDetails.FieldGoalsLongestMade,
              FieldGoalsMade: playerDetails.FieldGoalsMade,
              FieldGoalsMade0to19: playerDetails.FieldGoalsMade0to19,
              FieldGoalsMade20to29: playerDetails.FieldGoalsMade20to29,
              FieldGoalsMade30to39: playerDetails.FieldGoalsMade30to39,
              FieldGoalsMade40to49: playerDetails.FieldGoalsMade40to49,
              FieldGoalsMade50Plus: playerDetails.FieldGoalsMade50Plus,
              ExtraPointsMade: playerDetails.ExtraPointsMade,
              Number: playerDetails.Number,
              Played: playerDetails.Played,
              PuntAverage: playerDetails.PuntAverage,
              PuntInside20: playerDetails.PuntInside20,
              PuntLong: playerDetails.PuntLong,
              PuntNetAverage: playerDetails.PuntNetAverage,
              PuntNetYards: playerDetails.PuntNetYards,
              PuntYards: playerDetails.PuntYards,
              Punts: playerDetails.Punts,
              PuntsHadBlocked: playerDetails.PuntsHadBlocked,
            }
            break;
          default:
        }
 
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  render() {

    let showPlayers = "";

    if (this.state.players.length !== 0) {
      showPlayers = this.state.players.map((player, key) => {
        return (
          <div className="list" key={key}>
            <div className='hidden season-details-container'>
              <h3>{player.Name}</h3>
              <p>Team: {player.Team}</p>
              <p>Posiiton: {player.Position}</p>
              <p>ADP: {player.AverageDraftPosition}</p>
              <p>ADP PPR: {player.AverageDraftPositionPPR}</p>
              <p>Bye Week: {player.ByeWeek}</p>
              <p>Last Season FP: {player.LastSeasonFantasyPoints}</p>
              <p>Projected FP: {player.ProjectedFantasyPoints}</p>
            </div>
          </div>
        );
      });
    }
    return <div className='player-detail-container'>
      <form onSubmit={this.handleShowPlayerDetails} >
        <input type="hidden" name='PlayerID' defaultValue={this.props.PlayerID}></input>
        <input type="hidden" name='userId' defaultValue={1}></input>
        <button type="submit">Show Details</button>
      </form>
      {showPlayers}
    </div>;
  }
}
