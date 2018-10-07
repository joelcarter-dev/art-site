import React, {Component} from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Gallery from 'react-grid-gallery'
import S from './mediums.module.sass'

class mediumsRoute extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    
    const postLinks = posts.map( post => (
      <div key={post.node.fields.slug} className={S.imageItem}>
        <Link to={post.node.fields.slug}>
          <h2>{post.node.frontmatter.title}</h2>
          <Img
            fluid={post.node.frontmatter.featuredImage.childImageSharp.fluid} 
          />
          <div className={S.content}>
            <ul>
              {post.node.frontmatter.tags.slice(0, 3)
                .map((tag, i)=> {
                   if (tag === this.props.pageContext.tag) {
                    return ( <li key={tag} style={{"opacity": "1"}}>{tag}</li> )
                  } else {
                    return (
                      <li key={tag}>{tag}</li>
                    )
                  }
                })}
            </ul>
          </div>
        </Link>
      </div>
    ))
    
    //there is no type passed to types only tag through context
    const type = this.props.pageContext.type
    
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    
    return (
      <section id={S.Medium}>
        <h1 id id={S.mediumTitle}>{type}</h1>
        <div className={S.imageGrid}>
          {postLinks}
        </div>
      
      </section>
    )
  }
}

export default mediumsRoute

//can pass tag data through context in node.js
//but I'm not goinf to bc I want fixed images for thumbnails
//and the node query gets fluid images
export const mediumsPageQuery = graphql`
query mediumsPage {
  allMarkdownRemark(
    sort: {fields: [frontmatter___date], order: DESC}, 
    ) {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          tags
          featuredImage {
            childImageSharp {
              fluid(maxHeight: 300){
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
// sizes
// base64
// srcSet
// aspectRatio