import React from 'react'

import Img from 'gatsby-image'

const ArtView = (props) => {
  let post = props.data.node.frontmatter
  let imageData = post.featuredImage.childImageSharp.resolutions
  
  return (
    <div
      className={props.data.viewOpen ? "artItem-holder-open" : "artItem-holder-closed"}
      key={props.selectItem.id}
      onClick={props.selectItem}
      style={{height: imageData.height}}
    >
    
      <div className="image-holder">
        <Img 
          resolutions={post.featuredImage.childImageSharp.resolutions}
        />
      </div>
      
      <div 
        className="itemData"
      >
            
        <div className="sidebar">
          <h2 className="title">
            {post.title}
          </h2>
          
          <h3>{post.price}</h3>
          
          <p className="desc">
            {post.description}
          </p>
          
          <small>{post.info}</small>
          
          <ul>
            {post.tags.map( (tag, idx) => (
              <li key={idx}>{tag}</li>
            ))}
          </ul>
        </div>
          
      </div>
    </div>
  );
}

export default ArtView