import React, { Component } from 'react'
import HeaderMeta from '../components/Helmet/Helmet.js'
import Header from '../components/Header/Header.js'
// import Footer from '../components/Footer/Footer'
import Link from 'gatsby-link'
import BackButton from '../components/BackButton/BackButton.js'
import Order from '../components/Order/Order.js'
import { kebabCase } from 'lodash'
import ArtImage from '../components/ArtImgae/ArtImage'
import S from './art-pice.module.sass'
import { useZoneAndBufferData } from '../hooks/zoneAndBufferData.js'
import showdown from 'showdown'

import '../../node_modules/typeface-alegreya-sans-sc'
import '../../node_modules/typeface-lora'
import '../../node_modules/typeface-cinzel'

function GetBufferData(props) {
  const bufferData = useZoneAndBufferData().globalItemBuffer
  return (
    <Price bufferData={bufferData} data={props.data}/>
  )
}

const Price = (props) => {
  const price = Number(props.data.price.replace(/[^0-9.-]+/g,""))
  console.log("buffer " + props.bufferData)
  console.log("original price " + price)

  const totalPrice = price + props.bufferData
  console.log("total price " + totalPrice);

  if(props.data.price === "sold" || props.data.price === "SOLD") {
    return (
      <div className={S.price}>
        <h3 style={{textTransform: "uppercase", fontFamily: "cinzel",  fontSize: "0.7em"}}>{totalPrice}</h3> 
      </div> 
    )
  } else if(props.data.tags.includes("Commission")) {
    return (
      <div className={S.price}>
        <h3 style={{textTransform: "capitalize", fontFamily: "cinzel", fontSize: "0.7em"}}>Commissioned Piece</h3>  
      </div> 
    )
  } else if(props.data.tags.includes("archived") || props.data.tags.includes("Archived")) {
    return (
      <div className={S.price}>
        <h3 style={{textTransform: "capitalize", fontFamily: "cinzel", fontSize: "0.7em"}}>Archived Piece</h3>  
      </div> 
    )
  } else {
    return (
      <div className={S.price}>
        {/* // TODO convert to numbers and add the properly, almost there */}
        <h3>${totalPrice}</h3>
        <span>NZD</span>    
      </div> 
    )
  }
}

const Info = (props) => {
  const archiveSlug = `/archive/${kebabCase(props.data.title)}`
  return (
    <div className={S.infoHolder}>
      <div className={S.priceHolder}>
        {/* <Price data={props.data}/> */}
        <GetBufferData data={props.data} />
      </div>
      <ul className={S.dataList}>
        <li><p>{props.data.original ? "original work" : "print"}</p></li>    

        <li style={{textTransform: "none"}}> <p>{props.data.info} </p></li>
      </ul>

      <ul className={S.dataList}>
        {
          props.data.type.map(i => (
          <li style={{padding: "none"}} key={i}> <i>{i}</i> </li>
        ))}
      </ul>
    
          <div className={S.buttonHolder}>

            {props.data.is_store_item && 
            props.data.price !== "SOLD" &&
            props.data.price !== "sold" &&
            !props.data.tags.includes("Archive") &&
            !props.data.tags.includes("Archived") &&
            !props.data.tags.includes("Commission") &&
          
              <button 
                onClick={props.toggleForm}
                className={S.artItemButton}
              >
                <span>Place Order</span>
              </button> 
            }
            
            {props.data.is_archive_item &&
              <button className={S.artItemButton}>
                <Link to = {archiveSlug}  className={S.storeLink} >
                  View In Archive
                </Link>
              </button> 
            }

            {props.data.is_store_item &&
              props.data.price === "SOLD" ||
              props.data.price === "sold" ||
              
              props.data.tags.includes("Archive") ||
              props.data.tags.includes("Archived") &&
              <button className={S.artItemButton}>
                <Link  to="/make-offer" state={{ itemInfo: [props.data]}}  className={S.storeLink} >
                  Make An Offer
                </Link>
              </button> 
            }

          </div>
    </div>
  )
}

const Notes = (props) => {
  const converter = new showdown.Converter()
  return (
    <div className={S.notesHolder}>
    {/* is it 's or s*/}
    <h3>Artists Notes</h3>
    <div className={S.notes}>
      <div className={S.notes} dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.data) || "Notes are yet to come" }} />
    </div>
  </div>  
  )
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      view: "info"
    }
  }
  
  toggleView = (i)=> {
    this.setState({view: i})
  }
  
  render() {
  
    return (
      <div id={S.Sidebar}>
        <div id={S.infoMenu}>
          <span role="button" tabIndex="0" onClick={this.toggleView.bind(this, "info")} onKeyDown={this.toggleView.bind(this, "info")} className={this.state.view === "info" ? S.selected : ""}>Info</span>
          <span role="button" tabIndex="0" onClick={this.toggleView.bind(this, "notes")} onKeyDown={this.toggleView.bind(this, "notes")} className={this.state.view === "notes" ? S.selected : ""}>Notes</span>
        </div>
        
        {this.state.view === "info" && <Info data={this.props.data} toggleForm={this.props.toggleForm}/>}
        {this.state.view === "notes" && <Notes data={this.props.data.artistNotes}/>}
        
      </div>  
    )
  }
}

class ArtPice extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      orderFormHidden: true,
    }
  }

  toggleForm = () => {
    this.setState({orderFormHidden: !this.state.orderFormHidden})
  }
  
  render() {
        
    const itemData = this.props.pageContext.node.frontmatter

    return (
      <>
      <section className={S.artItemHolder}>
      
        <HeaderMeta 
          itemData={itemData} 
          subTitle={itemData.title}
          description={`${itemData.about} ${itemData.artistNotes}`} 
          pathName={this.props.location.pathname}
        />
        
        <Order 
          hidden={this.state.orderFormHidden} 
          toggleForm={this.toggleForm}
          orderData={[this.props.pageContext.node]}
        />
        
        <div className={S.artPiceHeader}>
          <Header to={["home", "index"]} white={true} />
        </div>

        <BackButton />
        
        <h1 id={S.title}>{itemData.title}</h1>
        

        {this.state.orderFormHidden && <div className={S.left}>
          <Sidebar data={itemData} toggleForm={this.toggleForm}/>
        </div>
        }

        {this.state.orderFormHidden && <div className={S.imageHolder}>
          <ArtImage imageData={itemData} className={S.innerImage} critical={true} fluid={itemData.featuredImage.childImageSharp.fluid}/>  
          </div>
        }
        <div className={S.right}></div>
        
      </section>
      {/* <Footer backgroundWhite={false}/>   */}
      </>
    )
  }
}

export default ArtPice
