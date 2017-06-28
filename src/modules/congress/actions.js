import Promise from 'bluebird'
import _ from 'lodash'
import hett from 'hett'
import { ADD_LOG, RESULT_PROPOSAL, SET_BALANCE } from './actionTypes'
import { flashMessage } from '../app/actions'
import { CONGRESS } from '../../config/config'

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

export function logs() {
  return (dispatch) => {
    hett.web3.eth.filter({ address: CONGRESS, fromBlock: 0, toBlock: 'latest' }, (error, result) => {
      if (!error) {
        let type = 'none'
        if (result.topics[0] === '0xc34f869b7ff431b034b7b9aea9822dac189a685e0b015c7d1be3add3f89128e8') { // Voted
          type = 'Voted'
        } else if (result.topics[0] === '0x646fec02522b41e7125cfc859a64fd4f4cefd5dc3b6237ca0abe251ded1fa881') { // ProposalAdded
          type = 'ProposalAdded'
        }
        if (type !== 'none') {
          hett.web3.eth.getTransaction(result.transactionHash, (e, tx) => {
            hett.web3.eth.getBlock(tx.blockNumber, (error2, block) => {
              dispatch(addLog({
                type,
                block,
                tx,
                result
              }))
            })
          })
        }
      } else {
        console.log(error);
      }
    });
  }
}

export function loadBalance() {
  return (dispatch) => {
    hett.web3h.getBalance(CONGRESS)
      .then((result) => {
        dispatch(setBalance(result))
      })
  }
}

export function loadProposal(id) {
  return (dispatch) => {
    let congress;
    hett.getContractByName('Congress', CONGRESS)
      .then((contract) => {
        congress = contract;
        return congress.call('proposals', [id])
      })
      .then(result => (
        {
          id,
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

export function send(action, data) {
  return (dispatch) => {
    dispatch(contractSend('Congress', CONGRESS, action, data))
  }
}

export function addProposal(data) {
  return (dispatch) => {
    let bytecode = ''
    if (_.has(data, 'address') && _.has(data, 'action') && !_.isEmpty(data.address) && !_.isEmpty(data.action)) {
      let abi = [];
      try {
        abi = JSON.parse(data.abi.trim());
        const contract = hett.getContract(abi, data.address)
        const params = (_.has(data, 'params')) ? data.params : []
        bytecode = contract.web3Contract[data.action].getData(...params)
      } catch (e) {
        console.log(e);
      }
    }
    dispatch(send('Congress', CONGRESS, 'newProposal', [data.beneficiary, data.amount, data.jobDescription, bytecode]))
  }
}
