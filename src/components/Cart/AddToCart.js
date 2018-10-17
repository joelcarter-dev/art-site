import React, {Component} from 'react'

export class AddToCart extends Component {
  
  storeCartItem = () => {
    if (localStorage.getItem('cartItems') === null) {
      let cartData = [this.props.itemData]
    
      localStorage.setItem('cartItems', JSON.stringify(cartData));
      console.log("added to cart ", cartData)
    } else {
      let oldCart = JSON.parse(localStorage.getItem('cartItems'))
      //console.log("old cart " + oldCart)

      let newCart = oldCart
      
      if(oldCart.indexOf(this.props.itemData) === -1 )
          newCart.push(this.props.itemData) 
        else
          //console.log("alreay exists");
          return
  
      localStorage.removeItem('cartItems')
      localStorage.setItem('cartItems', JSON.stringify(newCart))
    }
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