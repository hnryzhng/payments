import React, { Component } from 'react'

import PropTypes from 'prop-types'

// import components
import Item from './Item.js'

class ItemsDisplay extends Component {

	state = {
		itemsPerRow: 3,
		itemsRowsList: [],
		currentRowIndex: 0
	}

	componentDidMount() {
		
		// console.log("items container component did mount");

		this.createItemsRows();

	}

	componentDidUpdate(prevProps, prevState) {
		
		if (prevProps.itemsList !== this.props.itemsList) {
			// console.log("items container component did update");
			// console.log("prev props items list:", prevProps.itemsList);
			// console.log("this props items list:", this.props.itemsList);
			this.createItemsRows();
		}
	}

	createItemsRows = () => {
		// generate array of rows containing appropriate num of item objects specified by itemsPerRow

		var oldItemsList = [ ...this.props.itemsList ];
		
		// create new items list based on whether an item has display set to true			
		var itemsList = oldItemsList.filter(item => item.display === true)

		// console.log("itemsDisplay itemsList:", itemsList);
		
		var itemsRowsList = [];
		var itemsPerRow = this.state.itemsPerRow;
		if (itemsList.length > 0) {
			for (var i=0; i<itemsList.length; i++) {
				if (i % itemsPerRow === 0) {
					// console.log("rowArray i:", i);
					var rowArray = [];
					var itemObj = itemsList[i];
					// console.log("itemObj:", itemObj);
					rowArray.push(itemObj);
					// console.log("rowArray:", rowArray);
					itemsRowsList.push(rowArray);
				} else {
					// console.log("rowArray i:", i);
					var lastRowArray = itemsRowsList.pop();
					// console.log("lastRowArray:", lastRowArray);
					var itemObj = itemsList[i];
					lastRowArray.push(itemObj);
					itemsRowsList.push(lastRowArray);
				}

			}

			// console.log("itemsRowsList:", itemsRowsList);
			this.setState({ itemsRowsList: itemsRowsList });

		}

	}

	render(){

		let itemsDisplay;
		var itemsRowsList = this.state.itemsRowsList;	// load list of row arrays containing item objects
		itemsDisplay = itemsRowsList.map((rowArray, i) => {
			// render each row
			return(
				
					<div className="row">
					
						{
							rowArray.map((itemObj, j) => {
								// render item given itemObj in rowArray

								return(<Item key={ itemObj.id } item={ itemObj } itemsPerRow={ this.state.itemsPerRow } { ...this.props } />)

							})
						}

					</div>
			)

		})

		return(

			<div className="items-display container-fluid">
				{ itemsDisplay }
			</div>

		)
	}
}

export default ItemsDisplay;