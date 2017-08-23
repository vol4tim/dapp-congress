import { SET_LOAD_BUILDERS, SET_BUILDERS, SET_FIELDS } from './actionTypes'

const initialState = {
  items: {},
  isLoad: false
}

export default function factory(state = initialState, action) {
  switch (action.type) {
    case SET_LOAD_BUILDERS: {
      return { ...state, isLoad: true }
    }

    case SET_BUILDERS: {
      return { ...state, items: action.payload, isLoad: false }
    }

    case SET_FIELDS: {
      const items = { ...state.items }
      items[action.payload.id] = {
        ...items[action.payload.id],
        createFields: action.payload.fields
      }
      return { ...state, items }
    }

    default:
      return state;
  }
}
