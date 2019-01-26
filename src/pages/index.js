import React, {Component} from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import InlineSVG from 'svg-inline-react'
import Img from 'gatsby-image'
import { mainLogoSvg } from '../img/svg-index.js'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'
import 'typeface-cinzel'

import './main.sass'
import S from './index.module.sass'
import './mixins.module.scss'

export class IndexPage extends Component {
  render() {
    
    const metaData = this.props.data.site.siteMetadata
    const heroImageOne = this.props.data.heroImageOne.edges[0].node.fluid
    const heroImageTwo = this.props.data.heroImageTwo.edges[0].node.fluid
    
    return (
      <section id={S.landing} className="Index">
      
        <HeaderMeta />
      
        <section className={S.menu}>
          <Header to={['store', 'index']} white={false} isIndexPage={true}/>
        </section>
        
        <section className={S.title}>
          <h1>{metaData.title}</h1>
        </section>
        
        <section className={S.imageHolder}>
          <div className={S.heroTop}> <Img fluid={heroImageOne} /> </div>
          <div className={S.heroBottom}> <Img fluid={heroImageTwo} /> </div>
        </section>
        
        <section className={S.mid}>
          <div className={S.sides}>     
            <div className={S.right}></div>
            <div className={S.left}></div>            
          </div>
            
          <div className={S.mainLogo}>
          
            <InlineSVG src={mainLogoSvg} />
            
          </div>          
        </section>
                  
      </section>
    )
    
  }
  
}



export default IndexPage

export const indexQuery = graphql`
  query indexPage {
    site {
      siteMetadata {
        title
        tagLine
      }
    }
    heroImageOne: allImageSharp(
      filter: {
        fluid: {originalName: {regex: "/testHero.jpg/"}}
      }) {
      edges {
        node {
          id
          fluid {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
    heroImageTwo: allImageSharp(
      filter: {
        fluid: {originalName: {regex: "/redBanner.jpg/"}}
      }) {
      edges {
        node {
          id
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_withWebp_noBase64 
          }
        }
      }
    }
  }
`