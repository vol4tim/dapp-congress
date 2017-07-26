import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../shared/containers/app'
import NotFound from '../shared/components/app/notFound'
import * as Congress from '../routes/congress'
import * as AddressBook from '../routes/addressBook'

export const routes = () =>
  (<div>
    <Route path="/" component={App}>
      <IndexRoute component={Congress.List} />
      <Route path="/congress">
        <Route path="list(/:type)" component={Congress.List} />
        <Route path="add" component={Congress.Add} />
        <Route path="view/:id" component={Congress.View} />
        <Route path="vote/:id" component={Congress.Vote} />
      </Route>
      <Route path="/address-book">
        <IndexRoute component={AddressBook.List} />
        <Route path="add" component={AddressBook.Form} />
        <Route path="edit/:address" component={AddressBook.Form} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </div>)