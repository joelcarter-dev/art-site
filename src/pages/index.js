import React, {Component} from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import InlineSVG from 'svg-inline-react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import { mainLogoSvg } from '../img/svg-index.js'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'
import 'typeface-cinzel'

import './main.sass'
import S from './index.module.sass'
import './mixins.module.scss'

const ArchiveSlide = (props) => {
  const heading = `Explore a world`
  const desc = `An Archive of lore, illustrations, and short stories.`
  const archiveItem = {
    title: `title`,
    text:
      `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,

    link: `/archive/rising-phoenix`
  }
  return (
    <div className={S.slideOne}>
      <Img fluid={props.img} className={S.heroImage}/>
      <div className={S.holder}>
        <h2 className={S.heading}>{heading}</h2>
        <h3 className={S.desc}>{desc}</h3>
        
        <div className={S.archiveItemHolder}>
          <div className={S.archiveItem}>
            <h3>{archiveItem.title}</h3>
            <p>{archiveItem.text}</p>
          </div>
          
          <Link to={archiveItem.link} > View In Archive </Link>
        </div>
        
      </div>
    </div>
  )
}

const SlideHolder = (props) => {
  return (
    <ArchiveSlide img={props.heroImageTwo}/>
  )
}

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
          <h2>{metaData.tagLine}</h2>
        </section>
        
        <section className={S.imageHolder}>
          <div className={S.heroTop}> <Img fluid={heroImageOne} /> </div>
          <SlideHolder heroImageTwo={heroImageTwo} />
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