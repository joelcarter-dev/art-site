import React, {Component} from 'react';
import { graphql } from 'gatsby'
import S from './index-items.module.sass'
//import Img from 'gatsby-image'
import Link from 'gatsby-link'
import Header from '../components/Header/Header.js'
import HeaderMeta from '../components/Helmet/Helmet.js'
//import Order from '../components/Order/Order.js'
import { groupBy, uniqBy } from 'lodash'

import 'typeface-alegreya-sans-sc'

const Topic = (props) => (
  <div className={S.topicHolder}>
    <h2>{props.title}</h2>
    
    <div className={S.items}>
      {props.items.map( i => (
        <div className={S.itemHolder}>
          <Link to={`archive/${props.title}`}> 
            <h3>{props.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  
  </div>
)



export default class ArchiveIndex extends Component {
  constructor(props) {
    super(props)
    this.state = { 
     //topics: this.setTopics()
    }
  }
  
  // for(var o in dataObject) {
  //   dataArray.push(dataObject[o]);
  // }
  
  // setTopics = () => {
  //   let posts = []
  //   this.props.data.AllArciveItems.edges.map( ({node: item }, i) => {
  //     posts.push(item)
  //   })
  //   let topic = uniqBy(posts, (i)=> {return i.frontmatter.arcive_topic})
  //   console.log(topic)
  //   console.log(posts)
  //   return topic
  // }

  
  render() {
    
    let topicArrays = []
    let topicGroups = []
    
    this.props.data.AllArciveItems.edges.map( ({node: item}) => (
      topicArrays.push(item.frontmatter.arcive_topic)
    ))
    
    const allTopics = uniqBy(Array.prototype.concat.apply([], topicArrays))
    
    
    for (var i = 0; i < allTopics.length; i++)  {
      topicGroups.push( {topicName: allTopics[i], items: []} )
    }
    
    const allItems = this.props.data.AllArciveItems.edges
    
    for (var i = 0; i < allItems.length; i++) {
      
      let item = allItems[i]
      item.node.frontmatter.arcive_topic.map( i => {
        console.log(i)
        if (topicArrays.indexOf(i) ) {

          let group = topicGroups.find(x => x.topicName === i)
          group.items.push(item.node)

        }
      })
 
    }
    
    console.log(topicGroups)
    

    
    // let allGroupedItems = []
    
    // for(var item in allTopics) {
    //   const topicGroup = {
    //     topic: item
    //   }
    //   allGroupedItems.push(topicGroup)
    // }
    
    // console.log(`allGroupedItems with group objects looks like: ${allGroupedItems}`)
    
    // for (var i = 0; i < allItems.length; i++) {
    //   let itemsTopics = allItems[i].node.frontmatter.arcive_topic
    //   const item = allItems[i]
      
    //   for (var i = 0; i < itemsTopics.length; i++) {
    //     let currentItemTopic = itemsTopics[i]
    //     allTopics.map( (topic) => {
    //       if (currentItemTopic === topic) {
    //         console.log(currentItemTopic, topic)
    //         allGroupedItems.push(item)
    //       }
    //     })

    //   }
    //   //allItems[i]
    // }
   
    //  console.log(`allGroupedItems with items added looks like: ${allGroupedItems}`)
   
    //const allGroupedItems = groupBy(allItems, 'node.frontmatter.arcive_topic[0]' )
   
    // const allGroupedItems = allItems.reduce((r, v) => {
    //   v.node.frontmatter.arcive_topic.map( (item, i) => {
    //     let k = item[i]
    //     (r[k] || (r[k] = [])).push(v)
    //   })
    //   // (r[k] || (r[k] = [])).push(v)
    //   return r
    // }, {})

   //allItems.groupBy("node.frontmatter.arcive_topic")
    //console.log(allGroupedItems)
    
    return (
      <section id={S.Archive}>
        <HeaderMeta pageTitle="Archive"/> 
        <div className={S.menu}>
          <Header to={["home", "store"]} white={false}/>
        </div>
        
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
