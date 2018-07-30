import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArtView from './ArtView'

import Img from 'gatsby-image'

export class ArtPosts extends Component {
  constructor(props) {
    super(props)
    this.selectItem = this.selectItem.bind(this)
    
    this.state = {
      items: this.getItems(),
      selectedItem: null
    }
  }
  
  getItems = () => {
    let items = this.props.postData.edges
    items.forEach( (i)=> {
      i.viewOpen = false
    })
    return items
  }
  
  selectItem(idx) {
    let items = this.state.items
    items.forEach( (i)=> {
      i.viewOpen = false
    })
    items[idx].viewOpen = true
    this.setState({ items: items});
  }

  render() {
    return (
      <section id="art-feed">
        
        {this.state.items.map((post, idx) => (
          <ArtView
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