import React from 'react';

export default const AddToCart = (props) => {
  
  StoreCartItem() {
    const cartData = props.data
    localStorage.removeItem('todoData');
    localStorage.setItem('todoData', JSON.stringify(todoData));
  }
  return (
    
  );
}