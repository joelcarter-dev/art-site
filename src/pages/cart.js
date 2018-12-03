import React, {Component} from 'react';
import { graphql } from 'gatsby'
import S from './cart.module.sass'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import Header from '../components/Header/Header.js'
import Order from '../components/Order/Order.js'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'
import 'typeface-cinzel'

const ItemList = (props) => {   
  return (
    <div className={S.cartItems}>
      {props.cartItems.map(item => {
        //  THIS IS REUSED CODE FROM MEDIUMS IT SHOULD BE ITS OWN COMP
        const frontmatter = item.frontmatter
        return (
          <div className={S.cartItem} key={item.id}>
          
            <div className={S.left}>
            
              <Link to={item.fields.slug}>
                <Img
                  fluid={frontmatter.featuredImage.childImageSharp.fluid} 
                />
              </Link>
              
            </div>
            
            <div className={S.right}>
              <h2>{frontmatter.title}</h2>
              <h3>{frontmatter.price}</h3>
              <h4>{frontmatter.original ? `Original ${frontmatter.type}` :`${frontmatter.type} Print`}</h4>
            </div>
            
          </div>
        )
      })}
    </div>   
  )
}

const CartHolder = (props) => (
  <div className={S.cartHolder}>
    <Order 
      hidden={props.orderFormHidden} 
      toggleForm={props.toggleForm}
      orderData={props.cartItems}
    />
    <div className={S.orderHolder}>
      <button onClick={props.toggleForm} className={S.orderButton}>
        Order All
      </button> 
    </div>
    <h1>Your Cart | {props.cartItems.length} Items</h1>
    {props.children}
  </div>  
)


let cartIds = []
export default class CartPage extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      orderFormHidden: true
    }
  }
  
  toggleForm = () => {
    this.setState({orderFormHidden: !this.state.orderFormHidden})
  }
  

  render() {
  
    let cartItems = []
    if (typeof window !== 'undefined' && window ) {
      let cartIds = JSON.parse(localStorage.getItem('cartItems')) 
      if (cartIds === null) {cartIds = []}
      const allItems = this.props.data.allMarkdownRemark.edges
      //console.log(allItems)
      
       cartIds.forEach(cartId => {
          //console.log("cartId: ", cartId);
          allItems.forEach((item, index) => {
            //console.log(`allItems id-${index} :  ${item.node.id}`);
            if (cartId === item.node.id) {
            cartItems.push(item.node)
          }
        })
      })
    }
     
    //console.log("cart items ", cartItems)
  
    return (
      <section id={S.Cart}>
        <div className={S.menu}> 
          <Header to={['home', 'store']} white={false}/>
        </div>
        
        {!cartIds ?
          <div className={S.emptyCart}>
            Looks like your cart is empty
          </div>
          :
      
          <CartHolder 
            cartItems={cartItems} 
            toggleForm={this.toggleForm} 
            orderFormHidden={this.state.orderFormHidden}>
            <ItemList cartItems={cartItems} />
          </CartHolder>
        
        }
        
      </section>  
    )
  }
}

export const pageQuery = graphql`
query CartQuery {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          price
          type
          original
          about
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
}

`