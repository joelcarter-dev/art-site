import React, { Component } from 'react';

import Header from '../components/Header/Header.js'

import AddToCart from '../components/Cart/AddToCart.js'
import Order from '../components/Order/Order.js'

import Img from 'gatsby-image'
import S from './art-pice.module.sass'

//trying to pass art item data through context in node.js instead of 
//another graphql query. It is in the pageContext prop

const Info = (props) => (
  <div className={S.infoHolder}>
    <div className={S.priceHolder}>
      <div className={S.price}>
        <h3>${props.data.price}</h3>
        <span>NZD</span>
      </div>
    </div>
    <ul className={S.dataList}>
      <li>{props.data.original ? "original work" : "print"}</li>
      <li>{props.data.type}</li>
      <li>{props.data.info}</li>
    </ul>
    
    <div className={S.buttonHolder}>
      <button 
        onClick={props.toggleForm}
        className={S.artItemButton}
      >
        Order Now
      </button> 

      <AddToCart itemData={props.id} className={S.artItemButton}/>
    </div>  
  </div>
)

const Notes = (props) => (
  <div className={S.notesHolder}>
    {/* is it 's or s*/}
    <h3>Artists Notes</h3>
    <div className={S.notes}>
      <p>{props.data}</p>
    </div>
  </div>  
)

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      view: "info"
    }
  }
  
  toggleView = (i)=> {
    this.setState({view: i})
  }
  
  render() {
  
    return (
      <div id={S.Sidebar}>
        <div id={S.infoMenu}>
          <span onClick={this.toggleView.bind(this, "info")}>Info</span>
          <span onClick={this.toggleView.bind(this, "notes")}>Notes</span>
        </div>
        
        {this.state.view === "info" && <Info data={this.props.data} toggleForm={this.props.toggleForm}/>}
        {this.state.view === "notes" && <Notes data={this.props.data.artistNotes}/>}
        
      </div>  
    )
  }
}

export default class ArtPice extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      imageWidth: 0,
      maxWidth: this.updateWindowDimensions(),
      orderFormHidden: true
    }
    this.updateWindowDimensions()
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  updateWindowDimensions = () => { 
    //console.log("called")
    if (typeof window !== `undefined` && window ) {
      
      let maxWidth = this.props.pageContext.node.frontmatter.featuredImage.childImageSharp.fluid.sizes.split(" ")
      maxWidth = maxWidth[3].replace(/\D/g,'')
      if (maxWidth / 2 < window.innerHeight - 150 ) {
        //console.log("pass " + maxWidth + " vs " + window.innerHeight)
        return maxWidth
      } else {
        let smallerMaxWidth = maxWidth / 2
        //console.log("fuck " + maxWidth + " vs " + window.innerHeight)
        return smallerMaxWidth
      }
    } else {return}
  }
  
  toggleForm = () => {
    this.setState({orderFormHidden: !this.state.orderFormHidden})
  }
  
  render() {
    const itemData = this.props.pageContext.node.frontmatter
    const itemId = this.props.pageContext.id
    
    return (
      <section className={S.artItemHolder}>
        
        <Order 
          hidden={this.state.orderFormHidden} 
          toggleForm={this.toggleForm}
          orderData={itemData}
        />
        
        <Header currentPage="store" id={S.Header}/>
        
        <h1 id={S.title}>{itemData.title}</h1>
        
        <div className={S.left}>
          <Sidebar data={itemData} id={itemId} toggleForm={this.toggleForm}/>
        </div>
        
        <div className={S.overlay}></div>
        <div 
          className={S.imageHolder} 
          style={{
             "maxWidth": `calc(${this.state.maxWidth}px - 200px)`
            }}>
          <Img
            fluid={itemData.featuredImage.childImageSharp.fluid} 
            alt={`${itemData.type} ${itemData.original ? "original work" : "print"} ${itemData.title}`}
            className={S.innerImage}
          />
        </div>
        
        <div className={S.right}></div>
      
      </section>
    )
  }
}
