import _ from 'lodash'
import hett from 'hett'
import { actions as formActions } from 'vol4-form'
import { flashMessage } from '../app/actions'
import { SET_LOAD_BUILDERS, SET_BUILDERS, SET_FIELDS } from './actionTypes'

export function setLoadBuilders() {
  return {
    type: SET_LOAD_BUILDERS
  }
}

export function setBuilders(builders) {
  return {
    type: SET_BUILDERS,
    payload: builders
  }
}

export function setCreateFields(id, fields) {
  return {
    type: SET_FIELDS,
    payload: {
      id,
      fields
    }
  }
}

const getBuilder = (name) => {
  let address
  return hett.getAddressByName(name)
    .then((result) => {
      address = result
      return hett.getContractByName(name, address)
    })
    .then(contract => contract.call('buildingCostWei'))
    .then(fee => (
      {
        name,
        address,
        fee: hett.web3.fromWei(Number(fee))
      }
    ))
    .catch((d) => {
      console.log(name, d);
    })
}
export function load() {
  return (dispatch) => {
    dispatch(setLoadBuilders())
    const builders = {
      BuilderTokenEmission: {
        id: 'BuilderTokenEmission',
        name: 'ERC20 token with emission builder',
        builderAddress: '',
        builderAbiUrl: 'https://raw.githubusercontent.com/airalab/DAO-Factory/master/abi/BuilderTokenEmission.json',
        builderAbiName: 'BuilderTokenEmission',
        abiUrl: 'https://raw.githubusercontent.com/airalab/core/master/abi/TokenEmission.json',
        abiName: 'TokenEmission',
        fee: 0,
      },
      BuilderCrowdfunding: {
        id: 'BuilderCrowdfunding',
        name: 'Crowdfunding builder',
        builderAddress: '',
        builderAbiUrl: 'https://raw.githubusercontent.com/airalab/DAO-Factory/master/abi/BuilderCrowdfunding.json',
        builderAbiName: 'BuilderCrowdfunding',
        abiUrl: 'https://raw.githubusercontent.com/airalab/core/master/abi/Crowdfunding.json',
        abiName: 'Crowdfunding',
        fee: 0,
      }
    }
    const items = []
    _.forEach(builders, (item) => {
      items.push(getBuilder(item.builderAbiName))
    })
    Promise.all(items)
      .then((result) => {
        const buildersComplete = {}
        _.forEach(result, (item) => {
          if (!_.isUndefined(item)) {
            buildersComplete[item.name] = {
              ...builders[item.name],
              builderAddress: item.address,
              fee: item.fee
            }
          }
        })
        dispatch(setBuilders(buildersComplete))
      })
  }
}

export function loadCreateFields(idBuilder) {
  return (dispatch, getState) => {
    const state = getState()
    hett.getAbiByName(state.factory.items[idBuilder].builderAbiName)
      .then((abi) => {
        const fields = {}
        const func = _.find(abi, { name: 'create' });
        _.forEach(func.inputs, (item) => {
          fields[item.name] = {
            value: (item.name === '_client' && item.type === 'address') ? hett.web3h.coinbase() : '',
            type: 'text',
            placeholder: item.type,
            validator: ['required', item.type],
          }
        })
        dispatch(setCreateFields(idBuilder, fields))
      })
  }
}

export function contractSend(abi, address, action, values, args = {}) {
  return dispatch => (
    hett.getContractByName(abi, address)
      .then(contract => contract.send(action, values, args))
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

export function deploy(idBuilder, idForm, form) {
  return (dispatch, getState) => {
    const state = getState()
    const abiName = state.factory.items[idBuilder].builderAbiName
    const address = state.factory.items[idBuilder].builderAddress
    dispatch(formActions.start(idForm))
    hett.getContractByName(abiName, address)
      .then((contract) => {
        contract
          .watch('Builded')
          .then((params) => {
            dispatch(formActions.success(idForm, 'New contract address: ' + params.instance))
          })
        return contract.call('buildingCostWei')
      })
      .then(result => (
        dispatch(contractSend(abiName, address, 'create', _.values(form), { value: result }))
      ))
      .then(() => {
        dispatch(formActions.stop(idForm))
      })
      .catch(() => {
        dispatch(formActions.stop(idForm))
      })
  }
}
