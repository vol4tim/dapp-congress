import Promise from 'bluebird'
import _ from 'lodash'
import axios from 'axios'
import hett from 'hett'
import { LOAD_LOGS, ADD_LOG, RESULT_PROPOSAL, SET_BALANCE, SET_BALANCE_USD, SET_PROPOSALS, SET_VOTED } from './actionTypes'
import { flashMessage } from '../app/actions'
// import { CONGRESS } from '../../config/config'

export function addLog(info) {
  return {
    type: ADD_LOG,
    payload: info
  }
}

export function resultProposal(info) {
  return {
    type: RESULT_PROPOSAL,
    payload: info
  }
}

export function setBalance(balance) {
  return {
    type: SET_BALANCE,
    payload: balance
  }
}

export function setBalanceUsd(balance) {
  return {
    type: SET_BALANCE_USD,
    payload: balance
  }
}

export function setProposals(proposals) {
  return {
    type: SET_PROPOSALS,
    payload: proposals
  }
}

export function setVoted(id, from, result) {
  return {
    type: SET_VOTED,
    payload: {
      id,
      from,
      result
    }
  }
}

export function setLoad(bool) {
  return {
    type: LOAD_LOGS,
    payload: bool
  }
}

const getLogItem = (type, item) => {
  let tx;
  return hett.web3h.getTransaction(item.transactionHash)
    .then((result) => {
      if (result) {
        tx = result
        return hett.web3h.getBlock(tx.blockNumber)
      }
      return false
    })
    .then((block) => {
      if (block) {
        return {
          type,
          block,
          tx,
          result: item
        }
      }
      return false
    })
}

export function loadLogs(congressAddress) {
  return (dispatch) => {
    dispatch(setLoad(true))
    const filter = hett.web3.eth.filter({ address: congressAddress, fromBlock: 0, toBlock: 'latest' });
    filter.get((error, result) => {
      if (!error) {
        const items = []
        _.forEach(result, (item) => {
          let type = 'none'
          if (item.topics[0] === '0xc34f869b7ff431b034b7b9aea9822dac189a685e0b015c7d1be3add3f89128e8') { // Voted
            type = 'Voted'
          } else if (item.topics[0] === '0x646fec02522b41e7125cfc859a64fd4f4cefd5dc3b6237ca0abe251ded1fa881') { // ProposalAdded
            type = 'ProposalAdded'
          }
          if (type !== 'none') {
            items.push(getLogItem(type, item))
            dispatch(setVoted(
              parseInt(item.topics[1].replace(/^0x[0]+/, ''), 16),
              '0x' + item.topics[3].replace(/^0x[0]+/, ''),
              Number(item.topics[2].replace(/^0x[0]+/, ''))
            ))
          }
        })
        Promise.all(items)
          .then((logs) => {
            _.forEach(logs, (item) => {
              if (item) {
                dispatch(addLog(item))
              }
            })
            dispatch(setLoad(false))
          })
      } else {
        console.log(error);
        dispatch(setLoad(false))
      }
    })
  }
}

export function loadBalance(congressAddress) {
  return (dispatch) => {
    let balance = 0
    hett.web3h.getBalance(congressAddress)
      .then((result) => {
        balance = result
        dispatch(setBalance(result))
        return axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/')
      })
      .then((result) => {
        const data = result.data
        dispatch(setBalanceUsd((balance * data[0].price_usd).toFixed(2)))
      })
  }
}

const getProposal = (congress, index) => (
  congress.call('proposals', [index])
    .then(result => (
      {
        id: index,
        recipient: result[0],
        amount: hett.web3.fromWei(Number(result[1])),
        description: result[2],
        votingDeadline: Number(result[3]),
        executed: result[4],
        proposalPassed: result[5],
        numberOfVotes: Number(result[6]),
        currentResult: Number(result[7]),
        proposalHash: result[8],
        // Vote[]  votes: result[0],
        // mapping(address => bool) voted;
      }
    ))
)
export function loadProposals(congressAddress) {
  return (dispatch) => {
    let congress;
    hett.getContractByName('Congress', congressAddress)
      .then((contract) => {
        congress = contract;
        return congress.call('numProposals')
      })
      .then((length) => {
        const proposals = [];
        for (let i = 0; i < Number(length); i += 1) {
          proposals.push(getProposal(congress, i));
        }
        return Promise.all(proposals)
      })
      .then((proposals) => {
        dispatch(setProposals(proposals))
      })
  }
}

export function loadProposal(address, id) {
  return (dispatch) => {
    hett.getContractByName('Congress', address)
      .then(contract => (
        getProposal(contract, id)
      ))
      .then((info) => {
        dispatch(resultProposal(info))
      })
  }
}

export function contractSend(abi, address, action, values) {
  return dispatch => (
    hett.getContractByName(abi, address)
      .then(contract => contract.send(action, values))
      .then((txId) => {
        dispatch(flashMessage('txId: ' + txId))
        return hett.watcher.addTx(txId)
      })
      .then((transaction) => {
        dispatch(flashMessage('blockNumber: ' + transaction.blockNumber))
        return transaction;
      })
      .catch((e) => {
        console.log(e);
        return Promise.reject();
      })
  )
}

export function send(address, action, data) {
  return (dispatch) => {
    dispatch(contractSend('Congress', address, action, data))
  }
}

export function addProposal(address, data) {
  return (dispatch) => {
    let bytecode = ''
    if (_.has(data, 'action') && !_.isEmpty(data.action)) {
      let abi = [];
      try {
        abi = JSON.parse(data.abi.trim());
        const contract = hett.getContract(abi, '')
        const params = (_.has(data, 'params')) ? data.params : []
        bytecode = contract.web3Contract[data.action].getData(...params)
      } catch (e) {
        console.log(e);
      }
    }
    dispatch(send(address, 'newProposal', [data.beneficiary, data.amount, data.jobDescription, bytecode]))
  }
}
