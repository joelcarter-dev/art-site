import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import paypal from 'paypal-checkout'
import PaypalExpressBtn from 'react-paypal-express-checkout'

export class PayPalCheckout extends Component {
  render() {

    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
      
      orderData,
      formData,
      
    } = this.props
    
    delete formData.orderData
    
    //handle form not bing filled on paypal useage
    
    let items = []
    orderData.forEach( i => {
      items.push({
        name: `${i.frontmatter.title} to send to ${formData.name}`,
        description: `${orderData.original ? 'Original.' : 'Print.'} ${i.frontmatter.about}`,
        quantity: '1',
        price: i.frontmatter.price,
        currency: currency,
      })
    })
    console.log(orderData)
    
    if (typeof window !== 'undefined' && window ) {
      return (
        <PaypalExpressBtn 
          client={client} 
          currency={currency} 
          total={total} 
          onSuccess={onSuccess}
          onCancel={onCancel}
          onError={onError}
          shipping={1}
          
          style={{
            layout: 'vertical',  // horizontal | vertical
            size:   'responsive',    // medium | large | responsive
            shape:  'rect',      // pill | rect
            color:  'gold'       // gold | blue | silver | white | black
          }}
          
          items={items}
          
        />
        
      )
    }
  }
}
export default PayPalCheckout

