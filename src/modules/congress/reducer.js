import _ from 'lodash'
import { LOAD_LOGS, ADD_LOG, RESULT_PROPOSAL, SET_BALANCE, SET_BALANCE_USD, SET_PROPOSALS, SET_OWNER, SET_VOTED } from './actionTypes'

const initialState = {
  loadLogs: false,
  logs: [],
  balance: 0,
  balanceUsd: 0,
  owner: '',
  proposals: {},
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
    case LOAD_LOGS: {
      return { ...state, loadLogs: action.payload }
    }

    case ADD_LOG: {
      let logs = [...state.logs]
      logs.unshift(action.payload)
      logs = _.reverse(_.sortBy(logs, item => item.block.timestamp))
      return { ...state, logs }
    }

    case RESULT_PROPOSAL: {
      return { ...state, proposal: action.payload }
    }

    case SET_BALANCE: {
      return { ...state, balance: action.payload }
    }

    case SET_BALANCE_USD: {
      return { ...state, balanceUsd: action.payload }
    }

    case SET_PROPOSALS: {
      const proposals = {}
      _.forEach(action.payload, (item) => {
        proposals[item.id] = item
      })
      return { ...state, proposals }
    }

    case SET_OWNER: {
      return { ...state, owner: action.payload }
    }

    case SET_VOTED: {
      const proposals = { ...state.proposals }
      if (_.has(proposals, action.payload.id)) {
        proposals[action.payload.id] = {
          ...proposals[action.payload.id],
          voted: {
            ...proposals[action.payload.id].voted,
            [action.payload.from]: action.payload.result
          }
        }
      }
      return { ...state, proposals }
    }

    default:
      return state;
  }
}
