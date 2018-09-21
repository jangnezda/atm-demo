import React from 'react';
import styled from 'styled-components';

import Frame from '../Frame';
import Login from '../Login';
import Account from '../Account';
import ErrorMessage from '../ErrorMessage';

class Atm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      pin: null,
      error: null,
    };

    this.loadAccount = this.loadAccount.bind(this);
    this.withdrawAmount = this.withdrawAmount.bind(this);
  }

  loadAccount(number, pin) {
    return this.handleResult(pin, this.props.api.getAccount(number, pin));
  }

  withdrawAmount(amount) {
    const { number, pin } = this.state.account;

    return this.handleResult(pin, this.props.api.withdraw(number, pin, amount));
  }

  handleResult(pin, promise) {
    return promise
      .then(account => this.setState({ ...this.state, account: { ... account, pin } }))
      .catch(error => this.setState({ ...this.state, error }));
  }

  render() {
    const { error, account } = this.state;

    if (error) {
      return (
        <Frame isError>
          <ErrorMessage
            status={error.response.status}
            message={error.response.data || error.message}
            onBack={() => this.setState({ ...this.state, error: null })}
          />
        </Frame>
      );
    }

    if (account) {
      return (
        <Frame isError={account.frozen}>
          <Account
            account={account}
            onQuit={() => this.setState({ account: null, error: null })}
            onWithdraw={this.withdrawAmount}
          />
        </Frame>
      );
    }

    return (
      <Frame>
        <Login onContinue={this.loadAccount} />
      </Frame>
    );
  }
};

export default Atm;
