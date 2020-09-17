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

  }

  render() {
    // console.log(this.state)
    // let displayPlayerDetails = '';
    // if (this.state.showPlayerDetails.length != 0) {
    let displayPlayerDetails = this.state.showPlayerDetails.map((onePlayerDetail) => {
      console.log(onePlayerDetail)
      if (onePlayerDetail != undefined) {

        


        return (<div className='player-card' key={onePlayerDetail.PlayerID}>

          <div className='player-title player-stat'>{onePlayerDetail.Name}, {onePlayerDetail.Team}</div>
          <div className='player-stat'>AverageDraftPosition: {onePlayerDetail.AverageDraftPosition}</div>
          <div className='player-stat'>AverageDraftPositionPPR: {onePlayerDetail.AverageDraftPositionPPR}</div>
          <div className='player-stat'>ByeWeek: {onePlayerDetail.ByeWeek}</div>
          <div className='player-stat'>LastSeasonFantasyPoints: {onePlayerDetail.LastSeasonFantasyPoints}</div>
          {/* <div className='player-stat'>PlayerID: {onePlayerDetail.PlayerID}</div> */}
          <div className='player-stat'>Position: {onePlayerDetail.Position}</div>
          <div className='player-stat'>ProjectedFantasyPoints: {onePlayerDetail.ProjectedFantasyPoints}</div>
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

        </div>)
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


