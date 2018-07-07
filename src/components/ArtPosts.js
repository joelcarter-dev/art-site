import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Img from 'gatsby-image'

const ArtItem = (props) => {
  let post = props.data.itemData.node.frontmatter
  let imageData = post.featuredImage.childImageSharp.resolutions
  
  const open = {width: "100%", height: imageData.height + 60}
  
  const closed = {width: imageData.width, height: imageData.height}
  
  return (
    <div 
      className={props.data.viewOpen ? "item-view-open" : "item-view-closed"} key={post.id}
      onClick={props.selectItem}
      style={props.data.viewOpen ? open : closed}
    >
      
      {/*<Img sizes={post.featuredImage.childImageSharp.sizes} className="thum"/>
      <Img resolutions={imageData} className={"thumb"}/> */}
      
      <div className="image-holder">
        {/*<Img sizes={post.featuredImage.childImageSharp.sizes} />*/}
        <Img 
          resolutions={post.featuredImage.childImageSharp.resolutions}
        />
      </div>
          
      <div className="sidebar">
        <h2 className="title">
          {post.title}
        </h2>
        
        <h3>{post.price}</h3>
        
        <p className="desc">
          {post.description}
        </p>
        
        <small>{post.info}</small>
        
        <ul>
          {post.tags.map( (tag, idx) => (
            <li key={idx}>{tag}</li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}

export class ArtPosts extends Component {
  constructor(props) {
    super(props)
    this.selectItem = this.selectItem.bind(this)
    
    let items = []
    for (var i = 0; i < this.props.postData.edges.length; i++) {
      items.unshift({
        itemData: this.props.postData.edges[i],
        viewOpen: false
      })
    }
    
    this.state = {
      items: items
    }
  }
  
  selectItem(idx) {    
    let state = this.state.items
    this.state.items.forEach( (i) => {
      i.viewOpen = false
    })
    state[idx].viewOpen = !state[idx].viewOpen

    this.setState({ items: state});
  }
  
  render() {
    return (
      <section id="art-feed">
        {this.state.items
          .map((post, idx) => (
            <ArtItem 
              data={post} 
              key={idx}
              selectItem={this.selectItem.bind(this, idx)}
            />
          ))}
      </section>
    );
  }
}

export default ArtPosts