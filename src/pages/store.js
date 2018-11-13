import React, {Component} from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { kebabCase } from 'lodash'
import HeaderMeta from '../components/Helmet/Helmet.js'
import Header from '../components/Header/Header.js'
import S from './store.module.sass'
//get all tags and display five items under that tag. Clicking on the tag shows all items

//group all links under their tag and type


const ItemList = (props) => (
  <div className={S.itemList}>
    <span>Sort By</span>
    <h3>{props.title}</h3>
    <ul>
    {props.items
      .map( item => (
        <li key={item.fieldValue}>
        
          <Link to={`/${props.folder}/${kebabCase(item.fieldValue)}/`}>
            {item.fieldValue} : {item.totalCount}
          </Link>
          
        </li>
      ))}
    </ul>
  </div>
)

const Selected = (props) => (
  <div id={S.selectedHolder}>
    <h2 id={S.selectedTitle}>Personally Selected</h2>
    <div className={S.items}>
      {props.data
        .map( ({node: item}, i) => (
          <div className={S.selectedItem} key={i}>
            <Link to={item.fields.slug}>
              <h3>{item.frontmatter.title}</h3>
              <Img
                fixed={item.frontmatter.featuredImage.childImageSharp.fixed} 
              />  
            </Link>
          </div> 
        ))}
      </div>
  </div>
)

export default class Store extends Component {
  render() {

    const itemData = this.props.data.posts
    return (
      <section id={S.store}>
        <HeaderMeta pageTitle="Store"/>
        
        <div className={S.menu}>
          <Header to={["home", "cart"]} white={false}/>
        </div>
      
        <div className={S.listHolder}>
          <ItemList items={itemData.tags} folder="cat" title="Categories"/>
        
          <ItemList items={itemData.types} folder="mediums" title="Mediums"/>
        </div>
        
        <Selected data={this.props.data.selected.edges}/>
        
      </section>
    )
  }
}

export const pageQuery = graphql`
  query ArtFeedQuery {
    posts: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
      types: group(
        field: frontmatter___type
      ) {
          fieldValue
          totalCount 
          
        }
      
      tags: group(
        field: frontmatter___tags
      ) {
          fieldValue
          totalCount 
       
        }

    }
    
    selected: allMarkdownRemark(
      filter: {
        frontmatter: { storeHighlight: { ne: false } }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
            type
            storeHighlight
            featuredImage {
              childImageSharp {
                fixed(width: 320, height: 320, cropFocus: CENTER) {
                  src
                  width
                  base64
                  height
                  srcSet
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
  }
`
