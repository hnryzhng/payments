import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import './Shopping.css'

// import components
import Checkout from './Checkout.js'
import ItemsDisplay from './ItemsDisplay.js'

class Shopping extends Component {
	// Allow submit only if shopping cart is not empty

	// Set state to finishedShopping so next component can be displayed

	// Display item card based on whether it's in shopping cart or not 
	// may not scale since could be computationally expensive client-side unless shoppingCart is an object/dict with item id as key

	// Actual price is calculated on backend to avoid front-end manipulation

	// TASK: alert or other animation showing item is successfully added to cart



	render(){

		// console.log("Shopping PROPS from ShoppingContainer:", this.props);
		
		if (this.props.finishedShopping) {
			return <Redirect to="/cart" />
		}

		return(
			
			<section id="shopping-section">

				<div className="container-fluid">
					

					<ItemsDisplay { ...this.props } />


				</div>

			</section>
		
		);
	}

}


// class ControlModule extends Component {
// 	// Returns quantity and button component based on whether item is in shopping cart	

// 	state = {
// 		updateQuantity: false
// 	}

// 	render() {

// 		var { shoppingCart, item } = this.props;

// 		let showComponent

// 		if ( item.updating === false ) {
// 			showComponent = <AddItemModule addCartItem={ this.props.addCartItem } updateItemDisplay={ this.props.updateItemDisplay } item={ item } />
// 		} else {
// 			showComponent = <UpdateItemModule { ...this.props } />
// 		}

// 		return(
// 			<div>

// 				{showComponent}

// 			</div>
// 		)
// 	}

// }

// class AddItemModule extends Component {

// 	state = {
// 		quantity: 0
// 	}

// 	handleDispatches = (item) => {
// 		this.props.addCartItem(item.id, item.name, item.price, this.state.quantity)
// 		this.props.updateItemDisplay(item.id, true)		
// 	}

// 	render(){
		
// 		const { item } = this.props;

// 		return(
// 			<div>
// 				<div className="item-select-quantity-container input-group mb-3 row d-flex">
// 					<label className="col-md align-self-end">How many?</label>
// 					<select className="custom-select col-md" onChange={ (event) => { this.setState({ quantity: event.target.value }) } }>
// 						<option value="0">0</option>
// 						<option value="1">1</option>
// 						<option value="2">2</option>
// 					</select>
// 				</div>

// 				<div>
// 					<button id="add-item-button" className="btn btn-lg btn-block btn-outline-info" onClick={ () => { this.handleDispatches(item) } }> ADD TO CART </button>
// 				</div>
// 			</div>
// 		)
// 	}
// }

// class UpdateItemModule extends Component {
// 	render() {

// 		var { item } = this.props;

// 		return(
// 			<div>

// 				<button id="update-quantity-button" className="btn btn-block btn-light" onClick={ ()=> { this.props.updateItemDisplay(item.id, false)} }>Update Quantity</button>			
// 				<button id="go-to-cart-button" className="btn btn-block btn-info" onClick={ ()=> { this.props.finishShopping() } } disabled={ this.props.shoppingCart.length === 0 }>View Shopping Cart</button>

// 			</div>
// 		)
// 	}
// }

Shopping.propTypes = {
	itemsList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.string,
			image_path: PropTypes.string,
			price: PropTypes.number.isRequired,
			quantity: PropTypes.number.isRequired
		})
	).isRequired,
	shoppingCart: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			quantity: PropTypes.number.isRequired
		})
	).isRequired,
	finishedShopping: PropTypes.bool.isRequired
}

export default Shopping;