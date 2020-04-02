import { connect } from 'react-redux'

import { setAppMode } from '../actions/index.js'

import RouterComponent from '../components/RouterComponent.js'


const mapStateToProps = state => ({
	appMode: state.appMode
})

const mapDispatchToProps = dispatch => ({
	setAppMode: (mode) => dispatch(setAppMode(mode))
})

// connects Checkout component to global store, passing in necessary state and dispatch methods as props
export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);

