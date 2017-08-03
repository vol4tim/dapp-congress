import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../shared/containers/app'
import NotFound from '../shared/components/app/notFound'
import * as Congress from '../routes/congress'
import * as AddressBook from '../routes/addressBook'
import * as Settings from '../routes/settings'

export const routes = () =>
  (<div>
    <Route path="/" component={App}>
      <IndexRoute component={Congress.List} />
      <Route path="/congress">
        <Route path="list(/:type)" component={Congress.List} />
        <Route path="add" component={Congress.Add} />
        <Route path="proposal/:id" component={Congress.Proposal} />
      </Route>
      <Route path="/address-book">
        <IndexRoute component={AddressBook.List} />
        <Route path="add" component={AddressBook.Form} />
        <Route path="edit/:address" component={AddressBook.Form} />
      </Route>
      <Route path="/settings">
        <IndexRoute component={Settings.Main} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </div>)
