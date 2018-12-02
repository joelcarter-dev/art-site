import React, { Component } from 'react'
import HeaderMeta from '../components/Helmet/Helmet.js'

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
      {props.data.price === "sold" || props.data.price === "SOLD" ?
        <div className={S.price}>
          <h3 style={{textTransform: "uppercase", fontFamily: "cinzel",}}>{props.data.price}</h3> 
        </div> 
        :
        <div className={S.price}>
          <h3>${props.data.price}</h3>
          <span>NZD</span>    
        </div> 
      }
    </div>
    <ul className={S.dataList}>
      <li>{props.data.original ? "original work" : "print"}</li>
      <li>{props.data.type}</li>
      <li style={{textTransform: "none",}}>{props.data.info}</li>
    </ul>
    
    <div className={S.buttonHolder}>
      <button 
        onClick={props.toggleForm}
        className={S.artItemButton}
      >
        Order Now
      </button> 

      <AddToCart itemData={props.itemId} className={S.artItemButton}/>
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
          <span onClick={this.toggleView.bind(this, "info")} className={this.state.view === "info" ? S.selected : ""}>Info</span>
          <span onClick={this.toggleView.bind(this, "notes")} className={this.state.view === "notes" ? S.selected : ""}>Notes</span>
        </div>
        
        {this.state.view === "info" && <Info data={this.props.data} itemId={this.props.itemId} toggleForm={this.props.toggleForm}/>}
        {this.state.view === "notes" && <Notes data={this.props.data.artistNotes}/>}
        
      </div>  
    )
  }
}

class ArtPice extends Component {
  constructor(props) {
    super(props)
    this.state = { 
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
    if (typeof window !== 'undefined' && window ) {
      let maxWidth = window.innerHeight 
      return maxWidth
    } else {
      return
    }
  }
  
  toggleForm = () => {
    this.setState({orderFormHidden: !this.state.orderFormHidden})
  }
  
  render() {
    const itemData = this.props.pageContext.node.frontmatter
    const itemId = this.props.pageContext.id
    
    return (
      <section className={S.artItemHolder}>
      
        <HeaderMeta itemData={itemData}/>
        
        <Order 
          hidden={this.state.orderFormHidden} 
          toggleForm={this.toggleForm}
          orderData={[this.props.pageContext.node]}
        />
        
        <div className={S.artPiceHeader}>
          <Header to={["home", "cart"]} white={true} />
        </div>
        
        <h1 id={S.title}>{itemData.title}</h1>
        
        <div className={S.left}>
          <Sidebar data={itemData} itemId={itemId} toggleForm={this.toggleForm}/>
        </div>
      
        <div 
          className={S.imageHolder} 
          style={{ "maxWidth": `calc(${this.state.maxWidth}px - 160px)` }}>
         
          <Img
            fluid={itemData.featuredImage.childImageSharp.fluid} 
            alt={`${itemData.type} ${itemData.original ? "original work" : "print"} ${itemData.title}`}
            className={S.innerImage}
            src=""
            critical={true}
          />
         
        </div>
        
        <div className={S.right}></div>
      
      </section>
    )
  }
}

export default ArtPice