import React from 'react';
import Link from 'gatsby-link'
import LogoSides from '../../img/logo-side-left.svg'
import LogoReverse from '../../img/logo-reverse.svg'
import S from './header.module.sass'

//takes a props that is an array of two "to" strings
// these make up the two menu items
//takes a white prop that is true of false

const MenuItem = (props) => (
  <Link to={props.to === "home" ? "/" :`/${props.to}`} 
    key={props.to} 
    className={S.link}
    >
    {props.to === "/" ? "home" : props.to}
  </Link>  
)

const Header = (props) => (
  <section id={S.Header} className={props.id}>
    <div className={S.logoHolder} id={props.white ? S.white : S.black}>
    
      <div className={S.left}>
        <LogoSides />
        <MenuItem to={props.to[0]} />
      </div>

      <div className={S.mainLogo}>
        <LogoReverse id={S.logo}/>
      </div>
      
      <div className={S.right}>
        <LogoSides />
        <MenuItem to={props.to[1]} />
      </div>
      
    </div>

  </section>  
)

export default Header