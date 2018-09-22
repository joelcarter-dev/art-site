import React, {Component} from 'react'
  

export class AddToCart extends Component {
  
  storeCartItem = () => {
    const cartData = this.props.itemData
    localStorage.removeItem('cartItems');
    localStorage.setItem('cartItems', JSON.stringify(cartData));
  }
  
  render() {
    return (
      <button id="AddToCart" className={this.props.className} onClick={this.storeCartItem}>
        Add To Cart
      </button>
    )
  }
}


export default AddToCart