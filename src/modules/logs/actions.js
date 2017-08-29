import Promise from 'bluebird'
import store from 'store'
import _ from 'lodash'
import { ADD, READ, CLEAR, SET_ALL } from './actionTypes'

export function add(title, message, time) {
  return {
    type: ADD,
    payload: {
      title,
      message,
      time
    }
  }
}

export function read() {
  return {
    type: READ
  }
}

export function clear() {
  return {
    type: CLEAR
  }
}

export function setAll(messages) {
  return {
    type: SET_ALL,
    payload: messages
  }
}

export function save(title, message) {
  return (dispatch) => {
    let messages = store.get('messagesLog')
    if (_.isUndefined(messages)) {
      messages = []
    }
    const time = Date.now() / 1000
    messages.push({
      title,
      message,
      time
    })
    store.set('messagesLog', messages)
    dispatch(add(title, message, time))
  }
}

export function clearSave() {
  return (dispatch) => {
    store.set('messagesLog', [])
    dispatch(clear())
  }
}

export function load() {
  return (dispatch) => {
    const messages = store.get('messagesLog')
    if (!_.isUndefined(messages)) {
      dispatch(setAll(messages))
    }
    return Promise.resolve(messages)
  }
}
