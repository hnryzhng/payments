import { connect } from 'react-redux'

import CartSidebar from '../components/CartSidebar.js'

// passes necessary state and action dispatches as props to CartSidebar presentation component 
const mapStateToProps = state => ({
	shoppingCart: state.shoppingCart
})

export default connect(mapStateToProps, null)(CartSidebar);