import { connect } from 'react-redux'

import Completed from '../components/Completed.js'

const mapStateToProps = state => ({
	customerInfo: state.customerInfo,
	finishedCheckout: state.finishedCheckout
})

export default connect(mapStateToProps, null)(Completed);

