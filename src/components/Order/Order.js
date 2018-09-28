import React, { Component } from 'react'
import Img from 'gatsby-image'
import S from './order.module.sass'

import PayPalCheckout from './PaypalButton.js'

//will need a list of items and their price, total price with mobile support
//form for shipping details with validation
  // list of details
  //  - name email contry address zip code 
  
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
      ph: '',
      orderData: this.props.orderData,
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }


  //should display some feedback to the user on sbmit and make sure all feileds are vallidated
  handleSubmit = (event) => {
    event.preventDefault()
  }
  
  render() {
    return (
      <section id={S.OrderForm}>
      
        <form id="orderForm" action="" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
          <input type="hidden" name="bot-field" value="contact" /> 
          
          <textarea  type="hidden" name="order data" form="orderForm" value={this.state.orderData} id={S.orderData}></textarea>
          <p>Order Form</p>
        
            <input placeholder="Your name" type="text" tabIndex="1" value={this.state.name} onChange={this.handleChange} name="name" required autoFocus />

            <input placeholder="Your Email Address" type="email" tabIndex="2" value={this.state.email} onChange={this.handleChange} name="email" required /> 
          
            <input placeholder="Your Phone Number" type="tel" tabIndex="3" value={this.state.ph}   onChange={this.handleChange} name="ph" required /> 
          
            <div data-netlify-recaptcha></div>
         
            <button name="submit" type="submit" id={S.submit} data-submit="...Sending">Submit</button>
       
            <p>Details will be used to ship the items to you.</p>
        </form>
      </section>
    )
  }
}

const ImageList = (props) => (
  
  // if(Array.isArray(props.imageData)) {
  //   return <Img fluid={props.imageData.childImageSharp.fluid} />
  // } else {    
  //     //image list display
  // }
  <Img fluid={props.imageData.fluid} />
)

export class Overview extends Component {
  render() {
   // console.table(this.props.data.image)
    
    
    //here I need to account for multable art items from the cart.
    //though used for just one art item this does not matter
    // let itemPrices = []
    // this.props.data.map( (item) => {
    //   itemPrices.push({
    //     price: item.price
    //   })
    // })
    // itemPrices.reduce((a, b) => a + b, 0)

    return (
      <section id={S.Overview}>
        <h3>Overview</h3>
        <div className={S.amounts}>
          <span>Items: {this.props.data.length} 1</span>
          <span>Total: ${this.props.data.price}</span>
        </div>
        
        <div className={S.itemImages}>
          {/*<Img fluid={this.props.data.image.fluid} />*/}
        </div>
        
        <div className={S.myInfo}>
          <p>General Support</p>
          <span>jcicode@gmail.com</span>
        </div>
        
      </section>
    )
  }
}

const CLIENT = {
  sandbox: 'xxxXXX',
  production: 'xxxXXX',
}

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox'
  
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      msg: ""
    }
  }
  
  render() {
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
    return (
      <section id={this.props.hidden ? S.OrderHidden : S.OrderDisplay}>
        <div className={S.orderHolder}>
          <div className={S.left}>
            <Overview data={this.props.orderData} />
          </div>
          <div className={S.right}>
            <button onClick={this.props.toggleForm} id={S.close}>Close</button>
            
            <OrderForm orderData={this.props.orderData}/>
            
            <div id={S.paypalHolder}>
              <PayPalCheckout 
                client={CLIENT}
                env={ENV}
                commit={true}
                currency={'NZD'}
                total={100}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
                orderData={this.props.orderData}
              />
            </div>
            
          </div>
        </div>
        <div className={S.overlay}></div>
      </section>
    )
  }
}