import React from 'react'
import Voted from './voted'
import Added from './added'

const Item = (props) => {
  if (props.item.type === 'Voted') {
    return <Voted {...props.item} />
  } else if (props.item.type === 'ProposalAdded') {
    return <Added {...props.item} />
  }
  return null
}

const Main = props => (
  (<div>
    {props.items.map((item, index) =>
      <Item key={index} item={item} />
    )}
  </div>)
)

export default Main
