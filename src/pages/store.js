import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import ArtImage from '../components/ArtImgae/ArtImage'
import { kebabCase } from 'lodash'
import HeaderMeta from '../components/Helmet/Helmet.js'
import Header from '../components/Header/Header.js'
import S from './store.module.sass'
import InlineSVG from 'svg-inline-react'
import { sidesSvg } from '../img/svg-index.js'
import Commissions from '../components/Commissions/Commissions.js'
//get all tags and display five items under that tag. Clicking on the tag shows all items

//group all links under their tag and type
import '../../node_modules/typeface-alegreya-sans-sc'
import '../../node_modules/typeface-cinzel'

const ItemList = (props) => {

	return (
		<div className={S.itemList}>
			<span>Sort By</span>
			<h3>{props.title}</h3>
			<ul>
			{props.items.map((item) => {
					// NOTE used to be code here to remove comresial and comission items. Maybe wanted them in anotehr section. I think it's ok to leave them
					return(
						<li key={item.fieldValue}>
							<Link to={`/${props.folder}/${kebabCase(item.fieldValue)}/`}>
							 {item.totalCount} {item.fieldValue} 
							</Link>
						</li>
					)
				})
			}
			</ul>
		</div>
	)
}

const Selected = (props) => (
	<div id={S.selectedHolder}>
		<h2 id={S.selectedTitle}>Personally Selected</h2>
		<div className={S.items}>
			{props.data.map(({ node: item }, i) => {
				const frontmatter = item.frontmatter
				return (
					<div className={S.selectedItem} key={i}>
						<Link to={item.fields.slug}>
							<h3>{frontmatter.title}</h3>
							<ArtImage imageData={frontmatter} fixed={frontmatter.featuredImage.childImageSharp.fixed} />
						</Link>
					</div>
				)
			})}
		</div>
	</div>
)

export default class Store extends Component {
	render() {
		const itemData = this.props.data.posts
		const commercialItems = this.props.data.commercial ? this.props.data.commercial.items : null

		return (
			<section id={S.store}>
				<HeaderMeta subTitle="Store" pathName={this.props.location.pathname} />

				
					<Header to={[ 'home', 'index' ]} white={false} />
				

				<div className={S.listHolder}>
					<ItemList items={itemData.tags} folder="category" title="Categories" />

					<ItemList items={itemData.types} folder="mediums" title="Mediums" />
				</div>

				<section id={S.bottomHolder}>
					<div className={S.angleSvgHolder}>
						<InlineSVG src={sidesSvg} />
					</div>
					<div className={S.black}>
						<Commissions>
							{/* ! should display comission items */}
							{commercialItems &&
								<ItemList 
									items={commercialItems} 
									folder="category" 
									title="Commissions & Specialties" 
									showCommissions={true}
								/>
							}
						</Commissions>

						<Selected data={this.props.data.selected.edges} />
					</div>
				</section>
			</section>
		)
	}
}

export const pageQuery = graphql`
query StoreQuery {
  posts: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {
    frontmatter: {is_store_item: {eq: true}, tags: {nin: ["Commercial", "Maps", "Logos", "Commission"] }}
  }) {
    types: group(field: frontmatter___type) {
      fieldValue
      totalCount
    }
    tags: group(field: frontmatter___tags) {
      fieldValue
      totalCount
    }
  }
  selected: allMarkdownRemark(filter: {frontmatter: {is_store_item: {eq: true}, storeHighlight: {eq: true}}}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
					title
					type
					featuredImage {
						childImageSharp {
						  fixed(width: 320, height: 320, cropFocus: CENTER) {
						    ...GatsbyImageSharpFixed_withWebp_noBase64
						  }
						}
					}
        }
      }
    }
  }
  commercial: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {tags: {in: ["Commercial", "Maps", "Logos", "Commission"] }}}) {
    items: group(field: frontmatter___tags) {
      fieldValue
      totalCount
    }
  }
}
`
