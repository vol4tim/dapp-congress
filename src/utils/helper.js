import Promise from 'bluebird'
import BigNumber from 'bignumber.js'
import _ from 'lodash'
import axios from 'axios'
import hett from 'hett'

export const promiseFor = Promise.method((condition, action, value) => {
  if (!condition(value)) return value;
  return action(value).then(promiseFor.bind(null, condition, action));
});
// promiseFor(count => count < 10, count => (
//   new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(count);
//       resolve(count + 1);
//     }, 250);
//   })
// ), 0)
//   .then(() => {
//     console.log('good');
//   });

export const formatDecimals = (price, decimals) => {
  const priceNum = new BigNumber(price);
  return priceNum.shift(-decimals).toNumber();
}

export const getNetworkName = () => {
  let network;
  switch (Number(hett.web3.version.network)) {
    case 1:
      network = 'main'
      break;
    case 3:
      network = 'ropsten'
      break;
    case 4:
      network = 'rinkeby'
      break;
    case 42:
      network = 'kovan'
      break;
    default:
      network = '???'
  }
  return network
}

const getUrlAbi = (contract) => {
  let isBuilder = false;
  if (/builder/i.test(contract)) {
    isBuilder = true;
  }
  let repo = 'core'
  let version = '64e36c8ea43bb06ae8dd81a65af6d769b366f3c1';
  if (isBuilder) {
    repo = 'DAO-Factory'
    version = 'cb5b7c0ad9203e773b1db058540846e62a2931ff';
  }
  let url = 'https://raw.githubusercontent.com/airalab/' + repo + '/' + version + '/abi/'
  url += contract + '.json'
  return url
}

export class ProviderAbi {
  constructor(abis) {
    this.abis = {};
    this.setAbi(abis);
  }

  setAbi(abis) {
    this.abis = abis;
  }

  getAbi(name) {
    if (_.has(this.abis, name)) {
      return new Promise((resolve) => {
        resolve(this.abis[name]);
      });
    }
    return axios.get(getUrlAbi(name)).then(results => results.data)
  }
}

export class ProviderAddress {
  constructor(addresses) {
    this.addresses = {};
    this.setAddress(addresses);
  }

  setAddress(addresses) {
    this.addresses = addresses;
  }

  getAddress(name) {
    const network = hett.web3.version.network
    if (_.has(this.addresses, network)) {
      if (_.has(this.addresses[network], name)) {
        return new Promise((resolve) => {
          resolve(this.addresses[network][name]);
        });
      }
    }
    if (_.has(this.addresses, name)) {
      return new Promise((resolve) => {
        resolve(this.addresses[name]);
      });
    }
    return Promise.reject('Address not found')
  }
}

function isAddress(address, required = true) {
  if (!required && (address === '' || address === '0')) {
    return true;
  }
  if (hett.web3.isAddress(address)) {
  // if (address && address.length === 42 && /^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return true;
  }
  return false;
}

export const validate = (fields, form) => {
  const errors = {}
  _.forEach(fields, (field, name) => {
    if (_.has(field, 'validator')) {
      const validators = field.validator
      const value = form[name]
      _.forEach(validators, (validator) => {
        let isError = false
        switch (validator) {
          case 'required':
            isError = value !== '' ? false : 'обязательное поле'
            break;
          case 'address':
            isError = isAddress(value) ? false : 'не верный адрес'
            break;
          case 'uint':
          case 'uint8':
          case 'uint256':
            isError = _.isNumber(value * 1) && !_.isNaN(value * 1) ? false : 'должно быть число'
            break;
          default:
            isError = false
        }
        if (isError) {
          errors[name] = isError
          return false
        }
        return true
      })
    }
  })
  return errors
}

export const timeConverter = (timestamp) => {
  const a = new Date(timestamp * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time = date + ' ' + month + ' ' + year + ' ' +
    ((hour < 10) ? '0' + hour : hour) + ':' +
    ((min < 10) ? '0' + min : min) + ':' +
    ((sec < 10) ? '0' + sec : sec);
  return time;
}
