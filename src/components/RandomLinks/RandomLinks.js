import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Link from 'gatsby-link'
import S from './randomLinks.module.sass'

const RandomLinks = () => {
  const data = useStaticQuery(graphql`
      query RandomItems {
        allMarkdownRemark(skip: 9, limit: 15) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  // Shuffle array
  const shuffled = data.allMarkdownRemark.edges.sort(() => 0.5 - Math.random())
      
  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, 3)
  return (
    <div className={S.holder}>
      <h2>
        {selected.map( i => (
          <Link to={`${i.node.fields.slug}`} key={i.node.frontmatter.title}>
            {i.node.frontmatter.title}
          </Link>
        ))}
      </h2>
    </div>
  )
}
  
export default RandomLinks
