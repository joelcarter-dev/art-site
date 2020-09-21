
import React from 'react';
import S from './imageGrid.module.sass'
import ArtImage from '../ArtImgae/ArtImage.js'
import Link from 'gatsby-link'
import Header from '../Header/Header.js'
import BackButton from '../BackButton/BackButton.js'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'
import 'typeface-cinzel'

/** 
 * @param {} data an object of art item nodes to display in a grid. Frontmatter requied 
 * @param {} title a title of the page
*/

const GridItem = (post) => {
  const frontmatter = post.data.frontmatter
  return (
    <div className={S.imageItem}>
      <Link to={post.data.fields.slug}>
        <h2>{frontmatter.title}</h2>
        <ArtImage
          fluid={frontmatter.featuredImage.childImageSharp.fluid} 
          imageData={frontmatter}
        />
      </Link>
    </div>
  )
}

const GridTemplate = (props) => {
  
  const postLinks = props.data.map( post => (
    <GridItem data={post.node} key={post.node.fields.slug}/>
  ))
  //from context
  const title = props.title
  //const totalCount = this.props.data.allMarkdownRemark.totalCount not used
  return (
    <section id={S.GridTemplate}>
    
      <Header to={["home", "archive"]} white={true} />
    
      <div className={S.titleHolder}>
        <BackButton />
        <h1 id={S.mediumTitle}>{title}</h1>
      </div>
      <div className={S.imageGrid}>
        {postLinks}
      </div>
    </section>
  )
}

export default GridTemplate
