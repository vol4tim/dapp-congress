import store from 'store'
import _ from 'lodash'
import { SET_ACCOUNTS, ADD_ACCOUNT, REMOVE_ACCOUNT } from './actionTypes'

const initialState = {
  items: {}
}

export default function addressBook(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT: {
      const items = { ...state.items }
      items[action.payload.address] = action.payload
      store.set('accounts', items)
      return { ...state, items }
    }

    case REMOVE_ACCOUNT: {
      const items = { ...state.items }
      _.unset(items, action.payload)
      store.set('accounts', items)
      return { ...state, items }
    }

    case SET_ACCOUNTS: {
      const items = {}
      _.forEach(action.payload, (item) => {
        items[item.address] = item
      })
      return { ...state, items }
    }

    default:
      return state;
  }
}
