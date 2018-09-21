import React from 'react';
import styled from 'styled-components';

import { Button, Label, Input } from '../FormElements';
import Title from '../Title';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: '',
      pin: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(value, field) {
    if (!isNaN(value)) {
      this.setState({
        ...this.state,
        [field]: value,
      });
    }
  }

  render() {
    const { account, pin } = this.state;

    return (
      <React.Fragment>
        <Title>Welcome</Title>

        <Label>Enter account number:</Label>
        <Input
          type='text'
          maxLength='10'
          size='10'
          required
          value={account}
          onChange={e => this.onChange(e.target.value, 'account')}
        />

        <Label>Enter PIN:</Label>
        <Input
          type='password'
          maxLength='4'
          size='4'
          required
          value={pin}
          onChange={e => this.onChange(e.target.value, 'pin')}
        />

        <Button
          onClick={() => this.props.onContinue(this.state.account, this.state.pin)}
        >
          Continue
        </Button>
      </React.Fragment>
    );
  }
};

export default Login;
