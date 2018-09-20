import React from 'react';
import styled from 'styled-components';

import Frame from '../Frame';
import Login from '../Login';

class Atm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
    };

    this.loadAccount = this.loadAccount.bind(this);
  }

  loadAccount(number, pin) {
    console.log(number, pin);
  }

  render() {
    if (this.state.account) {
      return (<Frame>I can has account</Frame>);
    }

    return (
      <Frame>
        <Login onClick={this.loadAccount} />
      </Frame>
    );
  }
};

export default Atm;
