import { LOAD, NETWORK, SET_LANGUAGE } from './actionTypes'

const initialState = {
  isLoaded: false,
  title: 'dApp Congress',
  language: 'en',
  network: ''
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      return { ...state, isLoaded: action.payload }
    }

    case NETWORK:
      return { ...state, network: action.payload }

    case SET_LANGUAGE:
      return { ...state, language: action.payload }

    default:
      return state;
  }
}
