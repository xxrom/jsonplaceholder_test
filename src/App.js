import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TableUsers from './TableUsers';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={TableUsers} />
        <Route path="/users/:id" component={TableUsers} />
      </Switch>
    );
  }
}

export default App;
