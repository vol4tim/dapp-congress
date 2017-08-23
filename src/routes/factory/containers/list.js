import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Layout } from '../components/common'
import { Builder } from '../components/factory'

const Container = props => (
  <Layout title="Factory">
    {props.items.map((item, index) =>
      <Builder key={index} item={item} />
    )}
  </Layout>
)

function mapStateToProps(state) {
  return {
    items: _.values(state.factory.items)
  }
}

export default connect(mapStateToProps)(Container)
