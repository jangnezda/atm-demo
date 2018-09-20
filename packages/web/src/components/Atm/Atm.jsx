import React from 'react';
import styled from 'styled-components';

import Frame from '../Frame';
import Login from '../Login';
import ErrorMessage from '../ErrorMessage';

class Atm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      error: null,
    };

    this.loadAccount = this.loadAccount.bind(this);
  }

  loadAccount(number, pin) {
    this.props.api.getAccount(number, pin)
      .then(account => this.setState({ ...this.state, account }))
      .catch(error => this.setState({ ...this.state, error }));
  }

  render() {
    if (this.state.error) {
      return (
        <Frame>
          <ErrorMessage
            status={this.state.error.response.status}
            message={this.state.error.message}
            onBack={() => this.setState({ ...this.state, error: null })}
          />
        </Frame>
      );
    }

    if (this.state.account) {
      return (<Frame>I can has account</Frame>);
    }

    return (
      <Frame>
        <Login onContinue={this.loadAccount} />
      </Frame>
    );
  }
};

export default Atm;
