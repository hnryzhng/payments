import { connect } from 'react-redux'

import { addCartItem, updateCartItem, updateItemDisplay, finishShopping } from '../actions/index.js'

import Shopping from '../components/Shopping.js'

// passes necessary state and action dispatches as props to Shopping presentation component 

const mapStateToProps = state => ({
	itemsList: state.itemsList,	// grab itemsList from store and pass as prop
	shoppingCart: state.shoppingCart,
	finishedShopping: state.finishedShopping	// boolean to indicate completion of Shopping page in payment flow
})

const mapDispatchToProps = dispatch => ({
	addCartItem: (id, name, price, image_path, quantity) => dispatch(addCartItem(id, name, price, image_path, quantity)),	// passes dispatch function with action that adds item obj to shopping cart as a prop
	updateCartItem: (id, quantity) => dispatch(updateCartItem(id, quantity)),
	updateItemDisplay: (id, bool) => dispatch(updateItemDisplay(id, bool)),	// toggle status of item in itemsList so that item card in Shopping page shows module depending on whether item is being updated or not
	finishShopping: () => dispatch(finishShopping())
})

// connects Shopping component to global store, passing in necessary state and dispatch methods as props
export default connect(mapStateToProps, mapDispatchToProps)(Shopping);

