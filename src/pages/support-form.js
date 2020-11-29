import React, {Component} from 'react'
import { navigate } from "@reach/router"
import S from './commissions.module.sass'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const goBack = () => {
  navigate(-1);
}

export class SupportForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: null,
      slug: null
    }
  }

  componentDidMount() {
    if (typeof window === 'undefined') {
      return;
    }
    this.setState(() => ({ 
      title: this.props.location.state.itemInfo[0].frontmatter.title,
      slug: this.props.location.state.itemInfo[0].fields.slug
    }))
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (e) => {

    e.preventDefault()
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
				this.setState({formSent: true, submitMsg:
					"Thank you. We will be in contact with you as soon as we can" 
        }))
      
      .catch(error => this.setState({submitMsg: `Something went wrong: ${error}`}))

  }

  render() {

    let itemInfo
    if(typeof window !== `undefined`) {
      itemInfo = this.props.location.state.itemInfo[0]
    }
    return (
      <div id={S.CommissionForm}>
        <div className={S.holder}>

          <div className={S.formHolder}>

            <h3>Contact Us for Support</h3>

            <div id={S.buttonHolder} className={S.close} onClick={goBack} role="button"  tabIndex={0}>
              <button id={S.formButton}>Close</button>
            </div>

          <span className={S.sliderNumber}>Item in question: {itemInfo ? itemInfo.frontmatter.title : null}</span>
  
            <form id="commissionForm" name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
              <input type="hidden" name="contact" value="contact" />
              <input type="hidden" name="bot-field" onChange={this.handleChange} />
              <input className={S.hiddenInput} onChange={this.handleChange} name="slug" value={this.state.slug || ""} />
              <input className={S.hiddenInput} onChange={this.handleChange} name="title" value={this.state.title || ""} />
  
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
                placeholder="Enter the Description of your issue, or question here..." 
                value={this.state.description ? this.state.description : ""} 
                onChange={this.handleChange} 
                tabIndex="-2" 
                required
              />
                    
              {!this.state.formSent && 
                <div id={S.buttonHolder}>
                  <button type="submit" id={S.formButton} >Submit</button>
                </div>
              }

              <p>{this.state.submitMsg}</p>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default SupportForm
