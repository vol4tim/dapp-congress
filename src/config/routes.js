import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as Start from '../routes/start'
import * as Factory from '../routes/factory'
import BootstrapRoute from '../shared/containers/bootstrap'

const routes = () => (
  <Switch>
    <Route path="/start" component={Start.Page} />
    <Route path="/factory" component={Factory.Page} />
    <BootstrapRoute path="/" />
  </Switch>
)

export default routes
