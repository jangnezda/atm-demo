import React from 'react';
import styled, { css } from 'styled-components';

import { Button, Label, Input } from '../FormElements';
import Title from '../Title';

const ButtonContainer = styled.div`
  ${props => (props.isLeft || props.isRight) && css`
    margin-top: 3rem;
    display: inline-block;
    margin-left: ${props => props.isRight ? '5rem' : '0'}
  `}
`;

const Buttons = ({ isFrozen, backLabel, onBack, onWithdraw }) => (
  <React.Fragment>
    <ButtonContainer isLeft={!isFrozen}>
      <Button
        onClick={onBack}
      >
        {backLabel}
      </Button>
    </ButtonContainer>

    {!isFrozen && (
      <ButtonContainer isRight>
        <Button
          onClick={onWithdraw}
        >
          Withdraw
        </Button>
      </ButtonContainer>
    )}
  </React.Fragment>
);

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      withdraw: false,
      amount: '',
    };

    this.onChange = this.onChange.bind(this);
    this.goToAccount= this.goToAccount.bind(this);
  }

  onChange(change) {
    this.setState({
      ...this.state,
      ...change,
    });
  }

  goToAccount() {
    this.setState({ ...this.state, withdraw: false, amount: '' });
  }

  render() {
    const { account, hasChange, onQuit, onWithdraw } = this.props;
    const { withdraw, amount } = this.state;

    if (withdraw) {
      return (
        <React.Fragment>
          <Title>Withdraw</Title>

          <Label>Enter the desired amount:</Label>
          <Input
            type='text'
            maxLength='6'
            size='8'
            required
            value={amount}
            onChange={e => {
              if (!isNaN(e.target.value) || Number(e.target.value) > 0) {
                this.setState({ amount: e.target.value });
              }
            }}
          />

          <br />

          <Buttons
            backLabel='Back'
            onBack={this.goToAccount}
            onWithdraw={() => {
              onWithdraw(amount).then(() => this.goToAccount());
            }}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Title>Hello {account.user.firstName}</Title>

        {account.frozen && (
          <Label>This account is frozen! You cannot withdraw money.</Label>
        )}

        <Label>
          Your account&apos;s balance is<br /> {account.balance} DKK.
          {hasChange && ' Please take your money below.'}
        </Label>

        {!hasChange && (
          <Buttons
            backLabel='Quit'
            isFrozen={account.frozen}
            onBack={onQuit}
            onWithdraw={() => this.setState({ ...this.state, withdraw: true })}
          />
        )}
      </React.Fragment>
    );
  }
};

export default Account;
