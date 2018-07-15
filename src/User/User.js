import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: '' },
      newUser: { name: '' },
    };

    this.onClickToTable = this.onClickToTable.bind(this);
    this.onClickUpdateUser = this.onClickUpdateUser.bind(this);
    this.onClickSetNewUser = this.onClickSetNewUser.bind(this);
  }

  componentWillMount() {
    this.fetchUser();
  }

  render() {
    console.log('User', this.props);
    const { id } = this.props.match.params;

    const { user, newUser } = this.state;
    const isDisabledSetNewUserData = this.compareObjects(user, newUser);

    return (
      <div>
        <Button
          variant="outlined"
          onClick={this.onClickUpdateUser}
          style={styles.button}
          color="primary"
        >
          Get User
        </Button>
        <Button
          variant="outlined"
          onClick={this.onClickToTable}
          style={styles.button}
          color="primary"
        >
          Back To Table
        </Button>
        <h1>User!!!</h1>
        <h1>ID: {id}</h1>
        <h1>Name: {this.state.user.name}</h1>
        <TextField
          id="name"
          label="Name"
          value={this.state.newUser.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <Button
          variant="outlined"
          onClick={this.onClickSetNewUser}
          style={styles.button}
          color="secondary"
          disabled={isDisabledSetNewUserData}
        >
          Set New User Data
        </Button>
      </div>
    );
  }

  fetchUser() {
    const { id } = this.props.match.params;
    fetch(
      `https://my-json-server.typicode.com/xxrom/jsonplaceholder_test/users/${id}`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log('Fetch user', json);
        this.setState({
          user: json,
          newUser: json,
        });
      })
      .catch((err) => console.log('Error', err));
  }

  fetchSetUser(obj, id) {
    fetch(
      `https://my-json-server.typicode.com/xxrom/jsonplaceholder_test/users/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          user: json,
        });
        console.log(json);
      })
      .catch((err) => console.log('Error', err));
  }

  onClickSetNewUser() {
    const { newUser } = this.state;
    const { id } = this.props.match.params;
    this.fetchSetUser(newUser, id);
  }

  onClickUpdateUser = () => this.fetchUser();

  onClickToTable() {
    this.props.history.push(`/`);
  }

  compareObjects(one, two) {
    var oneItems = Object.getOwnPropertyNames(one);
    var twoItems = Object.getOwnPropertyNames(two);

    // проверка количества элементов объектов
    if (oneItems.length !== twoItems.length) {
      return false;
    }

    for (var i = 0; i < oneItems.length; i++) {
      var propName = oneItems[i];

      // проверка значений
      if (one[propName] !== two[propName]) {
        return false;
      }
    }
    // объекты одинаковые
    return true;
  }

  handleChange = (itemName) => ({ target: { value } }) => {
    if (this.state[itemName] !== value)
      this.setState({
        newUser: {
          ...this.state.user,
          [itemName]: value,
        },
      });
  };
}

const styles = {
  button: {
    margin: '1em',
  },
};

export default User;
