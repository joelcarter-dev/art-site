import React from 'react'
import Link from 'gatsby-link'
import { arrowSvg } from '../../img/svg-index.js'
import InlineSVG from 'svg-inline-react'
import S from './backButton.module.sass'

/**
 * 
 * @param {*} className class name
 * @param {*} to the path to the route that is a string
 */

const BackButton = (className, to) => (
    <Link to={to} className={`${S.backButton} ${className}`} >
        <InlineSVG src={arrowSvg} />
    </Link>  
)
export default BackButton