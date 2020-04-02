// actions


// ACTION TYPES
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const DEL_CART_ITEM = 'DEL_CART_ITEM';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const UPDATE_ITEM_DISPLAY = 'UPDATE_ITEM_DISPLAY';
export const CLEAR_CART = 'CLEAR_CART';
export const ADD_CUSTOMER_INFO = 'ADD_CUSTOMER_INFO';
export const ADD_PAYMENT_TOKENS = 'ADD_PAYMENT_TOKENS';
export const CONTINUE_SHOPPING = 'CONTINUE_SHOPPING';
export const FINISH_SHOPPING = 'FINISH_SHOPPING';
export const FINISH_CART = 'FINISH_CART';
export const FINISH_CHECKOUT = 'FINISH_CHECKOUT';

export const SET_APP_MODE = 'SET_APP_MODE';

// ACTION CREATORS

export function setAppMode(mode) {
	// determines which mode to start app in (modes: 'FULL', 'CHECKOUT')
	return {
		type: 'SET_APP_MODE',
		mode
	}
}

// add item to shopping cart
export function addCartItem(id, name, price, image_path, quantity) {
	const quantityInt = parseInt(quantity);
	const obj = {
		id: id,
		name: name,
		price: price,
		image_path: image_path,
		quantity: quantityInt	// convert string quantity to integer
	}

	return {
		type: 'ADD_CART_ITEM',
		obj
	}
}


// delete item from shopping cart
export function delCartItem(id) {
	return {
		type: 'DEL_CART_ITEM',
		id
	}
}

// update quantity of item in cart
export function updateCartItem(id, quantity) {
	const quantityInt = parseInt(quantity)
	const obj = {
		id: id,
		quantity: quantity
	}

	return {
		type: 'UPDATE_CART_ITEM',
		obj
	}
}

export function updateItemDisplay(id, bool) {
	const obj = {
		id: id,
		bool: bool
	}
	return {
		type: 'UPDATE_ITEM_DISPLAY',
		obj
	}
}

export function clearCart() {
	return {
		type: 'CLEAR_CART'
	}
}

// Cart page return to Shopping
export function continueShopping() {
	return {
		type: 'CONTINUE_SHOPPING'
	}
}

// Shopping page status
export function finishShopping() {
	return {
		type: 'FINISH_SHOPPING'
	}
}

// Cart page status
export function finishCart() {
	return {
		type: 'FINISH_CART'
	}
}


// Checkout page status
export function finishCheckout() {
	return {
		type: 'FINISH_CHECKOUT'
	}
}

// Customer info
export function addCustomerInfo(obj) {
	return {
		type: 'ADD_CUSTOMER_INFO',
		obj
	}
}

export function addPaymentTokens(obj) {
	return {
		type: 'ADD_PAYMENT_TOKENS',
		obj
	}
}
