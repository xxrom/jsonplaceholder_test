import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Default name',
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  render() {
    return (
      <div className="App">
        <input value={this.state.name} onChange={this.onChange} />
        <button onClick={this.onClick}>get</button>
      </div>
    );
  }

  onChange({ target: { value } }) {
    console.log(value);

    this.setState({
      name: value,
    });
  }

  onClick() {
    console.log('click');
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log(this.state.name);
        fetch('https://jsonplaceholder.typicode.com/users/1', {
          method: 'PATCH',
          body: JSON.stringify({
            name: this.state.name,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
      });
  }
}

export default App;
