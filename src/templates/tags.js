import React, {Component} from 'react'
import HeaderMeta from '../components/Helmet/Helmet.js'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import S from './tags.module.sass'
import Header from '../components/Header/Header.js'

class TagRoute extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    const allTitles = []

    const postLinks = posts.map( post => {
      allTitles.push(post.node.frontmatter.title)
      return (
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
      )
    })

    //there is no type passed to types only tag through context
    const tag = this.props.pageContext.tag

    return (
      <section id={S.Tags}>
      
        <HeaderMeta pageTitle={tag} itemGroup={allTitles}/>
        
        <div className={S.headerHolder}>        
          <div className={S.header}>
            <Header to={["home", "cart"]} white={true} />
          </div>
        </div>

        <h1 id={S.title}>In the <b>{tag}</b> category</h1>
        
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
  allMarkdownRemark(
    sort: {
      fields: [frontmatter___date], order: DESC}, 
      filter: {frontmatter: {tags: {in: [$tag]}}}
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
          featuredImage {
            childImageSharp {
              fixed(width: 150, height: 150, cropFocus: CENTER) {
                ...GatsbyImageSharpFixed_withWebp
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