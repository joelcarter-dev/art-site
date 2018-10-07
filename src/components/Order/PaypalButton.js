import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-checkout'

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
      
    } = this.props
    
    //console.table(this.props.orderData)

    const payment = () => {
  
      return paypal.rest.payment.create(env, client, {
        transactions: [{
          amount: {
            total: total,
            currency: currency,
            // ??
            // details: {
            //   subtotal: '30.00',
            //   tax: '0.07',
            //   shipping: '0.03',
            //   handling_fee: '1.00',
            //   shipping_discount: '-1.00',
            //   insurance: '0.01'
            // }
          },
          // ??
          // description: 'The payment transaction description.',
          // custom: '90048630024435',
          // //invoice_number: '12345', Insert a unique invoice number
          // payment_options: {
          //   allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
          // },
          
          //??
          //soft_descriptor: 'ECHI5786786',
          item_list: {
            items: [
            //needs to come from orderData. Can do a one off for now but it needs to
            // support multable objects from cart items
              {
                name: orderData.name,
                description: orderData.about,
                quantity: '1',
                price: orderData.price,
                // tax: '0.01',
                // sku: '1',
                currency: currency
              },

            ],
            
            //data comes from order form
            
            // shipping_address: {
            //   recipient_name: 'Brian Robinson',
            //   line1: '4th Floor',
            //   line2: 'Unit #34',
            //   city: 'San Jose',
            //   country_code: 'US',
            //   postal_code: '95131',
            //   phone: '011862212345678',
            //   state: 'CA'
            // }
          }
        }],
        note_to_payer: 'Contact me for any questions on your order.'
      })
    }
    

    const onAuthorize = (data, actions) => {
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          }
          console.log(data)

          onSuccess(payment)
        })
    }

    if (typeof window !== 'undefined' && window ) {
      
      const PaypalButton = paypal.Button.driver('react', {React, ReactDOM})
    
      return (
        <div>
          {<PaypalButton
            env={env}
            client={client}
            commit={commit}
            payment={payment}
            onAuthorize={onAuthorize}
            onCancel={onCancel}
            onError={onError}
          />}
        </div>
      )   
    } else {
      return <div>Error loading paypal</div>  
    }
    
  }
}
export default PayPalCheckout

