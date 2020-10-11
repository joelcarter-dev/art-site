import React, { Component } from 'react'
import GridTemplate from '../components/GridTemplate/GridTemplate'
import { graphql } from 'gatsby'
import HeaderMeta from '../components/Helmet/Helmet.js'

class Category extends Component {
  render() {
    // let allTitles = []
    // this.props.data.allMarkdownRemark.edges.forEach( post => {
    //   allTitles.push(post.node.frontmatter.title)
    // })
    return (
      <div style={{position: "absolute", width: "100%", height: "100%", overflow: "hidden", overflowY: "scroll"}}>
        <HeaderMeta subTitle={this.props.pageContext.category} itemGroup={this.props.data.allMarkdownRemark}/>
                      
        <GridTemplate 
          data={this.props.data.allMarkdownRemark.edges} 
          title={this.props.pageContext.category}  
          pastUrl={this.props.location.pathname}
        />
        
      </div>
    )
  }
}


export default Category

//can pass tag data through context in node.js
//but I'm not goinf to bc I want fixed images for thumbnails
//and the node query gets fluid images
export const tagPageQuery = graphql`
query TagPage($category: String) {
  allMarkdownRemark(
    sort: {
      fields: [frontmatter___date], order: DESC}, 
      filter: {frontmatter: {tags: {in: [$category]} is_store_item: {eq: true} }}
    ) {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          artistNotes
          type
          date
          featuredImage {
            childImageSharp {
              fluid(maxHeight: 500){
                src
                sizes
                srcSet
                srcWebp
                srcSetWebp
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
// src
// width
// base64
// height
// srcSet
// aspectRatio
