import React from 'react';
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
// import ArtPosts from '../components/ArtFeed/ArtPosts'

const CartPage = (props) => {
  console.log(props)
  return (
    <section id="cart">
      {/*!props.data &&
        <div className="emptyCart">
          Looks like your cart is empty
        </div>
      }
    
    
      {props.data &&
        <ArtPosts postData={data.allMarkdownRemark}/>
      */}
    </section>  
  )
}

CartPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default CartPage

/*images of the saved cart items need to get to this page somehow. I can:
  Pass them through local storage
  Cache them with a service workiner
  Query every art item image in the site with graphql
*/
export const pageQuery = graphql`
query CartQuery {
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