import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import hett from 'hett'
import configureStore from './config/store'
import Routes from './config/routes'
import i18n from './config/i18n';
import { ProviderAbi, ProviderAddress } from './utils/helper'
import * as abis from './abi'
import addresses from './config/address'

hett.init(web3, new ProviderAbi(abis), new ProviderAddress(addresses));

const store = configureStore()

render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <HashRouter>
        <Routes />
      </HashRouter>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
)
