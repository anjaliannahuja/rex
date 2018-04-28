// React
import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
// Modules
import { Dropdown, Menu, Button, Container } from 'semantic-ui-react';
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
// Components
import Home from './Home';
import EntryDetail from './Entry/EntryDetail';
import BrowseDetail from './Browse/BrowseDetail';
import EntryListView from './EntryListView';
import BrowseView from './BrowseView';
import Landing from './Landing';
import Auth from './Authentication/Auth';

class App extends Component {
  state = {
    firstName: '',
    userId: '',
  };

  handleAuth(data) {
    this.setState({
      firstName: data.firstName,
      userId: data.userId,
    });
  }

  // On Mount, gets authentication from server, sets state of isAuthenticated
  componentDidMount() {
    const self = this;
    axios
      .get('/auth')
      .then(res => {
        self.handleAuth(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // const { firstName, isAuthenticated } = this.state;

    // If state authenticated, loads homepage, otherwise login / signup
    // if (isAuthenticated) {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Landing handleAuth={this.handleAuth.bind(this)} />}
            />
            <Route
              path="/home"
              render={() => <Home firstName={this.state.firstName} userId={this.state.userId} />}
            />
            <Route path="/browse/:bookId" component={BrowseDetail} userId={this.state.userId} />
            <Route path="/entry/:bookId" component={EntryDetail} userId={this.state.userId} />
            <Route exact path="/entry" component={EntryListView} userId={this.state.userId} />
            <Route exact path="/browse" component={BrowseView} userId={this.state.userId} />
          </Switch>
        </Router>
      </div>
    );
    // } else {
    //   return <Landing handleAuth={this.handleAuth.bind(this)} />;
    // }
  }
}

export default App;
