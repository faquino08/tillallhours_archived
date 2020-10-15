/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const fetch = require(`node-fetch`)
const fs = require("fs")
const path = require("path")

exports.sourceNodes = async ({ 
    actions: { createNode },
    createContentDigest,
}) => {
    const result = await fetch(
      `http://cms.quoainfrank.com/tillallhours/items/testproduct`,
      { headers: { Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu" } }
    )
}

/** exports.createPages = async ({ actions: { createPage } }) => {
    const allProducts = ['candle 1', 'candle 2 large', 'candle 2 small'];
    
    allProducts.forEach((product) => {
        createPage({
            path: `/products/${product}/`,
            component: require.resolve('./src/templates/productTemplate.jsx'),
            context: { product },
        });
    });
}; **/

exports.onPostBuild = async ({ graphql }) => {
    await graphql(`
      {
        allProduct(filter: {status: {eq: "published"}}) {
          edges {
            node {
              id
              slug
              collection
            }
          }
        }
        allPriceTable {
          edges {
            node {
              price
              size
            }
          }
        }
        allSizes {
          edges {
            node {
              id
              name
              size
            }
          }
        }
        allCollections {
          edges {
            node {
              name
              available_vessel_color
              scents {
                id
              }
              sizes {
                id
              }
              id
            }
          }
        }
      }
    `).then(result => {
      const productsPath = "./public/products"

      const products = result.data.allProduct.edges.map(({ node }) => node)

      if (!fs.existsSync(productsPath)) fs.mkdirSync(productsPath)

      products.map(product => {
        productPrice = printPriceJson(result.data, product)
        const data = {
          ...product,
          slug: product["slug"],
          price: productPrice,
          url: `http://05dbc1cc038e.ngrok.io/products/${product["slug"]}.json`,
        }
        fs.writeFileSync(
          `${productsPath}/${data.slug}.json`,
          JSON.stringify(data)
        )
      })
    })
}

function printPriceJson(data, product) {
  const listPrices = []
  for (var i = 0; i < Object.size(data.allCollections.edges); i++) {
    if (product.collection === data.allCollections.edges[i].node.id) {
      data.allPriceTable.edges.map(price => {
        for ( var j = 0; j < data.allCollections.edges[i].node.sizes.length; j++ ) {
          if ( price.node.size === data.allCollections.edges[i].node.sizes[j].id ) {
            listPrices.push(price.node.price)
          }
        }
      })
    }
  }
  listPrices.sort()
  console.log(`ListPrices: ${product.slug}:` + listPrices)
  price = listPrices[0]
  return price
}

Object.size = function(obj) {
  var size = 0,
    key
  for (key in obj) {
    if (Object.hasOwnProperty.bind(obj)(key)) size++
  }
  return size
}