import React, { Component } from "react";
// import ValidationError from "./validation-error";
// import AuthApiService from "./Services/auth-api-services";
import API_ENDPOINT from './config'

export default class Home extends Component {

    componentDidMount() {
        console.log('component did mount')
        const searchURL = `${API_ENDPOINT}/player/all`;
        const options = {
            method: 'GET',
            header: {
                "Content-Type": "application/json"
            }
        }
        fetch(searchURL, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong, please try again later.')
                }
                return res
            })
            .then(res => res.json())
            .then(data => {
                // no results validation
                if (data.totalItems === 0) throw new Error('No players found')
                console.log(data)
                // this.setState({
                //     books: aBooks,
                //     error: null
                // })
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })

    }






    // fetch(`${config.API_ENDPOINT}/player/all`, {
    //     method: 'GET',
    //     headers: {
    //         'content-type': 'application/json',
    //     },
    //     body: JSON.stringify(credentials),
        
    // })
    // .then(res => {
    //     console.log(res.status)
    //     if (res.status != 200) {
    //         alert('Invalid login details')
    //     }
    //     else {
    //         // res.json()
    //         return res.json()
    //         // window.location = '/'
    //     }
    //     (!res.ok)
    //         ? res.json().then(e => Promise.reject(e))
    //         : res.json()
    //         // window.location = '/'
    // })
    // .catch(err => console.log(err))

  render() {
    return (
      <div>
        <nav>Nav</nav>
        <h1>Fantasy Data</h1>
        <section className="main">
          <h3>Top Fantasy Players</h3>
        </section>
        <section>
          <p>list here</p>
        </section>
      </div>
    );
  }
}
