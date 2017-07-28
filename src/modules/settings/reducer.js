import { LOAD, SET_FIELD, SET_ALL } from './actionTypes'

const initialState = {
  isLoaded: false,
  fields: {
    address: ''
  }
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      return { ...state, isLoaded: action.payload }
    }

    case SET_FIELD: {
      return { ...state, fields: { ...state.fields, [action.payload.field]: action.payload.value } }
    }

    case SET_ALL: {
      return { ...state, fields: action.payload }
    }

    default:
      return state;
  }
}
