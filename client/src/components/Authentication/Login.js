// React
import React, { Component } from 'react';
// modules
import { Form } from 'semantic-ui-react';
import axios from 'axios';
// components

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(event) {
    const self = this;
    const state = this.state;
    axios
      .post('/login', this.state)
      .then((res) => {
        console.log('state being sent, ', state);
        self.props.handleAuth({ ...res.data, state });
      })
      .catch(err => console.log(err));

    this.setState({ username: '', password: '' });
  }

  render() {
    return (
      <form className="login">
        <div className="row uniform">
          <div className="6u signup-email">
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChangeUsername}
            />
          </div>
          <div className="6u signup-pw">
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </div>
          <div className="submit-button">
            <a className="big button special" content="Submit" onClick={this.handleSubmit}>
              Login
            </a>
            <div>
              <a className="subtle-link">Sign up instead</a>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
