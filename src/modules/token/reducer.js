import _ from 'lodash'
import { IS_LOAD, ADD, SET_INFO, REMOVE } from './actionTypes'

const initialState = {
  isLoad: false,
  items: {}
}

export default function token(state = initialState, action) {
  switch (action.type) {
    case IS_LOAD: {
      return { ...state, isLoad: action.payload }
    }

    case ADD: {
      const items = { ...state.items }
      items[action.payload.address] = { isLoad: true, info: {}, abi: {}, ...action.payload }
      return { ...state, items }
    }

    case SET_INFO: {
      const items = { ...state.items }
      items[action.payload.address] = {
        ...items[action.payload.address],
        isLoad: false,
        abi: action.payload.abi,
        info: action.payload.info
      }
      return { ...state, items }
    }

    case REMOVE: {
      const items = { ...state.items }
      _.unset(items, action.payload)
      return { ...state, items }
    }

    default:
      return state;
  }
}
