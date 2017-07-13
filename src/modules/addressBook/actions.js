import store from 'store'
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
