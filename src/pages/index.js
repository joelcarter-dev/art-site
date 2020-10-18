import React, {Component} from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import ReactVivus from 'react-vivus'
import InlineSVG from 'svg-inline-react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import { mainLogoSvg } from '../img/svg-index.js'

import SvgLeft from '../img/home-left.svg'
import SvgRight from '../img/home-right.svg'
import SvgBottomRight from '../img/home-bottom-right.svg'
import SvgBottomLeft from '../img/home-bottom-left.svg'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'

import './main.sass'
import S from './index.module.sass'
import './mixins.module.scss'

let scrollCounter = 0
const handleScroll = () => {
  scrollCounter++
  console.log(scrollCounter)
}
export class IndexPage extends Component {

  componentDidMount() {
    if (typeof window !== 'undefined') {
      console.log(window)
      window.addEventListener('scroll', handleScroll)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll)
    }
  }
  render() {
    
    const metaData = this.props.data.site.siteMetadata
    const heroImageOne = this.props.data.heroImageOne.edges[0].node.fluid
    const heroImageTwo = this.props.data.heroImageTwo.edges[0].node.fluid
    
    return (
      <section id={S.landing} className="Index">
      
        <HeaderMeta /> 
        <Header to={['store', 'index']} white={false} />
        
        <section className={S.title}>
          <h1>{metaData.title}</h1>
          <h2>{metaData.tagLine}</h2>
        </section>
        
        <section className={S.imageHolder}>
          <div className={S.heroTop}> 
            <Img fluid={heroImageOne} /> 
          </div>
        </section>

        {/* <InlineSVG src={mainLogoSvg} /> */}
        
        <section className={S.mid}>
          <div className={S.sides}>     
            <div className={S.right}></div>
            <div className={S.left}></div>            
          </div>
            
          <div className={S.svgHolder}>

            <div className={S.topSvgHolder}>
              <div className={S.svgLeft}>
                <ReactVivus
                  id={S.svgLeft}
                  option={{
                    file: SvgLeft,
                    animTimingFunction: 'EASE_OUT',
                    type: 'delayed',
                    duration: 400,
                    forceRender: true,
                    //reverseStack: true, 
                    start: "autostart",
                  }}
                  //callback={}
                />
              </div>

              <div className={S.svgRight}>
                <ReactVivus
                  id={S.svgRight}
                  option={{
                    file: SvgRight,
                    animTimingFunction: 'EASE_OUT',
                    type: 'delayed',
                    duration: 400,
                    forceRender: true,
                    //reverseStack: true, 
                    start: "autostart",
                  }}
                  //callback={}
                />
              </div>
            </div>
                  
            <div className={S.bottomSvgHolder}>
              <div className={S.svgLeft}>
                <ReactVivus
                  id={S.svgBottomLeft}
                  option={{
                    file: SvgBottomLeft,
                    animTimingFunction: 'EASE_OUT',
                    type: 'delayed',
                    duration: 600,
                    start: "autostart",
                    forceRender: true,
                    // reverseStack: true, 
                  }}
                  //callback={}
                />
              </div>

              <div className={S.svgRight}>
                <ReactVivus
                  id={S.svgBottomRight}
                  option={{
                    file: SvgBottomRight,
                    animTimingFunction: 'EASE_OUT',
                    type: 'delayed',
                    duration: 600,
                    start: "autostart",
                    forceRender: true,
                    // reverseStack: true, 
                  }}
                  //callback={}
                />
              </div>
            </div>

          </div>
          
          
          <div className={S.mainLogo}>
            <InlineSVG src={mainLogoSvg} />
          </div>

          <div className={S.midContent}>

            <div className={S.constentSides}>     
              <div className={S.right}></div>
              <div className={S.left}></div>            
            </div>

            <div className={S.midTitle}>
              <h2>Words for second section</h2>  
            </div>  
            <div className={S.midContent}>
              <ul>
                <li>thing</li>
                <li>thing</li>
                <li>thing</li>
              </ul>
              <ul>
                <li>thing</li>
                <li>thing</li>
                <li>thing</li>
              </ul>
            </div>
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
          fluid(quality: 100, maxHeight: 1000) {
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
          fluid(quality: 100, maxHeight: 1000) {
            ...GatsbyImageSharpFluid_withWebp_noBase64 
          }
        }
      }
    }
  }
`
