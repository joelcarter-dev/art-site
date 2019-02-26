import React, {Component} from 'react';
import { graphql } from 'gatsby'
import S from './index-items.module.sass'
import Link from 'gatsby-link'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
import { uniqBy, kebabCase } from 'lodash'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel'

const TopicBrowse = (props) => (
  <div className={S.topicHolder}>
    <h2 onClick={props.setTopic.bind(this, props.title)}>{props.title}</h2>
    
    {props.currentTopic === props.title &&
      <div className={S.topicItems}>
        {props.items.map( i => {
          const title = i.frontmatter.title
          return (
            <div className={S.itemHolder} key={title}>
              <Link to={`archive/${kebabCase(title)}`} className={S.link}> 
                <h3>{title}</h3>
                <p>{i.excerpt}</p>
              </Link>
            </div>
          )
        })}
      </div>
    } 
  
  </div>
)

const BannerMeu = (props) => (
  <section className={S.bannerMenu}>
    {props.groups.length > 6 ? 
      <div className={S.holder}>
        {props.groups.map( i => {
          const totalExcerpts = props.excerpts.filter( (item) => {
            //console.log(i)
            return item.group === i.topicName
          })
          return (
            <div className={S.banner} key={i.topicName} onClick={props.setTopic.bind(this, i.topicName)}>
              <h2>{i.topicName}</h2>
            
              <p>{totalExcerpts[0].items.join(" ")}</p>
            </div>
          )
        })}
      </div>     
      : 
      <div className={S.holder}>
        <div className={S.banner} key="notNow" >
          <h3>The Archive has not yet Opend</h3>
        </div>
      </div>
    }
         
  </section>
)

export default class ArchiveIndex extends Component {
  constructor(props) {
    super(props)
    this.state = { 

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

    this.props.data.AllArchiveItems.edges.map( ({node: item}) => (
      topicArrays.push(item.frontmatter.archive_topic) 
    ))
    
    return uniqBy(Array.prototype.concat.apply([], topicArrays))
  }
    
  render() {
    
    const allItems = this.props.data.AllArchiveItems.edges
    
    let groupedTopics = allItems.reduce((r, {node: item}) => {
      for( let topic of item.frontmatter.archive_topic ) {
        (r[topic] || (r[topic] = [])).push( item )
      }
      return r
    }, {})
    
    let topicGroups = Object.keys( groupedTopics ).reduce( (a, topicName ) => {
        a.push({topicName, items: groupedTopics[topicName]})
        return a
    }, [])
    
    let allExcerptsInGroup = []
    
    let noLoop = 0
    for (var topic in topicGroups) {
      noLoop++
      if (noLoop > 60) {return}
      let topicExcerpts = []
      topicGroups[topic].items.map( i => {
        topicExcerpts.push(i.excerpt)
      })
      allExcerptsInGroup.push( {group: topicGroups[topic].topicName, items: topicExcerpts} )
    }
    
    return (
      <section id={S.Archive} className={this.state.currentTopic === undefined ? S.dark : S.light}>
      
        <HeaderMeta subTitle="Archive" pathName={this.props.location.pathname}/> 
        
        <div className={S.menu}>
          <Header to={["home", "store"]} white={this.state.currentTopic === undefined ? true : false}/>
        </div>
        
        {this.state.currentTopic !== undefined ? (
          <section className={S.topics}>
            {topicGroups.map(i => (
              <TopicBrowse currentTopic={this.state.currentTopic} setTopic={this.setTopic} title={i.topicName} items={i.items} key={i.topicName}/>   
            ))}
          </section>
          ) : (
            <BannerMeu excerpts={allExcerptsInGroup} groups={topicGroups} setTopic={this.setTopic}/>
          )}
        
      </section>  
    )
  }
}

export const pageQuery = graphql`
{
  AllArchiveItems: allMarkdownRemark(filter: {frontmatter: {is_archive_item: {ne: false}}}) {
    edges {
      node {
        id
        fields {
          slug
        }
        excerpt(pruneLength: 100)
        frontmatter {
          title
          tags
          is_archive_item
          archive_topic    
        }
      }
    }
  }
}

`