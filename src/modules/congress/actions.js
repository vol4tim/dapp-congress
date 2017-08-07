import Promise from 'bluebird'
import _ from 'lodash'
import axios from 'axios'
import hett from 'hett'
import { actions as formActions } from 'vol4-form'
import { LOAD_LOGS, ADD_LOG, RESULT_PROPOSAL, SET_BALANCE, SET_BALANCE_USD, SET_PROPOSALS, SET_OWNER, SET_VOTED } from './actionTypes'
import { flashMessage } from '../app/actions'
import { load as loadMembers } from '../members/actions'
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

export function setOwner(owner) {
  return {
    type: SET_OWNER,
    payload: owner
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
          }
          if (type === 'Voted') {
            let id = parseInt(item.topics[1].replace(/^0x[0]+/, ''), 16);
            if (_.isNaN(id)) {
              id = 0
            }
            dispatch(setVoted(
              id,
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

const getProposal = (congress, index, minimumQuorum) => (
  congress.call('proposals', [index])
    .then((result) => {
      const proposal = {
        id: index,
        recipient: result[0],
        amount: hett.web3.fromWei(Number(result[1])),
        description: result[2],
        votingDeadline: Number(result[3]),
        executed: result[4],
        proposalPassed: result[5],
        numberOfVotes: Number(result[6]),
        currentResult: Number(result[7]),
        proposalHash: result[8]
        // Vote[]  votes: result[0],
        // mapping(address => bool) voted;
      }
      const now = (new Date().getTime()) / 1000
      proposal.type = 'completed' // можно исполненить, принимаются голоса
      if (proposal.executed === true) {
        proposal.type = 'executed' // исполнен, голосовать уже не нужно
      } else if (now < proposal.votingDeadline) {
        proposal.type = 'pending' // время голосования еще не законченно, принимаются голоса
      } else if (proposal.numberOfVotes < minimumQuorum) {
        proposal.type = 'quorum' // кворум не собран, время уже подошло, но голоса принимаются
      }
      return proposal;
    })
)

export function loadProposals(congressAddress) {
  return (dispatch) => {
    let congress;
    let minimumQuorum;
    return hett.getContractByName('Congress', congressAddress)
      .then((contract) => {
        congress = contract;
        return congress.call('owner')
      })
      .then((result) => {
        dispatch(setOwner(result))
        return congress.call('minimumQuorum')
      })
      .then((result) => {
        minimumQuorum = Number(result)
        return congress.call('numProposals')
      })
      .then((length) => {
        const proposals = [];
        for (let i = 0; i < Number(length); i += 1) {
          proposals.push(getProposal(congress, i, minimumQuorum));
        }
        return Promise.all(proposals)
      })
      .then((proposals) => {
        dispatch(setProposals(proposals))
        return Promise.resolve()
      })
  }
}

const isEvents = {};
export function events(address) {
  return (dispatch) => {
    if (_.has(isEvents, address)) {
      return;
    }
    isEvents[address] = true;
    hett.getContractByName('Congress', address)
      .then((contract) => {
        contract.listen('ProposalAdded', (result) => {
          dispatch(flashMessage(
            'Proposal added #' + Number(result.proposal),
            'info',
            true
          ))
          dispatch(loadProposals(address));
          dispatch(loadLogs(address));
        })
        contract.listen('Voted', (result) => {
          dispatch(flashMessage(
            'Voted #' + Number(result.proposal) + ' member ' + result.voter,
            'info',
            true
          ))
          dispatch(loadProposals(address));
          dispatch(loadLogs(address));
        })
        contract.listen('ProposalTallied', (result) => {
          dispatch(flashMessage(
            'Proposal closed #' + Number(result.proposal),
            'info',
            true
          ))
          dispatch(loadProposals(address));
          dispatch(loadLogs(address));
        })
        contract.listen('MembershipChanged', (result) => {
          console.log(result);
          dispatch(flashMessage(
            (result.isMember === true) ? 'Added member ' + result.member : 'Member removed ' + result.member,
            'info',
            true
          ))
          dispatch(loadMembers(address));
        })
        contract.listen('ChangeOfRules', () => {
          dispatch(flashMessage(
            'Voting rules changed',
            'info',
            true
          ))
        })
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

function getData(abi, action, params) {
  try {
    const abiJson = JSON.parse(abi.trim());
    const contract = hett.getContract(abiJson, '')
    return contract.web3Contract[action].getData(...params)
  } catch (e) {
    console.log(e);
  }
  return false;
}

export function addProposal(form) {
  return (dispatch, getState) => {
    const state = getState()
    const address = state.settings.fields.address
    dispatch(formActions.start('addProposal'))
    let bytecode = ''
    if (_.has(form, 'action') && !_.isEmpty(form.action)) {
      const params = (_.has(form, 'params')) ? _.values(form.params) : []
      bytecode = getData(form.abi, form.action, params)
    }
    dispatch(contractSend('Congress', address, 'newProposal', [form.beneficiary, form.amount, form.jobDescription, bytecode]))
      .then(() => {
        dispatch(formActions.stop('addProposal'))
        dispatch(formActions.success('addProposal', 'Создано новое голосование'))
      })
      .catch(() => {
        dispatch(formActions.stop('addProposal'))
      })
  }
}

export function execute(id, form) {
  return (dispatch, getState) => {
    const state = getState()
    const address = state.settings.fields.address
    dispatch(formActions.start('execute' + id))
    let bytecode = ''
    if (!_.isEmpty(form.action)) {
      bytecode = getData(form.abi, form.action, _.values(form.params))
    }
    dispatch(contractSend('Congress', address, 'executeProposal', [id, bytecode]))
      .then(() => {
        dispatch(formActions.stop('execute' + id))
        dispatch(formActions.success('check' + id, 'Исполнено'))
      })
      .catch(() => {
        dispatch(formActions.stop('execute' + id))
      })
  }
}

export function vote(id, form) {
  return (dispatch, getState) => {
    const state = getState()
    const address = state.settings.fields.address
    dispatch(formActions.start('vote' + id))
    dispatch(contractSend('Congress', address, 'vote', [id, form.bool, form.comment]))
      .then(() => {
        dispatch(formActions.stop('check' + id))
        dispatch(formActions.success('check' + id, 'Голос принят'))
      })
      .catch(() => {
        dispatch(formActions.stop('vote' + id))
      })
  }
}

export function checkProposalCode(id, form) {
  return (dispatch, getState) => {
    const state = getState()
    const address = state.settings.fields.address
    const proposal = state.congress.proposals[id]
    dispatch(formActions.start('check' + id))
    hett.getContractByName('Congress', address)
      .then((contract) => {
        let bytecode = ''
        if (!_.isEmpty(form.action)) {
          bytecode = getData(form.abi, form.action, _.values(form.params))
        }
        return contract.call('checkProposalCode', [id, proposal.recipient, hett.web3.toWei(proposal.amount), bytecode])
      })
      .then((result) => {
        dispatch(formActions.stop('check' + id))
        if (result) {
          dispatch(formActions.success('check' + id, 'True'))
        } else {
          dispatch(formActions.error('check' + id, 'False'))
        }
      })
  }
}
