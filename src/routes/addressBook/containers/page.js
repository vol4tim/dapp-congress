import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Layout from '../../../shared/containers/layout'
import * as Pages from '../index'

const Page = ({ match }) => (
  <Layout>
    <Switch>
      <Route exact path={match.path} component={Pages.List} />
      <Route path={`${match.path}/add`} component={Pages.Form} />
      <Route path={`${match.path}/edit/:address`} component={Pages.Form} />
      <Redirect to={`${match.url}`} />
    </Switch>
  </Layout>
)

export default Page
