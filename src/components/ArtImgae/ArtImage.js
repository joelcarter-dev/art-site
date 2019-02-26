import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

/**
 * @param  {} {className
 * @param  {} imageData an art item node, frontmatter required
 * @param  {} fluid
 * @param  {} fixed
 * @param  {} ...props}
 * @param  {} =>{constalt=maxLength(`${imageData.title}
 * @param  {"printoftheoriginal"}${imageData.type.join("and"} a${imageData.original?"originalworkof"
 */

const maxLength = (string, length) => {
  let trimmedString = string.length > length 
    ? 
      string.substring(0, length - 3) + "..." 
    : 
      string
  return trimmedString
}

const ArtImage = ({className, imageData, fluid, fixed, ...props}) => {
  const alt = 
    maxLength(
      `${imageData.title}, a ${imageData.original ? "original work of" : "print of the original"} ${imageData.type.join(" and ")} piece. ${imageData.about}`
      , 100)
  
  if(fluid) { 
    return (
      <Img 
        fluid={fluid}
        className={className}
        alt={alt}
      />
    )
  } else {
    return (
      <Img 
        fixed={fixed}
        className={className}
        alt={alt}
      />
    )
  }
}


ArtImage.propTypes = {
  imageData: PropTypes.object.isRequired
}

export default ArtImage
