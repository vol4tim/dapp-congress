import store from 'store'
import { actions as actionsForm } from 'vol4-form'
import { SET_ACCOUNTS, ADD_ACCOUNT, REMOVE_ACCOUNT } from './actionTypes'

export function addAccount(item) {
  return {
    type: ADD_ACCOUNT,
    payload: item
  }
}

export function removeAccount(address) {
  return {
    type: REMOVE_ACCOUNT,
    payload: address
  }
}

export function setAccounts(items) {
  return {
    type: SET_ACCOUNTS,
    payload: items
  }
}

export function loadAccounts() {
  return (dispatch) => {
    const accounts = store.get('accounts')
    dispatch(setAccounts(accounts))
  }
}

export function save(form) {
  return (dispatch) => {
    dispatch(actionsForm.start('addressBook'));
    dispatch(addAccount(form))
    dispatch(actionsForm.stop('addressBook'));
    dispatch(actionsForm.success('addressBook', 'Сохранено'));
  }
}
