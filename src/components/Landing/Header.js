import React, { Component, PropTypes } from 'react';

import headerImage from '../../img/DSC05916.jpg'

import SvgLogo from '../../img/logo.svg'
   
export class Header extends Component {
  
  handleScroll = () => {
    let offsetTop  = this.elNode.getBoundingClientRect().top;
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  render() {
    const { data } = this.props
    return (
      
      <section id="landing-header">
        <div className="top">
          <div className="theme-buttons">
            <span id="black"></span>
            <span id="white"></span>
          </div>
        </div>
        
        <div className="header-image-holder">
          <img src={headerImage} alt="hero image" id="hero-image"/>
        </div>
        
        <div 
          className="overlay"
          ref={(el) => this.elNode = el} 
          onScroll={this.handleScroll}
        >

          <section className="about">
            <SvgLogo />
            <div className="about-holder">
              <div className="about-content">
              
              </div>
            </div>
          </section>
          
        </div>
        

      </section>
    )
  }
  
}

export default Header
