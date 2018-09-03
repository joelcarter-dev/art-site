// src/components/Header.js
import React from "react"
import { StaticQuery, graphql } from "gatsby"

export const PureHeader = ({ data }) => (
  <header>
    <h1>{data.site.siteMetadata.title} is the site title</h1>
  </header>
)

export const Header = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <PureHeader data={data} {...props} />}
  />
)

export default Header

// import React, { Component, PropTypes } from 'react';

// import _, {clamp} from 'lodash'

// import headerImage from '../../img/DSC05916.jpg'

// import SvgLogo from '../../img/logo.svg'
   
// let offsetTop = 0
   
// export class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.state= {
//       offsetTop: 0
//     }
//   }
  
//   handleScroll = () => {
//     let offsetTop = this.elNode.getBoundingClientRect().top 
//      //offsetTop = _.clamp(offsetTop, -40, 0)
//      // want angle to go from 0 to 12 (left) and -12 (right) on scroll down, and
//      //revurse on scroll back up
//     this.setState({offsetTop: offsetTop})
//     console.log(offsetTop,  this.elNode.getBoundingClientRect().top)
//   }
  
//   componentDidMount() {
//     window.addEventListener('scroll', this.handleScroll);
//   }
  
//   componentWillUnmount() {
//     window.removeEventListener('scroll', this.handleScroll);
//   }
  
//   render() {
//     const { data } = this.props
//     return (
      
//       <section id="landing-header">
//         <div className="red"></div>

//       </section>
//     )
//   }
  
// }

// export default Header
