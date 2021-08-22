import React, {Component} from 'react'
import ReactSlider from 'react-slider'
import Select from 'react-select'
import { navigate } from "@reach/router"
import S from './commissions.module.sass'
import { useCommissionStatus } from '../hooks/commissionStatus.js'

const Slider = (props) => {
  return (
    <div id={S.Slider}>
      <ReactSlider 
        defaultValue={60} 
        withBars 
        max={1000} 
        min={60}
        className={S.budgetSlider} 
        barClassName={S.bar}
        onChange={props.onCahngeBudget}
      >
        <div className={S.handle}></div>
      </ ReactSlider >
    </div>
  )
}

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const SelectType = (props) => {

  const types = [
    { value: 'watercolor', label: 'Watercolor' },
    { value: 'ink', label: 'Ink' },
    // { value: 'digital', label: 'Digital' },
    { value: 'acrylic', label: 'Acrylic' },
    { value: 'pastel', label: 'Pastel' },
    { value: 'graphite', label: 'Graphite' },
    { value: 'AnyMixed', label: 'Any / Mixed' },
  ]

  const sizes = [
    { value: '149 x 210mm', label: '149 x 210mm' },
    { value: '299 x 210mm', label: '299 x 210mm' },
    { value: '210 x 295mm', label: '210 x 295mm' },
    { value: '420 x 295mm', label: '420 x 295mm' },
    { value: 'any', label: 'Any' },
    { value: 'Custom', label: 'Custom (specify)' },
  ]
  
  return (
    <Select
      options={props.types ? types : sizes}
      // value={this.state.medium.value}
      // name={this.state.medium.lable}
      onChange={props.onSelect}
      placeholder={props.types ? "Select Medium" : "Select Size"}
      className={S.dropdown}
    />
  )
}

const goBack = () => {
  navigate(-1);
}


export function GetCommissionStatus(props) {
  const {commissionsOpen} = useCommissionStatus()
  console.log(commissionsOpen);
  return (
    <CommissionForm commissionsOpen={commissionsOpen}/>
  )
}

class CommissionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      medium: null,
    }
  }

  onSelectMedium = (medium) => {
    this.setState({medium: medium.label})
  }

  onSelectSize = (size) => {
    this.setState({size: size.label})
  }

  onCahngeBudget = (budget) => {
    this.setState({budget: budget})
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()


    if (this.state.medium === null && this.state.size === null) {
      this.setState({submitMsg: "Please select your Medium"})
      e.preventDefault()
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
      .then(() => 
				this.setState({formSent: true, submitMsg: this.props.commissionsOpen ? 
					"Thank you. If your commission is a physical piece, I will be contacting you for shipping details." 
					:
					"Thank you for your interest. Though commissions are closed, I'll try to go back to you. If not, you're in queue."
        }))
      
      .catch(error => this.setState({submitMsg: `Something went wrong: ${error}`}))

  }

  render() {
    return (
      <div id={S.CommissionForm}>
        <div className={S.holder}>

          <div className={S.formHolder}>

            <h3>Commission Form</h3>

            <div id={S.buttonHolder} className={S.close} onClick={goBack} role="button"  tabIndex={0}>
              <button id={S.formButton}>Close</button>
            </div>

            <span className={S.sliderNumber}>Your Budget <h4> ${this.state.budget || 0} </h4></span>
            <Slider onCahngeBudget={this.onCahngeBudget}/>
  
            <form id="commissionFormTwo" name="commissionstwo" method="post" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
              <input type="hidden" name="commissionstwo" value="commissionstwo" />
              <input type="hidden" name="bot-field" onChange={this.handleChange} />
              <input className={S.hiddenInput} onChange={this.handleChange} name="budget" value={this.state.budget || ""} />
              <input className={S.hiddenInput} onChange={this.handleChange} name="size" value={this.state.size || ""} />
              <input className={S.hiddenInput} onChange={this.handleChange} name="medium" value={this.state.medium || ""} />

              <SelectType 
                onSelect={this.onSelectMedium} 
                className={S.dropdown}
                types={true}  
              />

              <SelectType 
                onSelect={this.onSelectSize} 
                className={S.dropdown}
              />
  
              <input
                className={S.input}
                placeholder="Your Name" 
                type="text" 
                tabIndex="0" 
                value={this.state.name ? this.state.name : ""} 
                onChange={this.handleChange} name="name" 
                required 
                // autoFocus 
              />

              <input 
                className={S.input}
                placeholder="Email" 
                type="email" 
                tabIndex="-1" 
                value={this.state.email ? this.state.email : ""} 
                onChange={this.handleChange} name="email" 
                required 
              /> 
              
              <textarea 
                className={S.input}
                name="description" 
                form="commissionForm" 
                placeholder="Enter the Description of your commission here..." 
                value={this.state.description ? this.state.description : ""} 
                onChange={this.handleChange} 
                tabIndex="-2" 
                required
              />
                    
              {!this.state.formSent && 
                <>
                <div id={S.buttonHolder}>
                  <button type="submit" id={S.formButton} >Submit</button>
                </div>
                              
                </>
              }
        
              <p>{this.state.submitMsg}</p>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default GetCommissionStatus
