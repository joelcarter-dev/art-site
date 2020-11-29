import React, { Component } from 'react'
import S from './order.module.sass'

import PayPalCheckout from './PaypalButton.js'
import OrderForm from './OrderForm.js'
import Link from 'gatsby-link'


export class Overview extends Component {
  render() {
    return (
      <section id={S.Overview}>
        <h3>Overview</h3>
        <div className={S.amounts}>
          <span>Items: {this.props.itemInfo.length}</span>
          <span>Total: ${this.props.totalPrice} NZD</span>
        </div>
        
        <ul className={S.titemDetails}>
          {
            this.props.itemInfo.map(i => (
              <li key={i.frontmatter.title}>
                <span>{i.frontmatter.title}</span>
                <span>${i.frontmatter.price}</span>
              </li>
            ))
          }
        </ul>
        
        <div className={S.myInfo}>
          <Link to="/support-form" state={{ itemInfo: this.props.itemInfo}}>
            <button
              id={S.Button}
              style={{
                color: this.props.dark ? "#00030D" : "#F0E3DE",
                border: this.props.dark ? "1px solid #00030D" : "1px solid #F0E3DE",
              }}
            >
              Contact Support
            </button>
          </Link>
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
      return null
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
      //sandbox: 'AXKvD9ZhyEGv_CUtXqJef6uRPEC4Ms818BUoxVkkZG5284CBBahiFM2OzrCRwGnR8CFAUvfP9RZE31h_',
      production: 'AT2N80Uan4dARyrWcKyBvj44TNxp2mfrCRlAFPjvpA9-J6TMpMeOgPGK_fb0GkQa9jziuv8Y_uiVzKc3',
    }

    // const ENV = process.env.NODE_ENV === 'production'
    //   ? 'production'
    //   : 'sandbox'
    
    //will throw error as there is no sandbox key. But I don't want any orders right now
    const ENV = 'production'

    return (
      <section id={this.props.hidden ? S.OrderHidden : S.OrderDisplay}>
        <div className={S.orderHolder}>
          <div className={S.left}>
            <Overview totalPrice={totalPrice.reduce((a, b) => a + b, 0)} itemInfo={ this.props.orderData} />
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
                  total={totalPrice.reduce((a, b) => a + b, 0)}
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
