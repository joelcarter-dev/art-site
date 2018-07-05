// import React from 'react'
// import PropTypes from 'prop-types'
// import { kebabCase } from 'lodash'
// import Helmet from 'react-helmet'
// import Link from 'gatsby-link'
// import Content, { HTMLContent } from '../components/Content'

// export const BlogPostTemplate = ({
//   content,
//   contentComponent,
//   description,
//   tags,
//   title,
//   helmet,
//   featuredImage,
// }) => {
//   const PostContent = contentComponent || Content

//   return (
//     <section className="blog-view">
//       {helmet || ''}

//         <div className="header" style={{backgroundImage: `url(${featuredImage})` }}>
//           <div className="title-holder">
//             <h1 className="title">
//               {title}
//             </h1>
//             <p>{description}</p>
//           </div>
//         </div>
//           <PostContent content={content} className="post-content"/>
//           {tags && tags.length ? (
//             <div style={{ marginTop: `4rem` }}>
//               <h4>Tags</h4>
//               <ul className="taglist">
//                 {tags.map(tag => (
//                   <li key={tag + `tag`}>
//                     <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : null}


//     </section>
//   )
// }

// BlogPostTemplate.propTypes = {
//   content: PropTypes.string.isRequired,
//   contentComponent: PropTypes.func,
//   description: PropTypes.string,
//   title: PropTypes.string,
//   featuredImage: PropTypes.string,
//   helmet: PropTypes.instanceOf(Helmet),
// }

// const BlogPost = ({ data }) => {
//   const { markdownRemark: post } = data

//   return (
//     <BlogPostTemplate
//       content={post.html}
//       contentComponent={HTMLContent}
//       description={post.frontmatter.description}
//       helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
//       tags={post.frontmatter.tags}
//       title={post.frontmatter.title}
//       featuredImage={post.frontmatter.featuredImage}
//     />
//   )
// }

// BlogPost.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.object,
//   }),
// }

// export default BlogPost

// export const pageQuery = graphql`
//   query BlogPostByID($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       id
//       html
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         title
//         description
//         tags
//         featuredImage
//       }
//     }
//   }
// `
