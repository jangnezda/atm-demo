import React from 'react';

import { Button, Label } from '../FormElements';
import Title from '../Title';

const ErrorMessage = ({ onBack }) => (
  <React.Fragment>
    <Title>Error occured</Title>

    <Label>The account number or pin is invalid.</Label>

    <Button
      onClick={onBack}
    >
      Back
    </Button>
  </React.Fragment>
);

export default ErrorMessage;
