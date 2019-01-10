import React, {Component} from 'react';
import { graphql } from 'gatsby'
import S from './index-items.module.sass'
import Link from 'gatsby-link'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import { groupBy, uniqBy } from 'lodash'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel'

const Topic = (props) => (
  <div className={S.topicHolder}>
    <h2 onClick={props.setTopic.bind(this, props.title)}>{props.title}</h2>
    
    <div className={S.items}>
      {props.items.map( i => {
        const title = i.frontmatter.title
        return (
          <div className={S.itemHolder} key={title}>
            <Link to={`archive/${title}`} className={S.link}> 
              <h3>{title}</h3>
            </Link>
          </div>
        )
      })}
    </div>
  
  </div>
)

export default class ArchiveIndex extends Component {
  constructor(props) {
    super(props)
    this.state = { 
     // allTopics: this.allTopics()
    }
  }
  
  setTopic = (i) => {
    const allTopics = this.allTopics()
    const index = allTopics.indexOf(i)
    this.setState({currentTopic: allTopics[index]})
  }
  
  componentDidMount() {
    this.setTopic(0)
  }
  
  allTopics = () => {
    let topicArrays = []

    this.props.data.AllArciveItems.edges.map( ({node: item}) => (
      topicArrays.push(item.frontmatter.arcive_topic)
    ))
    
    return uniqBy(Array.prototype.concat.apply([], topicArrays))
  }
  
  render() {
    
    let groupedTopics = this.props.data.AllArciveItems.edges.reduce((r, {node: item}) => {
      for( let topic of item.frontmatter.arcive_topic ) {
        (r[topic] || (r[topic] = [])).push( item )
      }
      return r
    }, {})
    
    let topicGroups = Object.keys( groupedTopics ).reduce( (a, topicName ) => {
        a.push({topicName, items: groupedTopics[topicName]})
        return a
    }, [])

    return (
      <section id={S.Archive}>
        <HeaderMeta pageTitle="Archive"/> 
        <div className={S.menu}>
          <Header to={["home", "store"]} white={false}/>
        </div>
        
        {this.state.currentTopic != undefined ? (
          <section className={S.topics}>
            {topicGroups.map(i => (
              <Topic setTopic={this.setTopic} title={i.topicName} items={i.items} key={i.topicName}/>   
            ))}
          </section>
          ) : (
            <section className={S.topicsUnselected}>
            
            </section>
          )}
        
      </section>  
    )
  }
}

export const pageQuery = graphql`
  {
   AllArciveItems: allMarkdownRemark(filter: {frontmatter: {is_archive_item: {ne: false}}}) {
      edges {
        node {
          id
          fields {
            slug
          }
          html
          frontmatter {
            title
            tags
            is_archive_item
            arcive_topic
          }
        }
      }
    }
  }
`