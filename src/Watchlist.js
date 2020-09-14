import React, { Component } from "react";
import config from './config';

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
    console.log(config.API_ENDPOINT, "this is the endpoint");
    const searchURL = `${config.API_ENDPOINT}/watchlist/${window.localStorage.user_id}`;

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
        console.log(data);
        if (data.totalItems === 0) throw new Error("No players found");

        const showPlayerDetails = data.map((onePlayerId) => {
          console.log(onePlayerId.player_id)
          return this.renderWatchlistPlayers(onePlayerId.player_id)
        })

        this.setState({
          showPlayerDetails: showPlayerDetails,
        });
        console.log(this.state)
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
        console.log(data);
        output.push(data)
        if (data.totalItems === 0) throw new Error("No players found");

        // const players = data.map((player) => {
        //   console.log(player)
        //   const {
        //     AverageDraftPosition,
        //     AverageDraftPositionPPR,
        //     ByeWeek,
        //     LastSeasonFantasyPoints,
        //     Name,
        //     PlayerID,
        //     Position,
        //     ProjectedFantasyPoints,
        //     Team
        //   } = player;

        // let htmlOutput = `<div>
        // <span>AverageDraftPosition: ${AverageDraftPosition}</span>
        // <span> AverageDraftPositionPPR: ${AverageDraftPositionPPR}</span>
        // <span> ByeWeek: ${ByeWeek}</span>
        // <span> LastSeasonFantasyPoints: ${LastSeasonFantasyPoints}</span>
        // <span>Name: ${Name}</span>
        // <span>PlayerID: ${PlayerID}</span>
        // <span>Position: ${Position}</span>
        // <span>ProjectedFantasyPoints: ${ProjectedFantasyPoints}</span>
        // <span>Team: ${Team}</span>
        // </div>`;

        //   return htmlOutput
        // });
        let existingPlayers = this.state.showPlayerDetails
        existingPlayers.push(data[0])
        this.setState({
          showPlayerDetails: existingPlayers,
          error: null,
        });
        console.log(this.state.showPlayerDetails)
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  render() {
    console.log(this.state)
    // let displayPlayerDetails = '';
    // if (this.state.showPlayerDetails.length != 0) {
      let displayPlayerDetails = this.state.showPlayerDetails.map((onePlayerDetail) => {
        console.log(onePlayerDetail)
        if (onePlayerDetail != undefined) {
          return( <div key={onePlayerDetail.PlayerID}>
            <span>AverageDraftPosition: {onePlayerDetail.AverageDraftPosition}</span>
            <span>AverageDraftPositionPPR: {onePlayerDetail.AverageDraftPositionPPR}</span>
            <span>ByeWeek: {onePlayerDetail.ByeWeek}</span>
            <span>LastSeasonFantasyPoints: {onePlayerDetail.LastSeasonFantasyPoints}</span>
            <span>Name: {onePlayerDetail.Name}</span>
            <span>PlayerID: {onePlayerDetail.PlayerID}</span>
            <span>Position: {onePlayerDetail.Position}</span>
            <span>ProjectedFantasyPoints: {onePlayerDetail.ProjectedFantasyPoints}</span>
            <span>Team: {onePlayerDetail.Team}</span>
            </div>)
        }
      })
    // }

    return (
      <div>
        <p>hello</p>
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


