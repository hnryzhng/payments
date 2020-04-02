import { connect } from 'react-redux'

import { delCartItem, updateCartItem, updateItemDisplay, finishCart, continueShopping } from '../actions/index.js'

import Cart from '../components/Cart.js'

// import shopping Cart
// import finishCart()

const mapStateToProps = state => ({
	shoppingCart: state.shoppingCart,
	finishedCart: state.finishedCart,
	finishedShopping: state.finishedShopping
})

const mapDispatchToProps = dispatch => ({
	delCartItem: (id) => dispatch(delCartItem(id)),
	updateCartItem: (id, quantity) => dispatch(updateCartItem(id, quantity)),
	updateItemDisplay: (id, bool) => dispatch(updateItemDisplay(id, bool)),	// toggle status of item in itemsList so that item card in Shopping page shows module depending on whether item is being updated or not
	finishCart: () => dispatch(finishCart()),
	continueShopping: () => dispatch(continueShopping())
})


// connects Cart component to global store, passing in necessary state and dispatch methods as props
export default connect(mapStateToProps, mapDispatchToProps)(Cart);