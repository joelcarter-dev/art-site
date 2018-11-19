import React, { Component } from 'react'
import S from './order.module.sass'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class OrderForm extends Component {
  constructor(props) {
    super(props)
        
    this.state = {
      country: {
        lable: "New Zealand", 
        value: "NZ",
      },
      item_title: this.props.orderData[0].frontmatter.title,
      item_url: this.props.orderData[0].fields.slug,
      submitMsg: "Details will be used to ship the items to you.",
    }
    //this.setOrderDetails()
  }
  
  // setOrderDetails = () => {
  //   var mapped = this.props.orderData.map(i => ( {"title": i.frontmatter.title, "url": i.fields.slug} ))
  //   var details = Object.assign({}, ...mapped )
  //   console.log(details )
  //   return details

  // }
  
  // setOrderDetails = () => {
  //   this.props.orderData.map(i => { this.setState({"title": i.frontmatter.title, "url": i.fields.slug}) })
  //   console.log(this.state)
  // }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  //should display some feedback to the user on sbmit and make sure all feileds are vallidated

  handleSubmit = (e) => {
    this.props.sendData(this.state)

    e.preventDefault();
    const form = e.target;
        
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => this.setState({submitMsg: "Thank you! Your items are on there way, I hope you enjoy."}))
      .catch(error => this.setState({submitMsg: `Something went wrong: ${error}`}));

  }
  
  onSelectCountry = (country) => {
    this.setState({country: country})
  }
    
  render() {
    return (
      <section id={S.OrderForm}>
      
        <form id="orderForm" name="orderForm" method="post" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
          <input type="hidden" name="bot-field" value="contact" />
 
          <input name="title" type="hidden" value={this.state.item_title} />
          <input name="url" type="hidden" value={this.state.item_url} />

          <p>Order Form</p>
        
            <input placeholder="Your name" type="text" tabIndex="1" value={this.state.name ? this.state.name : ""} onChange={this.handleChange} name="name" required autoFocus />

            <input placeholder="Your Email Address" type="email" tabIndex="2" value={this.state.email ? this.state.email : ""} onChange={this.handleChange} name="email" required /> 
            
            <input placeholder="PH xxxx-xxx-xxxx" type="tel" value={this.state.ph ? this.state.ph : ""} onChange={this.handleChange} name="ph" tabIndex="3"/>
            
            <hr/>
            
            <input placeholder="Address" type="adress-line-one" tabIndex="4" value={this.state.address_line_one ? this.state.address_line_one : ""} onChange={this.handleChange} name="address_line_one" required /> 
            
            <input placeholder="Address Line Two" type="adress-line-two" tabIndex="5" value={this.state.address_line_two ? this.state.address_line_two : ""} onChange={this.handleChange} name="address_line_two" /> 
            
             <Select
              options={countryList().getData()}
              value={this.state.country.lable}
              name={this.state.country.lable}
              onChange={this.onSelectCountry}
              placeholder="Search Country"
              className={S.dropdown}
            />
          
            <input placeholder="City" type="city" value={this.state.city ? this.state.city : ""} tabIndex="6"  onChange={this.handleChange} name="city" required /> 
            
            <input placeholder="State/Province/Region" type="state_region" tabIndex="7" value={this.state.state_region ? this.state.state_region : ""} onChange={this.handleChange} name="state_region" /> 

            <input placeholder="ZIP / Postal Code" type="text" pattern="[0-9]{5}" tabIndex="8" value={this.state.zip ? this.state.zip : ""} onChange={this.handleChange} name="zip" required/>
         
            <button type="submit" id={S.submit} >Submit</button>
       
            <p>{this.state.submitMsg}</p>
        </form>
      </section>
    )
  }
}
