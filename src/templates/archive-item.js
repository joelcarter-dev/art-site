import React, { Component } from 'react'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import S from './archive.module.sass'
import Link from 'gatsby-link'
import ArtImage from '../components/ArtImgae/ArtImage'

import { arrowSvg } from '../img/svg-index'
import InlineSVG from 'svg-inline-react'

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
          
      console.log(storeSlug)
          
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
                    {/* <div className="left"></div> */}
                    <div className="mid">

                    <Link to = "/archive" className={S.storeLink} >
                      <InlineSVG src={arrowSvg} />
                    </Link>  

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
                    </div>
                    {/* <div className="right"></div> */}
                  </section>
                }
                <h1 id={S.title}>{title}</h1>
                <div className={S.bodyHolder}>
                  <ArchiveBody className={S.bodyContent}/>
                </div>
              </section>
            
            </div>
                      
          </section>
        );
    }
}

export default ArchiveItem
