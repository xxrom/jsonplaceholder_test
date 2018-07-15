import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentWillMount(props) {
    const { id } = this.props.match.params;
    fetch(
      `https://my-json-server.typicode.com/xxrom/jsonplaceholder_test/users/${id}`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          user: json,
        });
      });
  }

  render() {
    console.log('User', this.props);
    const { id } = this.props.match.params;

    return (
      <div>
        <h1>User!!!</h1>
        <h1>ID: {id}</h1>
        <h1>Name: {this.state.user.name}</h1>
      </div>
    );
  }
}

export default User;
