import React, {Component} from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import S from './tags.module.sass'

class TagRoute extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    const postLinks = posts.map( post => (
      <li key={post.node.fields.slug} className={S.tagItem}>
        <Link to={post.node.fields.slug}>
          <h2>{post.node.frontmatter.title}</h2>
          <Img
            fixed={post.node.frontmatter.featuredImage.childImageSharp.fixed} 
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
      </li>
    ))

    //there is no type passed to types only tag through context
    const tag = this.props.pageContext.tag
    
    const title = this.props.data.site.siteMetadata.title
    
    const totalCount = this.props.data.allMarkdownRemark.totalCount
  
    return (
      <section id={S.Tags}>
        <Helmet title={`${tag} | ${title}`} />
        <h1 id={S.title}>Art in the {tag} category</h1>
        
        <div className={S.tagHolder}>
            
          <ul>{postLinks}</ul>
          
        </div>
      </section>
    )
  }
}

export default TagRoute

//can pass tag data through context in node.js
//but I'm not goinf to bc I want fixed images for thumbnails
//and the node query gets fluid images
export const tagPageQuery = graphql`
query TagPage($tag: String) {
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(
    sort: {
      fields: [frontmatter___date], order: DESC}, 
      filter: {frontmatter: {tags: {in: [$tag]}}}
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
          type
          featuredImage {
            childImageSharp {
              fixed(width: 150, height: 150, cropFocus: CENTER) {
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
