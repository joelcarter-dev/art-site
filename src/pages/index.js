import React, {Component} from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import InlineSVG from 'svg-inline-react'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'
import 'typeface-cinzel'

import './main.sass'
import S from './index.module.sass'
import './mixins.module.scss'

export class IndexPage extends Component {
  render() {
    
  const mainLogoSvg = `<svg viewBox="0 0 147 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Art-Shop-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Tablet-Portrait" transform="translate(-312.000000, -139.000000)" fill="#121011">
            <g id="Group" transform="translate(309.000000, -3.000000)">
                <path d="M82.8377253,183.830583 L82.8472401,183.821068 L76.1297257,177.103553 L69.4122113,183.821068 L69.4499007,183.858757 L57.1543289,196.154329 L3,142 L149.617316,142 L95.3122292,196.305087 L82.8377253,183.830583 Z M81.3377253,185.330583 L93.4317639,197.424621 L76.1579003,214.698485 L58.8840367,197.424621 L70.9499007,185.358757 L76.1297257,190.538582 L81.3377253,185.330583 Z" id="Combined-Shape-Copy" transform="translate(76.308658, 178.349242) rotate(-180.000000) translate(-76.308658, -178.349242) "></path>
            </g>
        </g>
    </g>
</svg>`

  const sidesSvg = `<svg  viewBox="0 0 768 135" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Art-Shop-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Tablet-Portrait" transform="translate(0.000000, -534.000000)" fill="#121011">
            <path d="M0,534 L768,534 L768,669 L0,669 L0,534 Z M384,654 L768,534 L0,534 L384,654 Z" id="Combined-Shape"></path>
        </g>
    </g>
</svg>`


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
            <Header to={['store', 'cart']} white={false} isIndexPage={true}/>
          </div>
          
        </div>
        
        <div className={S.about}>
          
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
  }
`