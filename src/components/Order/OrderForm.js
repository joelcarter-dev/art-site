import React, { Component } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import S from './order.module.sass'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class OrderForm extends Component {
  constructor(props) {
    super(props)
        
    this.state = {
      country: null,
      zone: null,
      zonePostingCost: null,
      submitMsg: "Details will be used to ship the items to you.",
    }
  }

  componentDidMount() {
    this.setState({
      title: this.props.orderData[0].frontmatter.title,
      url: this.props.orderData[0].fields.slug
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleDiscountChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
    //this.props.sendDiscountCode(event.target.value)
  }

  onSelectCountry = (country) => {
    this.setState({country: country.label})
    // this.props.sendCountry(country)
  }

  onSelectZone = (zone) => {
    this.setState({zone: zone.name, zonePostingCost: zone.postingCost})
    //this.setState({postingCost: zone.postingCost})
    this.props.sendPostZone(zone)
  }

  //should display some feedback to the user on sbmit and make sure all feileds are vallidated

  handleSubmit = (e) => {

    this.props.sendData(this.state)

    e.preventDefault();

    if (this.state.country === null || this.state.zone === null || this.state.zonePostingCost === null) {
      this.setState({submitMsg: "Please select your posting zone and country."})
      return
    }

    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
        
      })
    })
      .then(() => this.setState({submitMsg: "Thank you for your shipping details. Please compleat payment below (PayPal account not required)"}))
      .catch(error => this.setState({submitMsg: `Something went wrong: ${error}`}));

  }
    
  render() {
    return (
      <section id={S.OrderForm}>
      
        <form id="orderForm" name="orderForm" method="post" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
          <input type="hidden" name="bot-field" value="orderForm" />
 
          <input className={S.hiddenInput} onChange={this.handleChange} name="title" value={this.state.title || ""}/>
          <input className={S.hiddenInput} onChange={this.handleChange} name="url" value={this.state.url || ""} />

          <input className={S.hiddenInput} onChange={this.handleChange} name="country" value={this.state.country || ""} />
          <input type="hidden" onChange={this.handleChange} name="postingZone" value={this.state.zone ? this.state.zone : "null"} />
          <input type="hidden" onChange={this.handleChange} name="postingZoneCost" value={this.state.zonePostingCost ? this.state.zonePostingCost : "null"} />
          <input type="hidden" name="total price" value={this.props.totalPrice || ""} />

          <p>Order Form</p>
        
            <input placeholder="Your name" type="text" tabIndex="0" value={this.state.name ? this.state.name : ""} onChange={this.handleChange} name="name" required />

            <input placeholder="Your Email Address" type="email" tabIndex="-1" value={this.state.email ? this.state.email : ""} onChange={this.handleChange} name="email" required /> 
            
            <input placeholder="PH xxxx-xxx-xxxx" type="tel" value={this.state.ph ? this.state.ph : ""} onChange={this.handleChange} name="ph" tabIndex="-2"/>
            
            <hr/>
            
            <input placeholder="Address" type="adress-line-one" tabIndex="-3" value={this.state.address_line_one ? this.state.address_line_one : ""} onChange={this.handleChange} name="address_line_one" required /> 
            
            <input placeholder="Address Line Two" type="adress-line-two" tabIndex="-4" value={this.state.address_line_two ? this.state.address_line_two : ""} onChange={this.handleChange} name="address_line_two" /> 

            <p>Are you in:</p>

            <Select
              options={this.props.postingZones}
              getOptionLabel={option =>`${option.name}`}
              //value={this.state.selectedZone}
              //name={this.state.selectedZone}
              onChange={this.onSelectZone}
              placeholder="Select Posting Zone"
              className={S.dropdown}
            />

            <p>Please make sure the above is Correct</p>
            
             <Select
              options={countryList().getData()}
              //value={this.state.country.lable}
              //name={this.state.country.lable}
              onChange={this.onSelectCountry}
              placeholder="Search Country"
              className={S.dropdown}
            />
          
            <input placeholder="City" type="city" value={this.state.city ? this.state.city : ""} tabIndex="-5"  onChange={this.handleChange} name="city" required /> 
            
            <input placeholder="State/Province/Region" type="state_region" tabIndex="-6" value={this.state.state_region ? this.state.state_region : ""} onChange={this.handleChange} name="state_region" required/> 

            <input placeholder="ZIP / Postal Code" type="text" pattern="[A-Za-z0-9]+" tabIndex="-7" value={this.state.zip ? this.state.zip : ""} onChange={this.handleChange} name="zip" required/>
            
            <input placeholder="Discount Code" type="text" pattern="[A-Za-z0-9]+" tabIndex="-8" value={this.state.discount ? this.state.discount : ""} onChange={this.handleChange} name="discountCodeInput" />
            
            <div id={S.submitHolder}>
              <button type="submit" id={S.submit} >Submit</button>
            </div>
       
            <p>{this.state.submitMsg}</p>
        </form>
        
        
      </section>
    )
  }
}
