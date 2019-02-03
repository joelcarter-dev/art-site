import React from "react"
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
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

const maxLength = (string, length) => {
  let trimmedString = string.substring(0, length)
  return trimmedString
}

const SEO = ({ title, subTitle, description, image, pathName, article }) => (
  <StaticQuery
    query={query}
    render={(
      {site: {
        siteMetadata: {
          defaultTitle,
          defaultDescription,
          siteUrl,

        },
      }}
    ) => {
      const seo = {
        title: subTitle != null ? `${subTitle} | ${defaultTitle}` : defaultTitle,
        description: description || defaultDescription,
        //image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathName || "/"}`,
        articleTitle: `${subTitle} | Archive`,
      }
      
      // let itemGroup = props.itemGroup || null
      // let pageTitle = props.pageTitle || null
      // let itemData = props.itemData || null
      //let siteMetadata = data.site.siteMetadata || null

      return (
        
        <Helmet title={toUpperCase(seo.title)} >
        
          <html lang="en" />
          <meta name="description" content={seo.description} />
          <meta name="image" content={seo.image} />
          
          {seo.url && <meta property="og:url" content={seo.url} />}
          
          {(article ? true : null) && (
            <meta property="og:type" content="article" />
          )}
        
          {seo.title && <meta property="og:title" content={seo.title} />}
        
          {seo.description && (
            <meta property="og:description" content={maxLength(seo.description, 200)} />
          )}
          
          {seo.image && <meta property="og:image" content={seo.image} />}
        
          <meta property="og:site_name" content={defaultTitle} />
        
          <link rel="apple-touch-icon" sizes="180x180" href={apple_touch_icon} />
          <link rel="icon" type="image/png" sizes="32x32" href={favicon_32x32} />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon_32x32} />
          <link rel="manifest" href={favicon_32x32} />
          <link rel="mask-icon" href={safari_pinned_tab} color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />

        </Helmet>
          
      )}}
  />
)

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathName: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathName: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl

      }
    }
  }
`