import React, { Component } from 'react';
import Img from 'gatsby-image'

import S from './art-pice.module.sass'

//trying to pass art item data through context in node.js instead of 
//another graphql query. It is in the pageContext prop

export default class ArtPice extends Component {
  render() {
    const itemData = this.props.pageContext.node.frontmatter
    console.log(itemData)
    return (
      <section className={S.artItemHolder}>
        <h1 id={S.title}>{itemData.title}</h1>
        
        <div className="image-holder">
          <Img 
            sizes={itemData.featuredImage.childImageSharp.sizes}
          />
        </div>
      
      </section>
    )
  }
}
