import { ADD, READ, CLEAR, SET_ALL } from './actionTypes'

const initialState = {
  messages: [],
  isRead: true
}

export default function logs(state = initialState, action) {
  switch (action.type) {
    case ADD: {
      return { ...state, isRead: false, messages: [...state.messages, action.payload] }
    }

    case READ: {
      return { ...state, isRead: true }
    }

    case CLEAR: {
      return { ...state, messages: [] }
    }

    case SET_ALL: {
      return { ...state, messages: action.payload }
    }

    default:
      return state;
  }
}
