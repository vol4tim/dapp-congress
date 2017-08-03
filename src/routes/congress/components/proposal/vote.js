import React from 'react'

const handleSubmit = (e, props, bool) => {
  props.handleChange({ target: { name: 'bool', value: bool } });
  props.handleSubmit(e);
}

const Form = props => (
  <div>
    <h3 className="text-center">Vote</h3>
    <hr />
    <form>
      <div className={(props.fields.comment.error) ? 'form-group has-error' : 'form-group'}>
        <label>Comment</label>
        <textarea onChange={props.handleChange} value={props.fields.comment.value} name="comment" className="form-control" />
        {props.fields.comment.error &&
          <span className="help-block">{props.fields.comment.error}</span>
        }
      </div>
      <div className="btn-group" style={{ width: '100%' }}>
        <button
          onClick={(e) => {
            handleSubmit(e, props, true);
          }}
          className="btn btn-success"
          style={{ width: '50%' }}
          disabled={props.form.submitting}
        >Ok</button>
        <button
          onClick={(e) => {
            handleSubmit(e, props, false);
          }}
          className="btn btn-danger"
          style={{ width: '50%' }}
          disabled={props.form.submitting}
        >No</button>
      </div>
      {props.form.success &&
        <div className="alert alert-success">{props.form.success}</div>
      }
    </form>
  </div>
)

export default Form
