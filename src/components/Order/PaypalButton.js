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
        name: i.frontmatter.title,
        description: i.frontmatter.about,
        quantity: '1',
        price: i.frontmatter.price,
        currency: currency,
      })
    })
    console.log("order Items ", items)
    
   
   // let shipping_address = {
   //    recipient_name: 'test',
   //    line1: 'test',
   //    line2: 'test',
   //    city: 'test',
   //    country_code: 'NZ',
   //    postal_code: '1234',
   //    phone: `+64 089 7778`,
   //    state: `test`,
   //  }
    
   //  const payment = () => {
   //    paypal.rest.payment.create(env, client, {
   //      transactions: [
   //        {
   //          amount: {
   //            total,
   //            currency,
   //          }
   //        },
   //      ],
   //    })
   //  }
   //  //console.log("payment data ", payment)
   //  console.log(paypal)
    

   //  const onAuthorize = (data, actions) => {
   //    actions.payment.execute()
   //      .then(() => {
   //        const payment = {
   //          paid: true,
   //          cancelled: false,
   //          payerID: data.payerID,
   //          paymentID: data.paymentID,
   //          paymentToken: data.paymentToken,
   //          returnUrl: data.returnUrl,
   //        }
   //        console.log(data)

   //        onSuccess(payment)
   //      })
   //  }

    if (typeof window !== 'undefined' && window ) {
      return (
        <PaypalExpressBtn 
          client={client} 
          currency={currency} 
          total={total} 
          onSuccess={onSuccess}
          onCancel={onCancel}
          onError={onError}
          shipping={0}
          
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

