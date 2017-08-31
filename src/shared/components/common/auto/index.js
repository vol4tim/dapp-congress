import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Autocomplete from 'react-autocomplete'
import style from './style.css'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function sortStates(a, b, value) {
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
function matchStateToTerm(state, value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return true;
  }
  const regex = new RegExp('' + escapedValue, 'i');
  return (regex.test(state.name) || regex.test(state.value))
}
function renderItems(items) {
  const groups = {}
  const result = []
  _.forEach(items, (item) => {
    const group = item.props['data-group']
    if (!_.has(groups, group)) {
      groups[group] = []
    }
    groups[group].push(item)
  })
  _.forEach(groups, (group, name) => {
    result.push(<div key={'group' + name} className={style.itemHeader}>{name}</div>)
    _.forEach(group, (item) => {
      result.push(item)
    })
  })
  return result
}

const Auto = props => (
  <Autocomplete
    {...props.input}
    items={props.items}
    wrapperStyle={{}}
    inputProps={{ id: 'states-autocomplete', className: 'form-control', name: props.input.name, placeholder: props.input.placeholder }}
    getItemValue={item => item.value}
    shouldItemRender={matchStateToTerm}
    sortItems={sortStates}
    onSelect={
      value => props.input.onChange({ target: { name: props.input.name, value } })
    }
    renderItem={(item, isHighlighted) => (
      <div
        className={isHighlighted ? style.highlightedItem : style.item}
        key={item.value}
        data-group={item.group}
      >
        <b>{item.name}</b><br />
        <small>{item.value}</small>
      </div>
    )}
    renderMenu={(items) => {
      if (items.length === 0) {
        return <div />
      }
      return <div className={style.menu}>{renderItems(items)}</div>
    }}
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
        name: item.name,
        group: 'Address book'
      }
    ))
    items = _.concat(items, _.map(state.members.items, item => (
      {
        value: item.address,
        name: item.name,
        group: 'Members'
      }
    )))
    items = _.concat(items, _.map(state.token.items, item => (
      {
        value: item.address,
        name: item.info.name,
        group: 'Tokens'
      }
    )))
  }
  return {
    items
  }
}

export default connect(mapStateToProps)(Auto)
