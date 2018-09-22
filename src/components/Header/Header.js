import React from 'react';
import Link from 'gatsby-link'

const menuItems = [
  "store",
  "cart",
  "/"
]

const Header = (props) => (
  <section id={props.id}>
    {menuItems.map( (item) => {
      if (props.currentPage !== item) {
        return (
          <Link to={item === "/" ? item :`/${item}`} 
            key={item} className="headerItem">
            {item === "/" ? "home" : item}
          </Link>
        )
      }
    })}
  </section>  
)

export default Header