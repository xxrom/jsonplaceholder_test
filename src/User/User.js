import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';

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
    this.showUserDataTemplate = this.showUserDataTemplate.bind(this);
    this.changeUserNameTemplate = this.changeUserNameTemplate.bind(this);
  }

  componentWillMount() {
    this.fetchUser();
  }

  render() {
    console.log('User', this.props);

    return (
      <div style={styles.wrapper}>
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
        <Paper style={styles.paper}>
          {this.showUserDataTemplate()}
          {this.changeUserNameTemplate()}
        </Paper>
      </div>
    );
  }

  showUserDataTemplate() {
    const { name, avatar_url, address, id } = this.state.user;

    let userData;
    console.log(typeof id);
    console.log(typeof name);
    if (
      typeof id === 'undefined' ||
      typeof name === 'undefined' ||
      typeof avatar_url === 'undefined' ||
      typeof address === 'undefined'
    ) {
      userData = <LinearProgress />;
    } else {
      userData = (
        <div style={styles.userDataWrapper}>
          <p>ID: {id}</p>
          <p>Name: {name}</p>
          <p>Avatar_url: {avatar_url}</p>
          <p>Address: {address}</p>
          <Avatar alt="avatar" src={avatar_url} style={styles.avatar} />
        </div>
      );
    }

    return (
      <Paper style={styles.showUserData}>
        <h2>User data:</h2>
        <Divider />
        {userData}
      </Paper>
    );
  }

  changeUserNameTemplate() {
    const { user, newUser } = this.state;
    const isDisabledSetNewUserData = this.compareObjects(user, newUser);
    return (
      <Paper style={styles.changeUser}>
        <h2>Set new User data:</h2>
        <Divider light />
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
      </Paper>
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
    this.setState({
      user: {},
    });
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
  wrapper: {
    padding: '1em',
    backgroundColor: 'rgb(240,240,240)',
    height: '100vh',
    boxSizing: 'border-box',
  },
  paper: {
    padding: '1em',
  },
  userDataWrapper: {
    position: 'relative',
  },
  showUserData: {
    padding: '1em',
    marginBottom: '1em',
  },
  changeUser: {
    backgroundColor: 'rgb(245,245,245)',
    padding: '1em',
  },
  button: {
    margin: '1em',
  },
  avatar: {
    position: 'absolute',
    top: 0,
    right: 0,

    border: '2px solid gray',
    padding: '0.5em',
    borderRadius: 0,
  },
};

export default User;
