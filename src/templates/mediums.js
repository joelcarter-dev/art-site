import React, { Component } from 'react'
import GridTemplate from '../components/gridTemplate/gridTemplate.js'
import { graphql } from 'gatsby'
import HeaderMeta from '../components/Helmet/Helmet.js'
// import Header from '../components/Header/Header.js'

//IS IT WATERCOLOR WITH A "U" IN NZ?

class Mediums extends Component {
  render() {
    let allTitles = []
    this.props.data.allMarkdownRemark.edges.map( post => {
      allTitles.push(post.node.frontmatter.title)
    })
    return (
      <div style={{position: "absolute", width: "100%", height: "100%"}}>
        <HeaderMeta pageTitle={this.props.pageContext.medium} itemGroup={allTitles}/>
                 
        <GridTemplate data={this.props.data.allMarkdownRemark.edges} title={this.props.pageContext.medium}/>
        
      </div>
    )
  }
}

export default Mediums


//can pass tag data through context in node.js
//but I'm not goinf to bc I want fixed images for thumbnails
//and the node query gets fluid images
export const mediumsPageQuery = graphql`
query mediumsPage($medium: String) {
  allMarkdownRemark(
    sort: {fields: [frontmatter___date], order: DESC}, 
    filter: {frontmatter: {type: {in: [$medium]} is_store_item: {eq: true} }}
    ) {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          featuredImage {
            childImageSharp {
              fluid(maxHeight: 300){
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
// sizes
// base64
// srcSet
// aspectRatio

