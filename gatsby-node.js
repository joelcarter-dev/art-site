const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')


//for SSR load a dud module on build html for paypal module as it uses window  
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /paypal-checkout/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      AllStoreItems: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {isarciveitem: {ne: true}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              isarciveitem
              title
              about
              artistNotes
              price
              info
              tags
              original
              type
              templateKey
              featuredImage {
                childImageSharp {
                  fluid(maxHeight: 1000) {
                    src
                    sizes
                    srcSet
                    srcWebp
                    srcSetWebp
                    aspectRatio
                  }
                }
              }
            }
          }
        }
      }
      AllArciveItems: allMarkdownRemark(filter: {frontmatter: {isarciveitem: {ne: false}}}) {
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
              type
              storeHighlight
              isarciveitem
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

    const allStorePosts = result.data.AllStoreItems.edges

    const allArciveItems = result.data.AllArciveItems.edges
    
    function createPagesFromData(data, template, pathName) {
      data.forEach(edge => {
        const id = edge.node.id
        const node = edge.node
        createPage({
          path: `${pathName}/${edge.node.frontmatter.title}`,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(
            `src/templates/${template}`
          ),
          // additional data can be passed via context
          context: {
            id,
            node,
          },
      })
    })
  }
    
    createPagesFromData(allStorePosts, "art-pice.js", "store-items")
    
    createPagesFromData(allArciveItems, "arcive.js", "arcive")

    // //create page for each art item
    // allStorePosts.forEach(edge => {
    //   const id = edge.node.id
    //   const node = edge.node
    //   createPage({
    //     path: edge.node.fields.slug,
    //     tags: edge.node.frontmatter.tags,
    //     component: path.resolve(
    //       `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
    //     ),
    //     // additional data can be passed via context
    //     context: {
    //       id,
    //       node,
    //     },
    //   })
    // })
    
    // //create page for each Arcive item
    // allArciveItems.forEach(edge => {
    //   const id = edge.node.id
    //   const node = edge.node
    //   createPage({
    //     path: `Arcive/${edge.node.frontmatter.title}`,
    //     tags: edge.node.frontmatter.tags,
    //     component: path.resolve(
    //       `src/templates/arcive-item.js`
    //     ),
    //     // additional data can be passed via context
    //     context: {
    //       id,
    //       node,
    //     },
    //   })
    // })

   //  // Tag pages:
   //  let tags = []
   //  // Iterate through each post, putting all found tags into `tags`
   //  allStorePosts.forEach(edge => {
   //    if (_.get(edge, `node.frontmatter.tags`)) {
   //      tags = tags.concat(edge.node.frontmatter.tags)
   //    }
   //  })
   //  // Eliminate duplicate tags
   //  tags = _.uniq(tags)

   //  // Make tag pages
   //  tags.forEach(tag => {
   //    const tagPath = `/cat/${_.kebabCase(tag)}/`

   //    createPage({
   //      path: tagPath,
   //      component: path.resolve(`src/templates/tags.js`),
   //      context: {
   //        tag,
   //      },
   //    })
   //  })
  
  
   // // Tag pages:
   //  let types = []
   //  // Iterate through each post, putting all found tags into `tags`
   //  allStorePosts.forEach(edge => {
   //    if (_.get(edge, `node.frontmatter.type`)) {
   //      types = types.concat(edge.node.frontmatter.type)
   //    }
   //  })
   //  // Eliminate duplicate tags
   //  types = _.uniq(types)
   //  // Make tag pages
   //  types.forEach(type => {
   //    const typePath = `/mediums/${_.kebabCase(type)}/`

   //    createPage({
   //      path: typePath,
   //      component: path.resolve(`src/templates/mediums.js`),
   //      context: {
   //        type,
   //      },
   //    })
   //  })
    
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