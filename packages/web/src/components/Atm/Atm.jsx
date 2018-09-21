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
      cashReserve: null,
    };

    this.loadAccount = this.loadAccount.bind(this);
    this.withdrawAmount = this.withdrawAmount.bind(this);
  }

  loadAccount(number, pin) {
    return this.props.api.getAccount(number, pin)
      .then(account => this.setState({
        ...this.state,
        account: { ...account, pin },
        cashReserve: this.props.cash.getReserve(),
      }))
      .catch(error => this.goToError(error));
  }

  goToError(error) {
    return this.setState({
      ...this.state,
      error,
    });
  }

  withdrawAmount(amount) {
    const { cashReserve } = this.state;

    // Verify that ATM has enough cash for this amount
    const availableCash = this.props.cash.getTotal(cashReserve);
    if (amount > availableCash) {
      this.goToError({
        response: {},
        message: `Not enough cash available! This ATM can pay up to ${availableCash} DKK`,
      });
      return Promise.resolve();
    }

    // Verify that ATM has exact change needed for this amount
    const { change, rest } = this.props.cash.getChange(amount, cashReserve);
    if (rest > 0) {
      // could not produce exact change
      const payableAmount = amount - rest;
      this.goToError({
        response: {},
        message: `Cannot pay out exactly ${amount} DKK. Nearest payable amount is ${payableAmount} DKK`,
      });
      return Promise.resolve();
    }
    
    const { number, pin } = this.state.account;
    return this.props.api.withdraw(number, pin, amount)
      .then(account => this.setState({
        ...this.state,
        account: { ...account, pin },
        cashReserve: this.props.cash.subtractChange(change, cashReserve),
      }))
      .catch(error => this.goToError(error));
  }

  handleResult(pin, promise) {
    return promise
      .then(account => this.setState({ ...this.state, account: { ... account, pin } }))
      .catch(error => this.goToError(error));
  }

  render() {
    const { error, account } = this.state;

    if (error) {
      const { response, message } = error;

      return (
        <Frame isError>
          <ErrorMessage
            status={response && response.status}
            message={(response && response.data) || message}
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
            onQuit={() => this.setState({
              account: null,
              pin: null,
              error: null,
              cashReserve: null,
            })}
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
