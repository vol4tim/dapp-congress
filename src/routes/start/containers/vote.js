import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Vote from '../components/vote';
import { send } from '../../../modules/congress/actions';

function mapStateToProps() {
  return {}
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    send
  }, dispatch)
  return {
    onSubmit: form => actions.send('vote', _.values(form))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
