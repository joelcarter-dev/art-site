import React, {Component} from 'react'
import Link from 'gatsby-link'
import ArtImage from '../../components/ArtImgae/ArtImage'
import S from './imageGrid.module.sass'
import { arrowSvg } from '../../img/svg-index.js'
import InlineSVG from 'svg-inline-react'
import Header from '../Header/Header.js'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'
import 'typeface-cinzel'

/** 
 * @param {} data an object of art item nodes to display in a grid. Frontmatter requied 
 * @param {} title a title of the page
*/

class GridTemplate extends Component {
  render() {
  
    const postLinks = this.props.data.map( post => {
      const frontmatter = post.node.frontmatter
      return (
        <div key={post.node.fields.slug} className={S.imageItem}>
          <Link 
            to={post.node.fields.slug}
            //pass prop of cat / med paths for back button on art item 
            state={{pastUrl: this.props.pastUrl || null}}  
          >
            <h2>{frontmatter.title}</h2>
            <ArtImage
              fluid={frontmatter.featuredImage.childImageSharp.fluid} 
              imageData={frontmatter}
            />
          </Link>
        </div>
      )
    })
  
    
    //from context
    const title = this.props.title
    
    //const totalCount = this.props.data.allMarkdownRemark.totalCount not used
    
    return (
      <section id={S.GridTemplate}>
      
        <div className={S.headerHolder}>
          <Header to={["home", "archive"]} white={true} />
        </div>
      
        <div className={S.titleHolder}>
          <Link to = "/store" className={S.storeLink} >
            <InlineSVG src={arrowSvg} />
          </Link>  
          
          <h1 id={S.mediumTitle}>{title}</h1>
        </div>
        <div className={S.imageGrid}>
          {postLinks}
        </div>
      
      </section>
    )
  }
}

export default GridTemplate