import React from 'react';

import { Button, Label } from '../FormElements';
import Title from '../Title';

const ErrorMessage = ({ status, message, onBack }) => (
  <React.Fragment>
    <Title>Error occured</Title>

    <Label>
      {status && status === 404 && 'The account number or pin is invalid.'}

      {(!status || status !== 404) && message}
    </Label>

    <Button
      onClick={onBack}
    >
      Back
    </Button>
  </React.Fragment>
);

export default ErrorMessage;
