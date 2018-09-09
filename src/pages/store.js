import React, {Component} from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { uniqBy } from 'lodash'
import Link from 'gatsby-link'
//get all tags and display five items under that tag. Clicking on the tag shows all items

//group all links under their tag and type

const CategoryList = (props) => {
  return (
  <div className="categoryList">
    <h3 className="title">{props.data.type}</h3>
    <ul>
      {props.data.items.map( (item, i)=> (
        <li key={i}>
          <Link to={item.fields.slug}>
            {item.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>  
  )
}

export default class Store extends Component {
  constructor(props) {
   super(props)
   this.state = {
     itemCategorys: this.setData(),
   } 
  }
  
  setData = () => {
    let items = []
    this.props.data.allMarkdownRemark.edges
      .map( ({node: item }) => {
        let category = item.frontmatter.type
        items.push({
          type: category,
          items: []
        })
      })
      
    let categorys = uniqBy(items, (i) => (i.type))

    categorys.map( (i) => {
      let posts = this.props.data.allMarkdownRemark.edges
      let item = i 
      posts.forEach( (i) => {
        if (i.node.frontmatter.type === item.type) {
          item.items.push(i.node)
        }
      })
      
    })

    return categorys
  }
    
  render() {
    return (
      <section id="catergories-holder">
      
        {this.state.itemCategorys.map( (item, i) => (
          <CategoryList data={item} key={i}/>
        ))}
    
      </section>
    )
  }
}

Store.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

//maybe we only want the links and names of the arts here. It is just a link hub thus far

export const pageQuery = graphql`
query ArtFeedQuery {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          tags
          type
        }
      }
    }
  }
}
`