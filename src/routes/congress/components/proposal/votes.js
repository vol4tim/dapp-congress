import React from 'react'

const Votes = props => (
  <div>
    <h3 className="text-center">Votes</h3>
    <hr />
    <p className="text-success">Ok: <b>{props.ok}</b></p>
    <p className="text-danger">No: <b>{props.no}</b></p>
    <div className="progress">
      <div
        className="progress-bar progress-bar-success"
        style={{ width: ((props.ok * 100) / 5) + '%' }}
      >
        <span className="sr-only">80%</span>
      </div>
      <div
        className="progress-bar progress-bar-danger"
        style={{ width: ((props.no * 100) / 5) + '%' }}
      >
        <span className="sr-only">10%</span>
      </div>
    </div>
  </div>
)

export default Votes
