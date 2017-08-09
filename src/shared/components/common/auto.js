import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Autocomplete from 'react-autocomplete'

export function sortStates(a, b, value) {
  const aLower = a.name
  const bLower = b.name
  const valueLower = value
  const queryPosA = aLower.indexOf(valueLower)
  const queryPosB = bLower.indexOf(valueLower)
  if (queryPosA !== queryPosB) {
    return queryPosA - queryPosB
  }
  return aLower < bLower ? -1 : 1
}
export function matchStateToTerm(state, value) {
  return (
    state.name.indexOf(value) !== -1 ||
    state.value.indexOf(value) !== -1
  )
}
export const styles = {
  item: {
    padding: '5px 15px',
    cursor: 'default',
    borderBottom: '1px solid #eee'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '5px 15px',
    cursor: 'default',
    borderBottom: '1px solid #eee'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}

const Auto = props => (
  <Autocomplete
    {...props.input}
    items={props.items}
    wrapperStyle={{}}
    inputProps={{ id: 'states-autocomplete', className: 'form-control', name: props.input.name }}
    getItemValue={item => item.value}
    shouldItemRender={matchStateToTerm}
    sortItems={sortStates}
    onSelect={
      value => props.input.onChange({ target: { name: props.input.name, value } })
    }
    renderItem={(item, isHighlighted) => (
      <div
        style={isHighlighted ? styles.highlightedItem : styles.item}
        key={item.value}
      >
        <b>{item.name}</b><br />
        <small>{item.value}</small>
      </div>
    )}
  />
)

function mapStateToProps(state, props) {
  let items;
  if (_.has(props, 'items')) {
    items = props.items
  } else {
    items = _.map(state.addressBook.items, item => (
      {
        value: item.address,
        name: item.name
      }
    ))
    items = _.merge(items, _.map(state.members.items, item => (
      {
        value: item.address,
        name: item.name
      }
    )))
  }
  return {
    items
  }
}

export default connect(mapStateToProps)(Auto)
