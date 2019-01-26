import React, { Component } from 'react'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import S from './arcive.module.sass'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'

class ArchiveItem extends Component {
    
    render() {
      
      const node = this.props.pageContext.node,
          frontmatter = node.frontmatter,
          archiveBody = node.html,
          title = frontmatter.title,
          //topics is not used atm. Might be if search is added
          //topics = frontmatter.archive_topics,
          headerImage = frontmatter.featuredImage.childImageSharp.fluid || null,
          isStoreItem = frontmatter.is_store_item,
          storeSlug = node.fields.slug
          
      console.log(storeSlug)
          
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
                  
                    {isStoreItem &&
                      <div className={S.storeItemLink}>
                        <h3>This piece is a store item</h3>
                        <Link to={storeSlug} id={S.storeItemLink}> view in store </Link>
                      </div>
                      
                    }
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