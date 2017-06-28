import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Result from '../components/result';
import { loadProposal } from '../../../modules/congress/actions';

function mapStateToProps(state) {
  return {
    result: state.congress.proposal
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    loadProposal
  }, dispatch)
  return {
    onSubmit: form => actions.loadProposal(form.id)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result)
