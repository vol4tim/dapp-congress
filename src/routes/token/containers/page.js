import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import Load from '../../../shared/components/app/load'
import Layout from '../../../shared/containers/layout'
import * as Pages from '../index'
import { load } from '../../../modules/token/actions';

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
            <Route path={`${this.props.match.path}/add`} component={Pages.Add} />
            <Route path={`${this.props.match.path}/view/:address`} component={Pages.View} />
            <Route path={`${this.props.match.path}/send/:address/:func`} component={Pages.Send} />
            <Redirect to={`${this.props.match.url}`} />
          </Switch>
        }
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoad: state.token.isLoad
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
