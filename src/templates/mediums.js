import React, { Component } from 'react'
// import GridTemplate from '../components/GridTemplate/GridTemplate'
import { graphql } from 'gatsby'
import HeaderMeta from '../components/Helmet/Helmet.js'

import S from './imageGrid.module.sass'
import ArtImage from '../components/ArtImgae/ArtImage.js'
import Link from 'gatsby-link'
import { arrowSvg } from '../img/svg-index.js'
import InlineSVG from 'svg-inline-react'
import Header from '../components/Header/Header.js'

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

