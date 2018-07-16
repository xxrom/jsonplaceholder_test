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
    console.log('TableUsers', props);

    this.state = {
      data: [],
      selectedRow: {},
    };

    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.onClickChangeUser = this.onClickChangeUser.bind(this);
  }

  componentWillMount() {
    this.fetchUserTable();
  }

  render() {
    const disabledChangeUser = !this.state.selectedRow[
      Object.keys(this.state.selectedRow)[0]
    ];
    console.log('disabledChangedUser', disabledChangeUser);

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
                      <Avatar alt="avatar" src={item[key]} />
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
                  key={`tr-${item.id}`}
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
            onClick={this.onClickUpdate}
            style={styles.button}
            color="primary"
          >
            Update Table
          </Button>

          <Button
            variant="outlined"
            onClick={this.onClickChangeUser}
            style={styles.button}
            disabled={disabledChangeUser}
            color="secondary"
          >
            Change User
          </Button>
          <Paper style={styles.paper}>{table}</Paper>
        </div>
      </div>
    );
  }

  fetchUserTable() {
    let searchUrl =
      'https://my-json-server.typicode.com/xxrom/jsonplaceholder_test/users'; // _start=1&_limit=3
    let start;
    let limit;
    const searchArr = this.props.location.search.split('&');
    // проверяем наличие параметров для выборки
    searchArr.forEach((item) => {
      if (item.indexOf('offset') !== -1) {
        start = item.replace(/[^0-9]/g, '');
      }
      if (item.indexOf('limit') !== -1) {
        limit = item.replace(/[^0-9]/g, '');
      }
    });
    if (start && limit) {
      searchUrl += `?_start=${start}&_limit=${limit}`;
    }
    fetch(searchUrl)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: json,
        });
      })
      .catch((err) => console.log('Error', err));
  }

  onClickUpdate() {
    this.setState({
      data: [],
    });
    this.fetchUserTable();
  }

  onClickChangeUser() {
    console.log('update User data');
    // вытаскиваем индекс выделенной строки
    const selectedRowIndex = Object.keys(this.state.selectedRow)[0];
    console.log(selectedRowIndex);
    // если текущая строка выделена, то переходим в редактирование
    if (this.state.selectedRow[selectedRowIndex]) {
      this.props.history.push(`/users/${selectedRowIndex}`);
    }
  }
}

const styles = {
  wrapper: {
    padding: '1em',
    backgroundColor: 'rgb(240,240,240)',
    boxSizing: 'border-box',
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
    marginRight: '1em',
    marginBottom: '1em',
  },
  selectedRow: {
    backgroundColor: 'skyblue',
  },
};

export default TableUsers;
