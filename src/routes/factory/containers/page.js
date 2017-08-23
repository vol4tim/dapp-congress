import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Load from '../../../shared/components/app/load'
import Layout from '../../../shared/containers/layout'
import * as Pages from '../index'
import { load } from '../../../modules/factory/actions';

class Container extends Component {
  componentWillMount() {
    this.props.load();
  }

  render() {
    return (
      <Layout>
        {this.props.isLoad ?
          <Load />
          :
          <Switch>
            <Route exact path={this.props.match.path} component={Pages.List} />
            <Route path={`${this.props.match.path}/create/:id`} component={Pages.Form} />
            <Redirect to={`${this.props.match.url}`} />
          </Switch>
        }
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoad: state.factory.isLoad
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

export default connect(mapStateToProps, mapDispatchToProps)(Container)
