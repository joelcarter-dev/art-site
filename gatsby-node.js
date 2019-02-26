const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

//for SSR load a dud module on build html for paypal module as it uses .window  
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
  AllStoreItems: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {is_store_item: {eq: true}}}) {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          is_store_item
          is_archive_item
          title
          about
          artistNotes
          price
          info
          tags
          original
          type
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
  AllArchiveItems: allMarkdownRemark(filter: {frontmatter: {is_archive_item: {eq: true}}}) {
    edges {
      node {
        id
        fields {
          slug
        }
        html
        excerpt(pruneLength: 200)
        frontmatter {
          title
          tags
          type
          about
          is_archive_item
          is_store_item
          archive_topic
          featuredImage {
            childImageSharp {
              fluid(maxHeight: 1500) {
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
}
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    
    function createPagesFromData(data, template, pathName) {
      data.forEach(edge => {
        const id = edge.node.id
        const node = edge.node
        createPage({
          path: `${pathName}/${_.kebabCase(edge.node.frontmatter.title)}`,
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
    
    const allStorePosts = result.data.AllStoreItems.edges

    const allArchiveItems = result.data.AllArchiveItems.edges
    
    
    // NOTE I could rig up these pages to work like the others, but I would be looping a lot
    // of data on build time in this file. Docs say template querys are fast, so I'll let gatsby do
    // the work here
     
    let allCategorys = []
    allStorePosts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        allCategorys = allCategorys.concat(edge.node.frontmatter.tags)
      }
    })
    allCategorys = _.uniq(allCategorys)
    
    allCategorys.forEach(category => {
      const tagPath = `/category/${_.kebabCase(category)}/`
      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/categorys.js`),
        context: {
          category,
        },
      })
    })
  
    let allMediums = []
    allStorePosts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.type`) && edge.node.frontmatter.is_store_item === true ) {
        allMediums = allMediums.concat(edge.node.frontmatter.type)
      }
    })
    allMediums = _.uniq(allMediums)
    
    allMediums.forEach(medium => {
      const typePath = `/mediums/${_.kebabCase(medium)}/`

      createPage({
        path: typePath,
        component: path.resolve(`src/templates/mediums.js`),
        context: {
          medium,
        },
      })
    })
    
    createPagesFromData(allStorePosts, "art-pice.js", "store-items")
    
    createPagesFromData(allArchiveItems, "archive-item.js", "archive")

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