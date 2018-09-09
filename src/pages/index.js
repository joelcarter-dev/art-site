import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import './main.sass'
import st from './index.module.sass'

import Indented from '../img/indented.svg'
import Logo from '../img/logo.svg'

export default class IndexPage extends Component {
  render() {
    return (
      <section id={st.landing }>
        <div className={st.heroHolder}>
          <Logo className={st.logoSvg} />
        </div>
        
        <div id={st.section2}>
          <div className={st.indentedHolder}>
            <Indented className={st.indentedSvg} />
          </div>
          
        </div>
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
        fields {
          slug
        }
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