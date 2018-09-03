const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              about
              artistNotes
              price
              info
              tags
              templateKey
              
              featuredImage {
                childImageSharp {
                  sizes(maxWidth: 1000 maxHeight: 500) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                    srcWebp
                    srcSetWebp
                  }
                }
              }
        
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      const node = edge.node
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          node,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// const _ = require('lodash')
// const path = require('path')
// const { createFilePath } = require('gatsby-source-filesystem')

// // exports.modifyWebpackConfig = ({ config, stage }) => {
// //   return config.merge({
// //     resolve: {
// //       alias: {
// //         'react': __dirname + '/node_modules/gatsby/node_modules/react',
// //       }
// //     }
// //   })
// // };

// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions

//   return graphql(`
//     {
//       allMarkdownRemark(limit: 1000) {
//         edges {
//           node {
//             id
//             fields {
//               slug
//             }
//             frontmatter {
//               tags
//             }
//           }
//         }
//       }
//     }
//   `).then(result => {
//     if (result.errors) {
//       result.errors.forEach(e => console.error(e.toString()))
//       return Promise.reject(result.errors)
//     }

//     const posts = result.data.allMarkdownRemark.edges

//     // posts.forEach(edge => {
//     //   const id = edge.node.id
//     //   createPage({
//     //     path: edge.node.fields.slug,
//     //     tags: edge.node.frontmatter.tags,
//     //     component: path.resolve(
//     //       `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
//     //     ),
//     //     // additional data can be passed via context
//     //     context: {
//     //       id,
//     //     },
//     //   })
//     // })

//     // Tag pages:
//     let tags = []
//     // Iterate through each post, putting all found tags into `tags`
//     posts.forEach(edge => {
//       if (_.get(edge, `node.frontmatter.tags`)) {
//         tags = tags.concat(edge.node.frontmatter.tags)
//       }
//     })
//     // Eliminate duplicate tags
//     tags = _.uniq(tags)

//     // Make tag pages
//     tags.forEach(tag => {
//       const tagPath = `/tags/${_.kebabCase(tag)}/`

//       // createPage({
//       //   path: tagPath,
//       //   component: path.resolve(`src/templates/tags.js`),
//       //   context: {
//       //     tag,
//       //   },
//       // })
//     })
//   })
// }

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }