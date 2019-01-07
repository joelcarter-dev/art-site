import React, {Component} from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import InlineSVG from 'svg-inline-react'
import Img from 'gatsby-image'
import { mainLogoSvg, sidesSvg } from '../img/svg-index.js'

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
      
    
        <div className={S.header}>
          <Img fluid={heroImageOne} /> 
        </div>
        
        <div className={S.title}>
          <h1>{metaData.title}</h1>
        </div>
        
        <div className={S.mainLogo}>
          <InlineSVG src={mainLogoSvg} />
        </div>
          
        <div className={S.content}>
        
          <div className={S.sidesHolder}>
            <InlineSVG src={sidesSvg} />
          </div>
                      
          <div className={S.tagLine}>
            <h2>{metaData.tagLine}</h2>    
          </div>
          
          <div className={S.menu}>
            <Header to={['store', 'index']} white={false} isIndexPage={true}/>
          </div>
          
        </div>
        
        <div className={S.about}>
          <Img fluid={heroImageTwo} /> 
        </div>
        
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