import { connect } from 'react-redux'

import { addCustomerInfo, addPaymentTokens, finishCheckout, addCartItem, clearCart } from '../actions/index.js'

import Checkout from '../components/Checkout.js'


const mapStateToProps = state => ({
	appMode: state.appMode,
	itemsList: state.itemsList,
	shoppingCart: state.shoppingCart,
	customerInfo: state.customerInfo,
	paymentTokens: state.paymentTokens,
	finishedCheckout: state.finishedCheckout	// boolean to indicate completion of Checkout page in payment flow
})

const mapDispatchToProps = dispatch => ({
	addCustomerInfo: (obj) => dispatch(addCustomerInfo(obj)),
	addPaymentTokens: (obj) => dispatch(addPaymentTokens(obj)),
	finishCheckout: () => dispatch(finishCheckout()),
	addCartItem: (id, name, price, image_path, quantity) => dispatch(addCartItem(id, name, price, image_path, quantity)),
	clearCart: () => dispatch(clearCart())
})

// connects Checkout component to global store, passing in necessary state and dispatch methods as props
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

