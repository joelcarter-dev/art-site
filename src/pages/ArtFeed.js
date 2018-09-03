import React, {Component} from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import ArtPosts from '../components/ArtFeed/ArtPosts.js'

export default class ArtFeed extends Component {
  render() {
    const { data } = this.props
    return (
      <section id="art-feed-holder">
        
        <ArtPosts postData={data.allMarkdownRemark}/>
    
      </section>
    )
  }
}

ArtFeed.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
query ArtFeedQuery {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
    edges {
      node {
        id
        frontmatter {
          title
          about
          price
          info
          tags
          featuredImage {
            childImageSharp {
              resolutions(width: 400) {
                width
                height
                src
                srcSet
              }
            }
          }
        }
      }
    }
  }
}
`