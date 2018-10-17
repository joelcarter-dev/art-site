import React from "react"
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

//Can take a data from a store item and apply in desc meta tags 
//Takes a "pageTitle" prop that dispays "pageTitle | Site Title"
//If there is an art item data obj, its title will overrule the page prop if presant
//tage an "itemGroup" object meants for tags and types. has array of titles and totalcount

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