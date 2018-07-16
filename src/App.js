import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TableUsers from './TableUsers';
import User from './User';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/(|users)"
          exact
          render={(props) => <TableUsers {...props} />}
        />
        <Route
          path="/users/:id"
          exact
          render={(props) => <User {...props} />}
        />
      </Switch>
    );
  }
}

export default App;
