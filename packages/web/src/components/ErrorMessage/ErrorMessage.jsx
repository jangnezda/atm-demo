import React from 'react';
import styled from 'styled-components';

import { Button, Label } from '../FormElements';
import Title from '../Title';

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <React.Fragment>
        <Title>Error occured</Title>

        <Label>The account number or pin is invalid.</Label>

        <Button
          onClick={this.props.onBack}
        >
          Back
        </Button>
      </React.Fragment>
    );
  }
};

export default ErrorMessage;
