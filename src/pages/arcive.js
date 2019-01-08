import React, {Component} from 'react';
import { graphql } from 'gatsby'
import S from './index-items.module.sass'
//import Img from 'gatsby-image'
import Link from 'gatsby-link'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
//import Order from '../components/Order/Order.js'

import 'typeface-alegreya-sans-sc'

export default class IndexItems extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      
    }
  }
  
  render() {
    return (
      <section id={S.Cart}>
        <HeaderMeta pageTitle="Arcive"/> 
        <div className={S.menu}>
          <Header to={["home", "store"]} white={false}/>
        </div>
      </section>  
    )
  }
}

export const pageQuery = graphql`
  {
   AllArciveItems: allMarkdownRemark(filter: {frontmatter: {is_archive_item: {ne: false}}}) {
      edges {
        node {
          id
          fields {
            slug
          }
          html
          frontmatter {
            title
            tags
            type
            storeHighlight
            is_archive_item
          }
        }
      }
    }
  }
`
