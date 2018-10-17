import React, { Component } from 'react'
import Img from 'gatsby-image'
import S from './order.module.sass'

//import { Form } from 'react-validify'

import PayPalCheckout from './PaypalButton.js'

//will need a list of items and their price, total price with mobile support
//form for shipping details with validation

// email should go to mail chimp for
  // conferm order
  // -- option asking to store email for these things? --
  // conferm shipment (automated??)
  // emails on new art (blog?)
  
//payment gateway??
//paypal intergration

//somehow make the emails display nice on netlify

//order data like item number / name will be place in a hidden form input programaticly and sent to netlify 


class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      //ADD TO FORM
      ph: '',
      address_line_one: '',
      address_line_two: '',
      city: '',
      state_region: '',
      zip: '',
      //ADD TO FORM
      country: 'NZ',
      orderData: this.props.orderData,
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }


  //should display some feedback to the user on sbmit and make sure all feileds are vallidated
  handleSubmit = (event) => {
    this.props.sendData(this.state)

    event.preventDefault()
  }
  
  render() {
    //console.log("forms order data", this.state.orderData)
    return (
      <section id={S.OrderForm}>
      
        <form id="orderForm" action="" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
          <input type="hidden" name="bot-field" value="contact" /> 
          
          {/*
          <textarea  type="hidden" name="order data" form="orderForm" value={this.state.orderData.frontmatter.title} id={S.orderData}></textarea>
          <textarea  type="hidden" name="order data" form="orderForm" value={this.state.orderData.frontmatter.price} id={S.orderData}></textarea>
          <p>Order Form</p>*/}
        
            <input placeholder="Your name" type="text" tabIndex="1" value={this.state.name} onChange={this.handleChange} name="name" required autoFocus />

            <input placeholder="Your Email Address" type="email" tabIndex="2" value={this.state.email} onChange={this.handleChange} name="email" required /> 
            
            <hr/>
            
            <input placeholder="Address" type="adress-line-one" tabIndex="3" value={this.state.address_line_one}   onChange={this.handleChange} name="address_line_one" required /> 
            
            <input placeholder="Address Line Two" type="adress-line-two" tabIndex="4" value={this.state.address_line_two}   onChange={this.handleChange} name="address_line_two" /> 
          
            <input placeholder="City" type="city" value={this.state.city} tabIndex="5"  onChange={this.handleChange} name="city" required /> 
            
            <input placeholder="State/Province/Region" type="state_region" tabIndex="6" value={this.state.state_region}   onChange={this.handleChange} name="state_region" /> 

            <input placeholder="ZIP / Postal Code" type="text" pattern="[0-9]{5}" tabIndex="7" value={this.state.zip}   onChange={this.handleChange} name="zip" required/>
            
            <div data-netlify-recaptcha></div>
         
            <button name="submit" type="submit" id={S.submit} data-submit="...Sending">Submit</button>
       
            <p>Details will be used to ship the items to you.</p>
        </form>
      </section>
    )
  }
}

