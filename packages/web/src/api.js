import axios from 'axios';

const getAccount = (number, pin) =>
  axios({
    method: 'get',
    url: `/api/accounts/${number}`,
    params: { pin },
  })
  .then(response => response.data);

const withdraw = (number, pin, amount) =>
  axios({
    method: 'post',
    url: `/api/accounts/${number}/withdraw/${amount}`,
    params: { pin },
  })
  .then(response => response.data);

export const api = { getAccount, withdraw };
