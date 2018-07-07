import React from 'react'
import PropTypes from 'prop-types'
import ArtPosts from '../components/ArtPosts.js'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    return (
      <section id="home">
        
        <ArtPosts postData={data.allMarkdownRemark}/>
    
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

// export const pageQuery = graphql`
// query IndexQuery {
//   allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
//     edges {
//       node {
//         id
//         frontmatter {
//           title
//           description
//           price
//           info
//           tags
//           featuredImage {
//             childImageSharp {
//               sizes(maxWidth: 1000 maxHeight: 500) {
//                 base64
//                 aspectRatio
//                 src
//                 srcSet
//                 sizes
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `