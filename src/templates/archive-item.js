import React, { Component } from 'react'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import S from './arcive.module.sass'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'

class ArchiveItem extends Component {

    constructor(props) {
        super(props)
    }
    
    render() {
      
      const node = this.props.pageContext.node,
          frontmatter = node.frontmatter,
          archiveBody = node.html,
          title = frontmatter.title,
          topics = frontmatter.archive_topics,
          headerImage = frontmatter.featuredImage.childImageSharp.fluid || null
          
      const ArchiveBody = ({className}) => (
        <div className={className} dangerouslySetInnerHTML={{ __html: archiveBody }} />
      )
      
        return (
          <div id={S.AchiveItem}>
            <HeaderMeta pageTitle="Archive"/> 
            <div className={S.menu}>
              <Header to={["home", "store"]} white={true}/>
            </div>
            
            <div className={S.holder}>
              
              <section className={S.body}>
                <Link to="/archive" id={S.indexLink}> index </Link>
                
                {headerImage !== null &&
                  <section className={S.imgHeader}>
                    <Img
                      fluid={headerImage} 
                      target="_blank"
                      className={S.innerImage}
                      src=""
                      critical={true}
                    />
                  </section>
                }
                <h1 id={S.title}>{title}</h1>
                <div className={S.bodyHolder}>
                  <ArchiveBody className={S.bodyContent}/>
                </div>
              </section>
            
            </div>
                      
          </div>
        );
    }
}

export default ArchiveItem