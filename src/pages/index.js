import React, {Component} from 'react'
import { graphql } from 'gatsby'
import propTypes from 'prop-types'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import Logo from '../img/logo.svg'
import TriLeft from '../img/landing/triangle-left.svg'
import TriRight from '../img/landing/triangle-right.svg'
import Sides from '../img/landing/sides.svg'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'
import 'typeface-cinzel'

import './main.sass'
import S from './index.module.sass'
import './mixins.module.scss'

export class IndexPage extends Component {
  render() {
    const metaData = this.props.data.site.siteMetadata
    return (
      <section id={S.landing} className="Index">
      
        <HeaderMeta />
      
    
        <div className={S.header}>
        
        </div>
        
        <div className={S.title}>
          <h1>{metaData.title}</h1>
        </div>
        
        <div className={S.mainLogo}>
          <Logo />
        </div>
        
        <div className={S.sidesHolder}>
          <Sides />
        </div>
        
        <div className={S.content}>
                      
          <div className={S.tagLine}>
            <h2>{metaData.tagLine}</h2>    
          </div>
          
          <div className={S.menu}>
            <Header to={["store", "cart"]} white={false}/>
          </div>
          
        </div>
        
        <div className={S.about}>
          
        </div>
        
       
      </section>
    )
    
  }
  
}

export default IndexPage

// // IndexPage.propTypes = {
// //   data: PropTypes.shape({
// //     site: PropTypes.shape({
// //       title: PropTypes.string,
// //       tagLine: PropTypes.string,
// //     }),
// //   }),
// // }
{/*
 <div className={S.content}>
        
          <div className={S.mainLogo}>
            <Logo />
          </div>
          
          <div className={S.tagLine}>
            <h2>{metaData.tagLine}</h2>    
          </div>
        
          <div className={S.menu}>
            <Header to={["store", "cart"]} white={false}/>
          </div>
          
          <div className={S.about}>
          
          </div>
          
        </div>
*/}

export const indexQuery = graphql`
  query indexPage {
    site {
      siteMetadata {
        title
        tagLine
      }
    }
  }
`