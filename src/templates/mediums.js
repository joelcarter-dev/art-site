import React, {Component} from 'react'
import HeaderMeta from '../components/Helmet/Helmet.js'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import S from './mediums.module.sass'

//IS IT WATERCOLOR WITH A "U" IN NZ?

class mediumsRoute extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    
    const allTitles = []
    
    const postLinks = posts.map( post => {
      allTitles.push(post.node.frontmatter.title)
      return (
        <div key={post.node.fields.slug} className={S.imageItem}>
          <Link to={post.node.fields.slug}>
            <h2>{post.node.frontmatter.title}</h2>
            <Img
              fluid={post.node.frontmatter.featuredImage.childImageSharp.fluid} 
            />
          </Link>
        </div>
      )
    })
    
    //there is no type passed to types only tag through context
    const type = this.props.pageContext.type
    
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    
    return (
      <section id={S.Medium}>
      
        <HeaderMeta pageTitle={type} itemGroup={allTitles}/>
        
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
query mediumsPage($type: String) {
  allMarkdownRemark(
    sort: {fields: [frontmatter___date], order: DESC}, 
    filter: {frontmatter: {type: {in: [$type]}}}
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