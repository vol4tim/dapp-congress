import Promise from 'bluebird'
import store from 'store'
import _ from 'lodash'
import { actions as actionsForm } from 'vol4-form'
import { LOAD, SET_FIELD, SET_ALL } from './actionTypes'
import { load as loadApp } from '../app/actions'

export function setLoad(bool) {
  return {
    type: LOAD,
    payload: bool
  }
}

export function setField(field, value) {
  return {
    type: SET_FIELD,
    payload: {
      field,
      value
    }
  }
}

export function setAll(settings) {
  return {
    type: SET_ALL,
    payload: settings
  }
}

export function saveField(field, value) {
  return (dispatch) => {
    dispatch(actionsForm.start('saveField'));
    let settings = store.get('settings')
    if (_.isUndefined(settings)) {
      settings = {}
    }
    settings[field] = value
    store.set('settings', settings)
    dispatch(setField(field, value))
    dispatch(loadApp())
    dispatch(actionsForm.stop('saveField'));
  }
}

export function saveAll(settings) {
  return (dispatch) => {
    dispatch(actionsForm.start('settings'));
    store.set('settings', settings)
    dispatch(setAll(settings))
    dispatch(loadApp())
    dispatch(actionsForm.stop('settings'));
  }
}

export function load() {
  return (dispatch) => {
    const settings = store.get('settings')
    if (!_.isUndefined(settings)) {
      dispatch(setAll(settings))
    }
    dispatch(setLoad(true))
    return Promise.resolve(settings)
  }
}
