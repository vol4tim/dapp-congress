/* eslint global-require: 0 */
import React from 'react'
import { render } from 'react-dom'
import Plugin from './shared/components/app/plugin'
import Load from './shared/components/app/load'
import './index.html';

const startApp = () => {
  require('./app');
}
const notWeb3 = () => {
  render(
    <div className="container">
      <Plugin />
    </div>,
    document.getElementById('root')
  )
}
const notAccounts = () => {
  render(
    <div className="container">
      <p>[ENG] Please unlock metamask account and try to refresh browser page.</p>
      <p>[RUS] Пожалуйста, разблокируйте ваш metamask аккаунт или обновите страницу в браузере.</p>
    </div>,
    document.getElementById('root')
  )
}
const loader = () => {
  render(
    <div className="container">
      <Load />
    </div>,
    document.getElementById('root')
  )
}
let stepCurrent = 0;
const stepMax = 5;
const interval = setInterval(() => {
  if (typeof web3 !== 'undefined' && web3.eth.accounts.length > 0) {
    clearInterval(interval);
    startApp();
    return;
  } else if (stepCurrent >= stepMax) {
    clearInterval(interval);
    if (typeof web3 === 'undefined') {
      notWeb3();
    } else {
      notAccounts();
    }
    return;
  }
  stepCurrent += 1;
  if (typeof web3 !== 'undefined' && web3.eth.accounts.length <= 0) {
    console.log('load accounts', web3.eth.accounts);
  }
  loader();
}, 1000);
