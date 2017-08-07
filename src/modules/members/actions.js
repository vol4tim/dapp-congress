import hett from 'hett'
import { actions as formActions } from 'vol4-form'
import { SET_MEMBERS } from './actionTypes'
import { promiseFor } from '../../utils/helper'
import { flashMessage } from '../app/actions'

export function setMembers(members) {
  return {
    type: SET_MEMBERS,
    payload: members
  }
}

export function load(congressAddress) {
  return (dispatch) => {
    let congress;
    const members = [];
    return hett.getContractByName('Congress', congressAddress)
      .then((contract) => {
        congress = contract;
        return promiseFor(id => (id !== false), id => (
          congress.call('members', [id])
            .then((result) => {
              if (result[0] !== '0x0000000000000000000000000000000000000000') {
                members.push({
                  address: result[0],
                  name: result[1],
                  date: Number(result[2]),
                })
              }
              return id + 1;
            })
            .catch(() => false)
        ), 0)
      })
      .then(() => {
        dispatch(setMembers(members))
      })
  }
}

export function contractSend(abi, address, action, values) {
  return dispatch => (
    hett.getContractByName(abi, address)
      .then(contract => contract.send(action, values))
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

export function send(address, action, data) {
  return (dispatch) => {
    dispatch(contractSend('Congress', address, action, data))
  }
}

export function addMember(form) {
  return (dispatch, getState) => {
    const state = getState()
    const address = state.settings.fields.address
    dispatch(formActions.start('addMember'))
    dispatch(contractSend('Congress', address, 'addMember', [form.address, form.name]))
      .then(() => {
        dispatch(formActions.stop('addMember'))
        dispatch(formActions.success('addMember', 'Добавлен новый участник'))
      })
      .catch(() => {
        dispatch(formActions.stop('addMember'))
      })
  }
}

export function removeMember(target) {
  return (dispatch, getState) => {
    const state = getState()
    const address = state.settings.fields.address
    dispatch(contractSend('Congress', address, 'removeMember', [target]))
  }
}
