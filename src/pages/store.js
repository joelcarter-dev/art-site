import React, {Component} from 'react'
import { graphql } from 'gatsby'
import { uniqBy } from 'lodash'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { kebabCase } from 'lodash'
import S from './store.module.sass'
//get all tags and display five items under that tag. Clicking on the tag shows all items

//group all links under their tag and type

const Selected = (props) => {
  return (
    <div id={S.selected}>
    {props.data.map( ({node: item}, i) => (

      <div className={S.selectedItem} key={i}>
        <Link to={item.fields.slug}>
          <Img
            fluid={item.frontmatter.featuredImage.childImageSharp.fluid} 
          />  
        </Link>
      </div>
      
    ))}
    </div>
  )
}

const ItemList = (props) => {
  // maybe this just links to the tag
  // index page that acts as a item feed for items with that
  // tag
  return (
    props.items
      .map( item => (
        <li key={item.fieldValue}>
        
          <Link to={`/${props.folder}/${kebabCase(item.fieldValue)}/`}>
            {item.fieldValue} ({item.totalCount})
          </Link>
          
        </li>
      ))  
  )
  
}


export default class Store extends Component {
  render() {

    const itemData = this.props.data.posts
      console.log(itemData)
    return (
      <section id={S.store}>
      
        <h3>Categories</h3>
        <ul>
          <ItemList items={itemData.tags} folder="tags"/>
        </ul>
        
        <h3>Mediums</h3>
        <ul>
          <ItemList items={itemData.types} folder="types"/>
        </ul>
        
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
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      
      tags: group(
        field: frontmatter___tags
      ) {
          fieldValue
          totalCount 
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
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
                fluid(maxHeight: 500) {
                  src
                  srcSet
                  sizes
                  base64
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
