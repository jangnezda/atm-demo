import styled from 'styled-components';

const Button = styled.button`
  font-family: monospace;
  font-size: 1rem;
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 2rem auto;
  background: transparent;
  color: black;
  border: black 2px solid;
  display: block;
  cursor: pointer;
  outline: none;

  :hover {
    background-color: #f2f4f4;
  }
`;

const Label = styled.div`
  font-size: 1rem;
  padding-top: 2rem;
`;

const Input = styled.input`
  font-family: monospace;
  font-size: 1rem;
  border: none;
  border-bottom: black solid 1px;
  margin-top: 0.5rem;
  outline: none;
  background-color: #f2f4f4;
`;

export { Button, Label, Input };
