import Notifications from 'react-notification-system-redux';
import i18next from 'i18next'
import { LOAD, SET_LANGUAGE } from './actionTypes'
import { load as loadSettings } from '../settings/actions';
import { loadBalance, loadProposals, loadLogs } from '../congress/actions';
import { loadAccounts } from '../addressBook/actions';

export function setLoad(bool) {
  return {
    type: LOAD,
    payload: bool
  }
}

export function flashMessage(message, type = 'info') {
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
        if (settings.address !== '') {
          dispatch(loadProposals(settings.address));
          dispatch(loadBalance(settings.address));
          dispatch(loadLogs(settings.address));
        }
        dispatch(loadAccounts());
        setTimeout(() => {
          dispatch(setLoad(true));
        }, 1000)
      })
  }
}
