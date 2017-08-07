import _ from 'lodash'
import { SET_MEMBERS } from './actionTypes'

const initialState = {
  items: {}
}

export default function members(state = initialState, action) {
  switch (action.type) {
    case SET_MEMBERS: {
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
