import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddProposal from '../components/addProposal';
import { addProposal } from '../../../modules/congress/actions';

function mapStateToProps() {
  return {}
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    addProposal
  }, dispatch)
  return {
    onSubmit: form => actions.addProposal(form)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProposal)