export class Overview extends Component {
  render() {
  
    return (
      <section id={S.Overview}>
        <h3>Overview</h3>
        <div className={S.amounts}>
          <span>Items: {this.props.itemInfo.length}</span>
          <span>Total: ${this.props.totalPrice} NZD</span>
        </div>
        
        <ul>
          {
            this.props.itemInfo.map(i => (
              <li key={i.title}>
                <span>{i.title}</span>
                <span>{i.price}</span>
              </li>
            ))
          }
        </ul>
        
        <div className={S.myInfo}>
          <p>General Support</p>
          <span>jcicode@gmail.com</span>
        </div>
        
      </section>
    )
  }
}
  
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      msg: "",
      formData: null,
    }
  }
  
  sendData = (data) => {
    this.setState({formData: data })
  }
  
  
  render() {
    
    let totalPrice = [] 
    let itemInfo = []
    
    this.props.orderData.map((i) => {
      totalPrice.push(Number(i.frontmatter.price.replace(/[^0-9.-]+/g,"")))
      itemInfo.push({title: i.frontmatter.title, price: i.frontmatter.price})
    })

    const onSuccess = (payment) => {
      console.log('Successful payment', payment)
      this.setState({msg: "Payment Successful. Your item(s) are on there way"})
    }
    const onError = (error) => {
      this.setState({msg: "Payment Error. Please try again or contact for support."})
      console.log('Erroneous payment OR failed to load script', error)
    }
    const onCancel = (data) => {
      this.setState({msg: "Payment Cancelled"})
      console.log('Cancelled payment', data)
    }
    
    const CLIENT = {
      sandbox: 'AdT7SLnpufa9JppQdvYODfb1nMnbd4Ya7QLaZutZagWoeTMBpePsOCkehP8GHH6uU3N5m9kaT6iH2kyI',
      production: '',
    }

    // const ENV = process.env.NODE_ENV === 'production'
    //   ? 'production'
    //   : 'sandbox'
    
    const ENV = 'sandbox'

            
    return (
      <section id={this.props.hidden ? S.OrderHidden : S.OrderDisplay}>
        <div className={S.orderHolder}>
          <div className={S.left}>
            <Overview totalPrice={totalPrice} itemInfo={itemInfo} />
          </div>
          <div className={S.right}>
            <button onClick={this.props.toggleForm} id={S.close}>Close</button>
            
            <OrderForm orderData={this.props.orderData} sendData={this.sendData}/>
            
            <div id={S.paypalHolder}>
              {this.state.formData != null &&
                <PayPalCheckout 
                  client={CLIENT}
                  env={ENV}
                  commit={true}
                  currency={'NZD'}
                  total={totalPrice[0]}
                  onSuccess={onSuccess}
                  onError={onError}
                  onCancel={onCancel}
                  //order data comes from the form object to get all data at once
                  orderData={this.props.orderData}
                  formData={this.state.formData}
              />}
            </div>
            
          </div>
        </div>
        <div className={S.overlay}></div>
      </section>
    )
  }
}

    // let shipping_address = {
    //   recipient_name: formData.name,
    //   line1: formData.address_line_one,
    //   line2: formData.address_line_two,
    //   city: formData.city,
    //   country_code: formData.country,
    //   postal_code: formData.zip,
    //   phone: formData.ph,
    //   state: formData.state_region,
    // }
   
       // payment = (data, actions) => {
    //   return actions.payment.create({
    //       transactions: [
    //         {
    //           amount: { 
    //             total: total, 
    //             currency: currency, 
    //           }
    //         }
    //       ]
    //   });
    // }
    
    //console.table(this.props.orderData)
    // const payment = () => {
      
    //   return paypal.rest.payment.create(env, client, {
    //     transactions: [{
    //       amount: {
    //         total: total,
    //         currency: currency,

    //       },

    //       item_list: {
    //         items: [
    //         //needs to come from orderData. Can do a one off for now but it needs to
    //         // support multable objects from cart items
    //           item,

    //         ],
            
    //         //data comes from order form
    //         shipping_address,
    //       }
    //     }],
    //     note_to_payer: 'Contact me for any questions on your order.'
    //   })
    // }
        
        
        
         // transactions: [{
 //          amount: {
 //            total: total,
 //            currency: currency,
 //            // ??
 //            // details: {
 //            //   subtotal: '30.00',
 //            //   tax: '0.07',
 //            //   shipping: '0.03',
 //            //   handling_fee: '1.00',
 //            //   shipping_discount: '-1.00',
 //            //   insurance: '0.01'
 //            // }
 //          },
 //          // ??
 //          // description: 'The payment transaction description.',
 //          // custom: '90048630024435',
 //          // //invoice_number: '12345', Insert a unique invoice number
 //          // payment_options: {
 //          //   allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
 //          // },
          
 //          //??
          //soft_descriptor: 'ECHI5786786',
        //   item_list: {
        //     items: [
        //     //needs to come from orderData. Can do a one off for now but it needs to
        //     // support multable objects from cart items
        //       {
        //         name: orderData.name,
        //         description: orderData.about,
        //         quantity: '1',
        //         price: orderData.price,
        //         // tax: '0.01',
        //         // sku: '1',
        //         currency: currency
        //       },

        //     ],
            
        //     //data comes from order form
            
        //     // shipping_address: {
        //       recipient_name: 'Brian Robinson',
        //       line1: '4th Floor',
        //       line2: 'Unit #34',
        //       city: 'San Jose',
        //       country_code: 'US',
        //       postal_code: '95131',
        //       phone: '011862212345678',
        //       state: 'CA'
        //     // }
        //   }
        // }],
        
//         import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// //import paypal from 'paypal-checkout'

// export class PayPalCheckout extends Component {
//   render() {

//     const {
//       total,
//       currency,
//       env,
//       commit,
//       client,
//       onSuccess,
//       onError,
//       onCancel,
      
//       orderData,
//       formData,
      
//     } = this.props
    
//     delete formData.orderData
    
//     //handle form not bing filled on paypal useage
    
//     let item = {}
//     console.log(formData, orderData)
//     if (orderData.length === 1) {
//       item = {
//         name: orderData[0].frontmatter.title,
//         description: orderData[0].frontmatter.about,
//         quantity: '1',
//         price: orderData[0].frontmatter.price,
//         // tax: '0.01',
//         // sku: '1',
//         currency: currency
//       }
     
//       //console.log(item, orderData[0])
//     }
    
   
//    let shipping_address = {
//       recipient_name: 'test',
//       line1: 'test',
//       line2: 'test',
//       city: 'test',
//       country_code: 'NZ',
//       postal_code: '1234',
//       phone: `+64 089 7778`,
//       state: `test`,
//     }
    
//     const payment = () => {
//       paypal.rest.payment.create(env, client, {
//         transactions: [
//           {
//             amount: {
//               total,
//               currency,
//             }
//           },
//         ],
//       })
//     }
//     //console.log("payment data ", payment)
//     console.log(paypal)
    

//     const onAuthorize = (data, actions) => {
//       actions.payment.execute()
//         .then(() => {
//           const payment = {
//             paid: true,
//             cancelled: false,
//             payerID: data.payerID,
//             paymentID: data.paymentID,
//             paymentToken: data.paymentToken,
//             returnUrl: data.returnUrl,
//           }
//           console.log(data)

//           onSuccess(payment)
//         })
//     }

//     if (typeof window !== 'undefined' && window ) {
      
//       const PaypalButton = paypal.Button.driver('react', {React, ReactDOM})
    
//       return (
//         <div>
//           {<PaypalButton
//             env={env}
//             client={client}
//             commit={commit}
//             // payment={payment}
//             payment={(data, actions) => this.payment(data, actions)}
//             onAuthorize={onAuthorize}
//             onCancel={onCancel}
//             onError={onError}
//             funding={{
//               allowed: [
//                 paypal.FUNDING.CARD,
//                 paypal.FUNDING.CREDIT,
//               ],
//               disallowed: []
//             }}
//             style={{
//               layout: 'vertical',  // horizontal | vertical
//               size:   'responsive',    // medium | large | responsive
//               shape:  'rect',      // pill | rect
//               color:  'gold'       // gold | blue | silver | white | black
//             }}
//           />}
//         </div>
//       )   
//     } else {
//       return <div>Error loading paypal</div>  
//     }
    
//   }
// }
// export default PayPalCheckout

