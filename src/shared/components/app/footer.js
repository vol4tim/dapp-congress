import React from 'react'

export default function (props) {
  return (
    <footer className="footer" style={{ borderTop: '1px solid #eee', marginTop: 20, padding: '10px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <p>2017</p>
          </div>
          <div className="col-md-2 text-right">
            <span className="label label-info">{props.network}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
