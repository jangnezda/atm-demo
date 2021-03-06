import React from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  height: 400px;
  width: 400px;
  margin: auto;
  margin-top: 3rem;
  border: black solid 1px;
  box-shadow: ${props => props.showShadow ? '0 10px 6px -6px black' : 'none'};
  background-color: #34495e;
`;

const Title = styled.div`
  padding: 0.5rem 2rem 0.5rem;
  color: white;
  background-color: #34495e;
  text-align: right;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: sans-serif;
  font-style: italic;
`;

const Inner = styled.div`
  background-color: ${props => props.isError ? '#f1948a' : '#d6dbdf'};
  margin: 0 2rem;
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 0.3rem;
  height: 74%;
  font-family: monospace;
`;

const Frame = ({ isError = false, showShadow = true, children }) => (
  <Outer showShadow={showShadow}>
    <Title>ATM</Title>
    <Inner isError={isError}>{children}</Inner>
  </Outer>
);

export default Frame;
