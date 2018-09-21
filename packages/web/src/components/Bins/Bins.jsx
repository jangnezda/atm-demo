import React from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  width: 390px;
  margin: auto;
`;

const Bin = styled.div`
  width: 120px;
  min-height: 100px;
  margin-right: 8px;
  display: inline-block;
  float: left;
  background-color: #d6dbdf;
  border: black solid 1px;
  border-top: none;
  cursor: pointer;
`;

const Note = styled.div`
  border: black solid 2px;
  background-color: white;
  text-align: center;
  width: 60px;
  margin: 3px auto;
`;

const Coin = styled.div`
  border: black solid 2px;
  background-color: white;
  text-align: center;
  width: ${props => props.small ? 13 : 20}px;
  height: ${props => props.small ? 13 : 20}px;
  border-radius: 50%;
  margin: 3px auto;
  font-size: ${props => props.small ? 0.7 : 0.8}rem;
`;

const filterAndMapChange = (change, cash, type) =>
  change
    .filter(x => cash.SIZES[type].includes(x.value))
    .reduce(
      (acc, { value, count }) => acc.concat(new Array(count).fill(value)),
      [],
    );

const Bins = ({ change, cash, onPayout }) => (
  <Outer>
    <Bin onClick={onPayout}>
      {filterAndMapChange(change, cash, cash.TYPES.NOTE).map((value, i) => (
        <Note key={i}>{value}</Note>
      ))}
    </Bin>

    <Bin onClick={onPayout}>
      {filterAndMapChange(change, cash, cash.TYPES.BIG_COIN).map((value, i) => (
        <Coin small={false} key={i}>{value}</Coin>
      ))}
    </Bin>

    <Bin onClick={onPayout}>
      {filterAndMapChange(change, cash, cash.TYPES.SMALL_COIN).map((value, i) => (
        <Coin small key={i}>{value}</Coin>
      ))}
    </Bin>
  </Outer>
);

export default Bins;
