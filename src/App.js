import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    fetch(
      'https://my-json-server.typicode.com/xxrom/jsonplaceholder_test/users'
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          data: json,
        });
      });
  }

  render() {
    let table;
    if (this.state.data.length === 0) {
      table = <LinearProgress />;
    } else {
      const dataKeys = Object.keys(this.state.data[0]);
      table = (
        <Table>
          <TableHead>
            <TableRow>
              {dataKeys.map((item) => <TableCell numeric>{item}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((item) => {
              const innerCell = dataKeys.map((key) => {
                if (key === 'avatar_url') {
                  return (
                    <TableCell style={styles.avatar} numeric>
                      {item[key]}
                      <Avatar alt="Adelle Charles" src={item[key]} />
                    </TableCell>
                  );
                }
                return <TableCell numeric>{item[key]}</TableCell>;
              });
              return <TableRow key={item.id}>{innerCell}</TableRow>;
            })}
          </TableBody>
        </Table>
      );
    }

    return (
      <div style={styles.wrapper}>
        <div className="App">
          <Button
            variant="outlined"
            onClick={this.onClick}
            style={styles.button}
          >
            Update
          </Button>
          <Paper style={styles.paper}>{table}</Paper>
        </div>
      </div>
    );
  }

  // onChange({ target: { value } }) {
  //   console.log(value);

  //   this.setState({
  //     name: value,
  //   });
  // }

  onClick() {
    console.log('click');
    this.setState({
      data: [],
    });
    fetch(
      'https://my-json-server.typicode.com/xxrom/jsonplaceholder_test/users'
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          data: json,
        });
        // console.log(this.state.name);
        // fetch(
        //   'http://my-json-server.typicode.com/xxrom/jsonplaceholder_test/users/1',
        //   {
        //     method: 'PATCH',
        //     body: JSON.stringify({
        //       name: this.state.name,
        //     }),
        //     headers: {
        //       'Content-type': 'application/json; charset=UTF-8',
        //     },
        //   }
        // )
        //   .then((response) => response.json())
        //   .then((json) => console.log(json));
      });
  }
}

const styles = {
  wrapper: {
    padding: '1em',
    backgroundColor: 'rgb(240,240,240)',
  },
  paper: {
    padding: '1em',
  },
  avatar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginBottom: '1em',
  },
};

export default App;
