import React, { Component } from "react";
import ValidationError from "../validation-error";
import AuthApiService from "../Services/auth-api-services";

export default class Register extends Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: {
        value: "",
        touched: false,
      },
      email: {
        value: "",
        touched: false,
      },
      password: {
        value: "",
        touched: false,
      },
      repeatPassword: {
        value: "",
        touched: false,
      },
    };
  }

  updateUserName(userName) {
    this.setState({ userName: { value: userName, touched: true } });
  }

  updateEmail(email) {
    this.setState({ email: { value: email, touched: true } });
  }

  updatePassword(password) {
    this.setState({ password: { value: password, touched: true } });
  }

  updateRepeatPassword(repeatPassword) {
    this.setState({ repeatPassword: { value: repeatPassword, touched: true } });
  }

  handleLoginSuccess = (user) => {
    window.location = "/login";
  };

  handleSubmitBasicAuth = (ev) => {
    ev.preventDefault();
    const {
      userName,
      email,
      password,
      repeatPassword
    } = ev.target;
    this.setState({ error: null });
    AuthApiService.postUser({
      username: userName.value,
      email: email.value,
      password: password.value,
    })
      .then((user) => {
        userName.value = "";
        email.value = "";
        password.value = "";
        repeatPassword.value = "";
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  };

  validateFirstName() {
    const firstName = this.state.firstName.value.trim();
    if (firstName.length === 0) {
      return <p className="input-error sign-up-error">First name is required</p>;
    } else if (firstName.length < 2) {
      return (
        <p className="input-error">Name must be at least 2 characters long</p>
      );
    }
  }

  validateLastName() {
    const lastName = this.state.lastName.value.trim();
    if (lastName.length === 0) {
      return <p className="input-error">Last name is required</p>;
    } else if (lastName.length < 2) {
      return (
        <p className="input-error">
          Last name must be at least 2 characters long
        </p>
      );
    }
  }

  validateUserName() {
    const userName = this.state.userName.value.trim();
    if (userName.length === 0) {
      return <p className="input-error">Username is required</p>;
    } else if (userName.length < 2) {
      return (
        <p className="input-error">
          Username must be at least 2 characters long
        </p>
      );
    }
  }

  validateEmail() {
    const email = this.state.email.value.trim();
    if (email.length === 0) {
      return <p className="input-error">Email is required</p>;
    } else if (email.length < 5) {
      return (
        <p className="input-error">Email must be at least 5 characters long</p>
      );
    }
  }

  validatePassword() {
    const password = this.state.password.value.trim();
    if (password.length === 0) {
      return <p className="input-error">Password is required</p>;
    } else if (password.length < 6 || password.length > 72) {
      return (
        <p className="input-error">
          Password must be between 6 and 72 characters long
        </p>
      );
    } else if (!password.match(/[0-9]/)) {
      return (
        <p className="input-error">Password must contain at least one number</p>
      );
    }
  }

  validateRepeatPassword() {
    const repeatPassword = this.state.repeatPassword.value.trim();
    const password = this.state.password.value.trim();
    if (repeatPassword !== password) {
      return <p className="input-error">Passwords do not match</p>;
    }
  }
  render() {
    return (
      <div>
        <div className='nav-header-wrapper'>
          <h1 className='nav-header-title'>FantasyData</h1>
          <p>keep tabs on the fantasy players you like</p>
        </div>
        <div className="register-page form-container sign-in-container container" id="container">
          <div className='signup-header-wrapper'>
            <h2 className='signup-header'>Sign up</h2></div>
          <form className="signup-form " onSubmit={this.handleSubmitBasicAuth}>
            <div className="signup-form-entry">
              <label htmlFor="username">Username</label>

              <div className='input-wrapper'><input
                className="registration-control"
                type="text"
                name="userName"
                id="userName"
                onChange={(e) => this.updateUserName(e.target.value)}
              /></div>
              {this.state.userName.touched && (
                <ValidationError message={this.validateUserName()} />
              )}
            </div>
            <div className="signup-form-entry">
              <label htmlFor="email">Email</label>
              <div className='input-wrapper'><input
                className="registration-control"
                type="text"
                name="email"
                id="email"
                onChange={(e) => this.updateEmail(e.target.value)}
              /></div>
              {this.state.email.touched && (
                <ValidationError message={this.validateEmail()} />
              )}
            </div>
            <div className="signup-form-entry">
              <label htmlFor="password">Password</label>
              <div className='input-wrapper'><input
              className="registration-control"
              type="password"
              name="password"
              id="password"
              onChange={(e) => this.updatePassword(e.target.value)}
              /></div>
              {this.state.password.touched && (
                <ValidationError message={this.validatePassword()} />
              )}
            </div>
            <div className="signup-form-entry">
              <label htmlFor="repeat-password">Repeat Password</label>
              <div className='input-wrapper'><input
              className="registration-control"
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              onChange={(e) => this.updateRepeatPassword(e.target.value)}
              /></div>
              {this.state.repeatPassword.touched && (
                <ValidationError message={this.validateRepeatPassword()} />
              )}
            </div>
            <div className='signup-button-wrapper'>
              <button className='signup-button' type="submit">Sign up</button>
            </div>
            <div className="login-link-wrapper">
              <a id='login-link' href='/login'>Already have an account? Login here</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
