import { ADD_LOG, RESULT_PROPOSAL, SET_BALANCE } from './actionTypes'

const initialState = {
  logs: [],
  balance: 0,
  proposal: {
    id: 0,
    recipient: '',
    amount: 0,
    description: '',
    votingDeadline: 0,
    executed: '',
    proposalPassed: '',
    numberOfVotes: 0,
    currentResult: 0,
    proposalHash: '',
  },
}

export default function congress(state = initialState, action) {
  switch (action.type) {
    case ADD_LOG: {
      const logs = [...state.logs]
      logs.unshift(action.payload)
      return { ...state, logs }
    }

    case RESULT_PROPOSAL: {
      return { ...state, proposal: action.payload }
    }

    case SET_BALANCE: {
      return { ...state, balance: action.payload }
    }

    default:
      return state;
  }
}
