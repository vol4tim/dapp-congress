import Notifications from 'react-notification-system-redux';
import i18next from 'i18next'
import _ from 'lodash'
import { LOAD, SET_LANGUAGE } from './actionTypes'
import { load as loadSettings } from '../settings/actions';
import { loadBalance, loadProposals, loadLogs, events } from '../congress/actions';
import { loadAccounts } from '../addressBook/actions';
import { load as loadMembers } from '../members/actions';
import { save as addLog, load as loadMessagesLog } from '../logs/actions';

export function setLoad(bool) {
  return {
    type: LOAD,
    payload: bool
  }
}

export function flashMessage(message, type = 'info', isSave = false) {
  return (dispatch) => {
    const notificationOpts = {
      // title: 'Hey, it\'s good to see you!',
      message,
      position: 'tr',
      autoDismiss: 10
    };
    if (type === 'error') {
      dispatch(Notifications.error(notificationOpts))
    } else {
      dispatch(Notifications.info(notificationOpts))
    }
    if (isSave) {
      dispatch(addLog('', message))
    }
  }
}

export function setLanguage(language) {
  i18next.changeLanguage(language)
  return {
    type: SET_LANGUAGE,
    payload: language
  }
}

export function load() {
  return (dispatch) => {
    dispatch(setLoad(false));
    dispatch(loadSettings())
      .then((settings) => {
        if (_.has(settings, 'address') && settings.address !== '') {
          dispatch(loadProposals(settings.address))
            .then(() => {
              dispatch(loadLogs(settings.address));
            })
          dispatch(loadBalance(settings.address));
          dispatch(events(settings.address));
          dispatch(loadMembers(settings.address));
        }
        dispatch(loadAccounts());
        dispatch(loadMessagesLog());
        setTimeout(() => {
          dispatch(setLoad(true));
        }, 1000)
      })
  }
}
