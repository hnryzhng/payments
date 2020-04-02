// reducers

// import constants from actions file
import {
	SET_APP_MODE,
	ADD_CART_ITEM,
	DEL_CART_ITEM,
	UPDATE_CART_ITEM,
	CLEAR_CART,
	UPDATE_ITEM_DISPLAY,
	ADD_CUSTOMER_INFO,
	ADD_PAYMENT_TOKENS,
	CONTINUE_SHOPPING,
	FINISH_SHOPPING,
	FINISH_CART,
	FINISH_CHECKOUT
} from '../actions/index.js'

/*
state tree:

{
	appMode: mode,	// determines which mode to start app in (modes: 'FULL', 'CHECKOUT')
	itemsList: [{
		id,
		name,
		description,
		image_path,
		price,
		quantity,
		updating 
	}]
	shoppingCart: [{
		id, 
		name,
		price,
		image_path
		quantity
	}],

	customerInfo: {
		name,
		email,
		shipping: {
			address, 
			state,
			zip,
			country
		}
	},
	paymentTokens: {
		clientSecret,
		publishableKey
	},
	
	finishedShopping: false,
	finishedCart: false,
	finishedCheckout: false,
	(currentPage: '',	// 'Shopping', 'Checkout', 'Completed')
	userData: {
		// state data from CheckoutForm 
	}
}
*/

function rootReducer(state={}, action) {
	switch (action.type) {
		case SET_APP_MODE:
			return Object.assign({}, state, {
				appMode: action.mode
			})
		case ADD_CART_ITEM:

			// add item to shopping cart if quantity selected is gt 0, else return shopping cart in same state
			if (action.obj.quantity > 0) {

				// update existing cart item: if payload item is already in cart, then update quantity, else add item to end of shopping cart list
				if (state.shoppingCart.length > 0) {
					// console.log("shopping cart line 70:", state.shoppingCart);

					var newShoppingCart = [ ...state.shoppingCart];
					var hasExistingItem = false;

					// go through shopping cart to update quantity if it exists
					for (var i=0; i<state.shoppingCart.length; i++) {
						var item = state.shoppingCart[i];
						if (action.obj.id === item.id) {
							hasExistingItem = true;
							const updatedItem = item;
							updatedItem.quantity = action.obj.quantity;	// change quantity of cart item to the newly selected quantity from action payload obj
							newShoppingCart.splice(i, 1, updatedItem)	// splice 1 item from shopping cart at the index, change quantity, then re-insert it at same index
						}
					}

					// add item if not already in shopping cart
					if (!hasExistingItem) {
						newShoppingCart.push(action.obj);
					}

					// assign items in new cart to state
					return Object.assign({}, state, {
						shoppingCart: [ ...newShoppingCart ]
					})

				}

				// return shopping cart with item added if cart was empty
				return Object.assign({}, state, {
					shoppingCart: [ ...state.shoppingCart, action.obj ]
				})

			}

			// return unchanged shopping cart if no quantity was selected in action obj
			return Object.assign({}, state, {
				shoppingCart: [ ...state.shoppingCart ]
			})
		case DEL_CART_ITEM:
			// delete item in shopping cart given id
			var newShoppingCart = [ ...state.shoppingCart];
			for (var i=0; i<newShoppingCart.length; i++) {
				var item = newShoppingCart[i];
				console.log("ACTION ID:", action.id)
				console.log("ITEM ID:", item.id)
				if (action.id === item.id) {
					console.log("del cart item INDEX:", i)
					console.log("ACTION ID:", action.id)
					console.log("ITEM ID:", item.id)
					newShoppingCart.splice(i, 1)
				}
			}
			console.log("shopping cart with item deleted:", newShoppingCart)
			// assign items in new cart to state
			return Object.assign({}, state, {
				shoppingCart: [ ...newShoppingCart ]
			})
		case UPDATE_CART_ITEM:
			// go through shopping cart to update quantity if it exists
			var newShoppingCart = [ ...state.shoppingCart];
			for (var i=0; i<state.shoppingCart.length; i++) {
				var item = state.shoppingCart[i];
				if (action.obj.id === item.id) {
					hasExistingItem = true;
					const updatedItem = item;
					updatedItem.quantity = action.obj.quantity;	// change quantity of cart item to the newly selected quantity from action payload obj
					newShoppingCart.splice(i, 1, updatedItem)	// splice 1 item from shopping cart at the index, change quantity, then re-insert it at same index
				}
			}
			// assign items in new cart to state
			return Object.assign({}, state, {
				shoppingCart: [ ...newShoppingCart ]
			})

		case UPDATE_ITEM_DISPLAY:
			// change status of item in itemsList so that item card in Shopping page shows module depending on whether item is being updated or not
			return Object.assign({}, state, {
				itemsList: state.itemsList.map((item, index) => {
					if (action.obj.id === item.id) {
						return Object.assign({}, item, {
							updating: action.obj.bool	// !item.updating
						})
					}

					return item;

				})
			})
		case CLEAR_CART:
			return Object.assign({}, state, {
				shoppingCart: []
			})
		case CONTINUE_SHOPPING:
			return Object.assign({}, state, {
				finishedShopping: false
			})
		case FINISH_SHOPPING:
			return Object.assign({}, state, {
				finishedShopping: true
			})
		case FINISH_CART:
			return Object.assign({}, state, {
				finishedCart: true
			})
		case FINISH_CHECKOUT:
			return Object.assign({}, state, {
				finishedCheckout: true
			})
		case ADD_CUSTOMER_INFO:
			return Object.assign({}, state, {
				customerInfo: action.obj
			})
		case ADD_PAYMENT_TOKENS:
			return Object.assign({}, state, {
				paymentTokens: action.obj
			})
		default:
			return state
	}

}

export default rootReducer;