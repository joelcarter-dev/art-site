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
      allMarkdownRemark {
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
              original
              type
              templateKey
              
              featuredImage {
                
                childImageSharp {
                  fluid(maxHeight: 1000) {
                    src
                    srcSet
                    sizes
                    base64
                    aspectRatio
                    
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

    //create page for each art item
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
      const tagPath = `/cat/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  
  
   // Tag pages:
    let types = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.type`)) {
        types = types.concat(edge.node.frontmatter.type)
      }
    })
    // Eliminate duplicate tags
    types = _.uniq(types)
    // Make tag pages
    types.forEach(type => {
      const typePath = `/mediums/${_.kebabCase(type)}/`

      createPage({
        path: typePath,
        component: path.resolve(`src/templates/mediums.js`),
        context: {
          type,
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