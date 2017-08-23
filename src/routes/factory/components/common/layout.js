import React from 'react'

const Layout = props => (
  <div>
    <h2 style={{ float: 'left', marginTop: 0 }}>{props.title}</h2>
    <hr style={{ clear: 'both' }} />
    <div>
      {props.children}
    </div>
  </div>
)

export default Layout
