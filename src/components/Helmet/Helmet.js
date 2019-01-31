import React from "react"
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import apple_touch_icon from "../../img/favicons/apple-touch-icon.png"
import favicon_32x32 from "../../img/favicons/favicon-32x32.png"
import safari_pinned_tab from "../../img/favicons/safari-pinned-tab.svg"

//Can take a data from a store item and apply in desc meta tags 
//Takes a "pageTitle" prop that dispays "pageTitle | Site Title"
//If there is an art item data obj, its title will overrule the page prop if presant
//tage an "itemGroup" object meants for tags and types. has array of titles and totalcount

//

const toUpperCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            tagLine
          }
        }
      }
    `}
    render={data => {
      
      let itemGroup = props.itemGroup || null
      let pageTitle = props.pageTitle || null
      let itemData = props.itemData || null
      let siteMetadata = data.site.siteMetadata || null

      return (
        <Helmet>
        
        

          <link rel="apple-touch-icon" sizes="180x180" href={apple_touch_icon} />
          <link rel="icon" type="image/png" sizes="32x32" href={favicon_32x32} />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon_32x32} />
          <link rel="manifest" href={favicon_32x32} />
          <link rel="mask-icon" href={safari_pinned_tab} color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />


          <title>{ 
            itemData != null ? 
              `${toUpperCase(itemData.title)} | ${siteMetadata.title}` 
                :
              pageTitle != null ?
              `${toUpperCase(pageTitle)} | ${siteMetadata.title}` 
                :
              `${siteMetadata.title}`
            
          }</title>
          <meta name="description" content={ 
            itemData != null && itemGroup === null ? 
              `${toUpperCase(itemData.title)}, an ${itemData.original ? 'original' : null} ${itemData.type}. ${itemData.about}` 
              :
            itemGroup !=null ?
              `${itemGroup.length} Art items in ${pageTitle}: ${toUpperCase(itemGroup.slice(0, 6).join(", "))}`
                :
              `${siteMetadata.tagLine}`
          } />
        </Helmet>
      )}}
  />
  )