import React from 'react';
import styled from 'styled-components';

import { Button, Label, Input } from '../FormElements';

const Title = styled.div`
  font-size: 1.3rem;
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: '',
      pin: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(change) {
    this.setState({
      ...this.state,
      ...change,
    });
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
          value={account}
          onChange={e => this.onChange({ account: e.target.value })}
        />

        <Label>Enter PIN:</Label>
        <Input
          type='password'
          maxLength='4'
          size='4'
          value={pin}
          onChange={e => this.onChange({ pin: e.target.value })}
        />

        <Button
          onClick={() => this.props.onClick(this.state.account, this.state.pin)}
        >
          Continue
        </Button>
      </React.Fragment>
    );
  }
};

export default Login;
