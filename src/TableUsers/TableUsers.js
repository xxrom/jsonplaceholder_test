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
import Checkbox from '@material-ui/core/Checkbox';

class TableUsers extends Component {
  constructor(props) {
    super(props);
    console.log('TableUsers');

    this.state = {
      data: [],
      selectedRow: {},
    };

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    fetch(
      'https://my-json-server.typicode.com/xxrom/jsonplaceholder_test/users'
    )
      .then((response) => response.json())
      .then((json) => {
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
              {[
                <TableCell numeric>Select</TableCell>,
                ...dataKeys.map((item) => (
                  <TableCell numeric>{item}</TableCell>
                )),
              ]}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((item, index) => {
              const isSelected = !!this.state.selectedRow[index];

              const innerCell = dataKeys.map((key) => {
                if (key === 'avatar_url') {
                  return (
                    <TableCell style={styles.cellAvatar}>
                      {`${item[key]}`}
                      <Avatar alt="Adelle Charles" src={item[key]} />
                    </TableCell>
                  );
                }
                return <TableCell>{item[key]}</TableCell>;
              });
              innerCell.unshift(
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected} />
                </TableCell>
              );
              return (
                <TableRow
                  key={item.id}
                  style={
                    this.state.selectedRow[index] ? styles.selectedRow : null
                  }
                  onClick={() => {
                    console.log(`Row click ${!this.state.selectedRow[index]}`);
                    return this.setState({
                      selectedRow: {
                        [index]: !this.state.selectedRow[index],
                      },
                    });
                  }}
                >
                  {innerCell}
                </TableRow>
              );
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
            Update Table
          </Button>

          <Button
            variant="outlined"
            onClick={this.onClick}
            style={styles.button}
          >
            Change User
          </Button>
          <Paper style={styles.paper}>{table}</Paper>
        </div>
      </div>
    );
  }

  onClick() {
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
  cellAvatar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginBottom: '1em',
  },
  selectedRow: {
    backgroundColor: 'skyblue',
  },
};

export default TableUsers;
