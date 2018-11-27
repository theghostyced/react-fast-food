import React, { Component } from 'react';
import { render } from 'react-dom';

// eslint-disable-next-line react/prefer-stateless-function
class Root extends Component {
  render() {
    return <p>Hello React!</p>;
  }
}

// eslint-disable-next-line no-undef
render(<Root />, document.getElementById('app-mount'));
