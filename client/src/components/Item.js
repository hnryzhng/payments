import React, { Component } from 'react'

import itemImage from "./static/dress-woman-in-white-short-sleeved-dress-holding-brown-leather.jpg"

import PropTypes from 'prop-types'


class Item extends Component {
	render(){
		var { item, itemsPerRow } = this.props;
		// console.log("item:", item)

		let fullImagePath;
		fullImagePath = "./static/" + item.image_path;
		// console.log("fullImagePath:", fullImagePath);

		return(
			<div className="item-card col-md card">

				<div className="card-img-container">
					<img className="card-img-top" src={ require(`${ fullImagePath }`) } alt="..." /> 
				</div>

				<div className="card-body">
					<h5 className="item-name card-title">{ item.name }</h5>

					<div className="item-description card-text">{ item.description }</div>

					<div>From <p className="item-price">${ item.price }</p></div>

					
					<ControlModule { ...this.props } />
					

				</div>
			</div>
		)
	}
}


class ControlModule extends Component {
	// Returns quantity and button component based on whether item is in shopping cart	

	state = {
		updateQuantity: false
	}

	render() {

		let showComponent

		if ( this.props.item.updating === false ) {
			showComponent = <AddItemModule { ...this.props } />
		} else {
			showComponent = <UpdateItemModule { ...this.props } />
		}

		return(
			<div>

				{showComponent}

			</div>
		)
	}

}

class AddItemModule extends Component {

	state = {
		quantity: 0
	}

	componentWillMount() {
		// set component state of item in itemsList to quantity of item in cart
		const sCart = [...this.props.shoppingCart]
		for (var i=0; i<sCart.length; i++) {
			const cartItem = sCart[i];
			if (this.props.item.id === cartItem.id) {
				this.setState({ quantity: cartItem.quantity });
			}
		}
	}

	handleDispatches = (item) => {
		this.props.addCartItem(item.id, item.name, item.price, item.image_path, this.state.quantity)
		this.props.updateItemDisplay(item.id, true)		
	}

	render(){
		
		var { item } = this.props;

		return(
			<div>
				<div className="item-select-quantity-container input-group mb-3 row d-flex">
					<label className="col-md align-self-end">How many?</label>
					<select className="custom-select col-md" value={ this.state.quantity } onChange={ (event) => { this.setState({ quantity: event.target.value }) } }>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
					</select>
				</div>

				<div>
					<button id="add-item-button" className="btn btn-lg btn-block btn-outline-info" onClick={ () => { this.handleDispatches(item) } }> ADD TO CART </button>
				</div>
			</div>
		)
	}
}

class UpdateItemModule extends Component {
	render() {

		var { item } = this.props;

		return(
			<div>

				<button id="update-quantity-button" className="btn btn-block btn-light" onClick={ ()=> { this.props.updateItemDisplay(item.id, false)} }>Update Quantity</button>			
				<button id="go-to-cart-button" className="btn btn-block btn-info" onClick={ ()=> { this.props.finishShopping() } } disabled={ this.props.shoppingCart.length === 0 }>View Shopping Cart</button>

			</div>
		)
	}
}

export default Item;