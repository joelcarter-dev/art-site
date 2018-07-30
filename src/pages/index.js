import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Landing/Header'

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <section id="landing">
        <Header />

      </section>
    )
  }
  
}


IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
query IndexQuery {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
    edges {
      node {
        id
        frontmatter {
          title
          description
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