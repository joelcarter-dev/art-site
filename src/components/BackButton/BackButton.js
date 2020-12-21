import React from 'react'
import { arrowSvg } from '../../img/svg-index.js'
import InlineSVG from 'svg-inline-react'
import S from './backButton.module.sass'
import PropTypes from 'prop-types'
import { navigate } from "@reach/router"

/**
 * 
 * @param {*} pageClass custom class to give styles based on page
 * @param {*} path the path to the route that is a string
 */

const goBack = () => {
    navigate(-1);
}

const BackButton = (pageClass) => {

    return (
        <button onClick={goBack} id="BackButton" className={`${S.backButton} ${pageClass.pageClass !== undefined ? pageClass.pageClass : null}`} >
            <InlineSVG src={arrowSvg} />
        </button>  
    )
}

BackButton.propTypes = {
    path: PropTypes.string
  }
export default BackButton
