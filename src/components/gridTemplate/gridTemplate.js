import React, {Component} from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import S from './mediums.module.sass'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'
import 'typeface-cinzel'

//IS IT WATERCOLOR WITH A "U" IN NZ?

class GridTemplate extends Component {
  render() {
  
    const postLinks = this.props.data.map( post => (
      <div key={post.node.fields.slug} className={S.imageItem}>
        <Link to={post.node.fields.slug}>
          <h2>{post.node.frontmatter.title}</h2>
          <Img
            fluid={post.node.frontmatter.featuredImage.childImageSharp.fluid} 
          />
        </Link>
      </div>
    ))
  
    
    //from context
    const title = this.props.title
    
    //const totalCount = this.props.data.allMarkdownRemark.totalCount not used
    
    return (
      <section id={S.GridTemplate}>
      

        
        <h1 id={S.mediumTitle}>{title}</h1>
        <div className={S.imageGrid}>
          {postLinks}
        </div>
      
      </section>
    )
  }
}

export default GridTemplate