import React, { Component } from 'react'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import Footer from '../components/Footer/Footer'
import S from './archive.module.sass'
import Link from 'gatsby-link'
import ArtImage from '../components/ArtImgae/ArtImage'
import BackButton from '../components/BackButton/BackButton.js'

import 'typeface-lora'
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
          storeSlug = node.fields.slug,
          desc = node.excerpt
          
      const ArchiveBody = ({className}) => (
        <div className={className} dangerouslySetInnerHTML={{ __html: archiveBody }} />
      )
      
        return (
          <section id={S.AchiveItem}>
          
            <HeaderMeta 
              subTitle={title} 
              article={true} 
              description={desc}
              pathName={this.props.location.pathname}
            /> 
            
            
              <Header to={["home", "store"]} white={true}/>
            
            
            <div className={S.holder}>
              
              <section className={S.body}>
                {headerImage !== null &&
                  <section className={S.imgHeader}>
                    <div className={S.top}>
                      <BackButton pageClass={S.achiveItemBackButton}/> 
                      <h1 id={S.title}>{title}</h1>
                    </div>
         
                      <ArtImage
                        fluid={headerImage}
                        imageData={frontmatter}
                        target="_blank"
                        className={S.innerImage}
                        src=""
                        critical={true}
                      />
                      
                      {isStoreItem &&
                        <div className={S.storeItemLink}>
                          <h3>This piece is a store item</h3>
                          <Link to={storeSlug} id={S.storeItemLink}> view in store </Link>
                        </div>                        
                      }
                    
                  </section>
                }
                <div className={S.bodyHolder}>
                  <ArchiveBody className={S.bodyContent}/>
                </div>
              </section>
            
            </div>

            <Footer backgroundWhite={true}/>  
                      
          </section>
        );
    }
}

export default ArchiveItem
