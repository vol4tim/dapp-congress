import { reducer as forms } from 'vol4-form'
import app from './app/reducer';
import congress from './congress/reducer';
import members from './members/reducer';
import addressBook from './addressBook/reducer';
import token from './token/reducer';
import factory from './factory/reducer';
import settings from './settings/reducer';
import logs from './logs/reducer';

export {
  app,
  congress,
  members,
  addressBook,
  token,
  factory,
  settings,
  logs,
  forms
};
