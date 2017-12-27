import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import * as Congress from '../../routes/congress'
import * as Members from '../../routes/members'
import * as AddressBook from '../../routes/addressBook'
import * as Token from '../../routes/token'
import * as Settings from '../../routes/settings'
import NotFound from '../components/app/notFound'
import Load from '../components/app/load'
import { load } from '../../modules/app/actions';

import './style.css'

class Bootstrap extends Component {
  componentWillMount() {
    this.props.load();
  }

  render() {
    return (
      <Route render={() => {
        if (!this.props.isLoaded) {
          return <Load />
        } else if (this.props.settings.fields.address === '') {
          return <Redirect to="/start" />
        }
        return (
          <Switch>
            <Redirect exact path="/" to="/congress" />
            <Route path="/congress" component={Congress.Page} />
            <Route path="/address-book" component={AddressBook.Page} />
            <Route path="/token" component={Token.Page} />
            <Route path="/members" component={Members.Page} />
            <Route path="/settings" component={Settings.Page} />
            <Route component={NotFound} />
          </Switch>
        )
      }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoaded: state.app.isLoaded,
    settings: state.settings
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    load
  }, dispatch)
  return {
    load: actions.load
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bootstrap)
