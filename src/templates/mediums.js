import React, {Component} from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import S from './mediums.module.sass'

class mediumsRoute extends Component {
  render() {
    console.log(this.props.data)
    const posts = this.props.data.allMarkdownRemark.edges
    
    const postLinks = posts.map( post => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <h2>{post.node.frontmatter.title}</h2>
          <Img
            fixed={post.node.frontmatter.featuredImage.childImageSharp.fixed} 
          />
        </Link>
      </li>
    ))
    
    //there is no type passed to types only tag through context
    const tag = this.props.pageContext.type
    
    const title = this.props.data.site.siteMetadata.title
    
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <section id={S.Tags}>
        <Helmet title={`${tag} | ${title}`} />
        <div>
          <div>
            <div>
              <h3 >{tagHeader}</h3>
              <ul >{postLinks}</ul>
              <p>
                
              </p>
            </div>
          </div>
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
  site {
    siteMetadata {
      title
    }
  }
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
          featuredImage {
            childImageSharp {
              fixed(width: 125, height: 125) {
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