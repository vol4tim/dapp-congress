import Promise from 'bluebird'
import store from 'store'
import _ from 'lodash'
import hett from 'hett'
import { actions as actionsForm } from 'vol4-form'
import { IS_LOAD, ADD, SET_INFO, REMOVE } from './actionTypes'
import { flashMessage } from '../app/actions'
import { formatDecimals } from '../../utils/helper'

export function add(item) {
  return {
    type: ADD,
    payload: item
  }
}

export function setInfo(address, abi, info) {
  return {
    type: SET_INFO,
    payload: {
      address,
      abi,
      info
    }
  }
}

export function remove(address) {
  return {
    type: REMOVE,
    payload: address
  }
}

export function isLoad(bool) {
  return {
    type: IS_LOAD,
    payload: bool
  }
}

function loadToken(token) {
  let abi = {};
  return hett.getAbiByName(token.type)
    .then((result) => {
      abi = result;
      // _.forEach(result, (item) => {
      //   console.log(item);
      //   if (_.has(item, 'constant') && item.constant && item.inputs.length === 0) {
      //     console.log(item.name);
      //   }
      // })
      return hett.getContract(abi, token.address)
    })
    .then(contract => (
      Promise.join(
        contract.call('name'),
        contract.call('decimals'),
        contract.call('symbol'),
        contract.call('balanceOf', [hett.web3h.coinbase()]),
        contract.call('totalSupply'),
        contract.call('hammer'),
        contract.call('owner'),
        (...info) => (
          {
            name: info[0],
            decimals: Number(info[1]),
            symbol: info[2],
            myBalance: formatDecimals(info[3], info[1]),
            totalSupply: formatDecimals(info[4], info[1]),
            hammer: info[5],
            owner: info[6]
          }
        )
      )
    ))
    .then(info => (
      {
        address: token.address,
        abi,
        info
      }
      // hett.watcher.addAddress(tokenAddress, 'loadModule', (address) => {
      //   dispatch(loadModule(address))
      // })
    ))
    .catch(e => Promise.reject(e))
}

export function load() {
  return (dispatch) => {
    dispatch(isLoad(true))
    const tokens = store.get('tokens') || []
    const items = []
    _.forEach(tokens, (token) => {
      dispatch(add(token))
      items.push(loadToken(token))
    })
    Promise.all(items)
      .then((result) => {
        _.forEach(result, (item) => {
          dispatch(setInfo(item.address, item.abi, item.info))
        })
        dispatch(isLoad(false))
      })
  }
}

export function del(address) {
  return (dispatch) => {
    let tokens = store.get('tokens')
    tokens = _.remove(tokens, token => token.address !== address)
    store.set('tokens', tokens)
    dispatch(remove(address))
  }
}

export function save(form) {
  return (dispatch) => {
    dispatch(actionsForm.start('token'));
    const tokens = store.get('tokens') || []
    const token = {
      address: form.address,
      type: 'TokenEmission'
    }
    tokens.push(token)
    store.set('tokens', tokens)
    dispatch(add(token))
    dispatch(loadToken(token))
      .then((result) => {
        dispatch(setInfo(token.address, result.abi, result.info))
        dispatch(actionsForm.stop('token'));
        dispatch(actionsForm.success('token', 'Сохранено'));
      })
      .catch((e) => {
        console.log(e);
        dispatch(del(token.address))
        dispatch(actionsForm.stop('token'));
        dispatch(actionsForm.error('token', 'Ошибка'));
      })
  }
}

function formatResult(token, func, result) {
  if (func === 'balanceOf' || func === 'allowance') {
    return formatDecimals(result, token.info.decimals) + ' ' + token.info.symbol
  }
  const item = _.find(token.abi, { name: func })
  if (/^uint/.test(item.outputs[0].type)) {
    return Number(result)
  }
  return _.toString(result)
}

export function getConstant(idForm, address, abiName, func, form) {
  return (dispatch, getState) => {
    dispatch(actionsForm.start(idForm))
    const state = getState()
    const token = state.token.items[address]
    const contract = hett.getContract(token.abi, address)
    contract.call(func, _.values(form))
      .then((result) => {
        dispatch(actionsForm.success(idForm, formatResult(token, func, result)));
        dispatch(actionsForm.stop(idForm))
      })
      .catch(() => {
        dispatch(actionsForm.stop(idForm))
      })
  }
}

export function contractSend(abi, address, action, values, args = {}) {
  return dispatch => (
    hett.getContractByName(abi, address)
      .then(contract => contract.send(action, values, args))
      .then((txId) => {
        dispatch(flashMessage('txId: ' + txId))
        return hett.watcher.addTx(txId)
      })
      .then((transaction) => {
        dispatch(flashMessage('blockNumber: ' + transaction.blockNumber))
        return transaction;
      })
      .catch((e) => {
        console.log(e);
        return Promise.reject();
      })
  )
}

export function send(idForm, address, abiName, func, form) {
  return (dispatch) => {
    dispatch(actionsForm.start(idForm))
    let data = _.values(form)
    const args = {}
    if (_.has(form.payable)) {
      args.value = form.payable
      data = _.values(_.unset(form, 'payable'))
    }
    dispatch(contractSend(abiName, address, func, data, args))
      .then((transaction) => {
        dispatch(actionsForm.success(idForm, transaction.hash));
        dispatch(actionsForm.stop(idForm))
      })
      .catch(() => {
        dispatch(actionsForm.stop(idForm))
      })
  }
}
