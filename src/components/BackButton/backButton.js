import React from 'react'
import Link from 'gatsby-link'
import { arrowSvg } from '../../img/svg-index.js'
import InlineSVG from 'svg-inline-react'
import S from './backButton.module.sass'
import PropTypes from 'prop-types'

/**
 * 
 * @param {*} className class name
 * @param {*} path the path to the route that is a string
 */

const BackButton = (className, path) => {
    return (
        <Link to={toString(path)} className={`${S.backButton} ${className}`} >
            <InlineSVG src={arrowSvg} />
        </Link>  
    )
}

BackButton.propTypes = {
    path: PropTypes.string
  }
export default BackButton