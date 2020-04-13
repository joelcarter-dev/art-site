import React, { Component } from 'react'
import GridTemplate from '../components/gridTemplate/gridTemplate.js'
import { graphql } from 'gatsby'
import HeaderMeta from '../components/Helmet/Helmet.js'

//IS IT WATERCOLOR WITH A "U" IN NZ?

class Mediums extends Component {    
  render() {
    let allTitles = []
    this.props.data.allMarkdownRemark.edges.forEach( post => {
      allTitles.push(post.node.frontmatter.title)
    })
    return (
      <div style={{position: "absolute", width: "100%", height: "100%", overflow: "hidden", overflowY: "scroll"}}>
        <HeaderMeta subTitle={this.props.pageContext.medium} itemGroup={this.props.data.allMarkdownRemark}/>
                 
        <GridTemplate 
          data={this.props.data.allMarkdownRemark.edges} 
          title={this.props.pageContext.medium}
          pastUrl={this.props.location.pathname}  
        />
        
      </div>
    )
  }
}

export default Mediums


//can pass tag data through context in node.js
//but I'm not going to bc I want fixed images for thumbnails
//and the node query gets fluid images, meanming I would need to
//write another query
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
          artistNotes
          type
          featuredImage {
            childImageSharp {
              fluid(maxHeight: 600){
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

