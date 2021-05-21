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

const activeEnv = 
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `.env.${activeEnv}`,
});

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

/*exports.onPostBuild = async ({ graphql }) => {
    await graphql(`
      {
        allProduct(filter: { status: { eq: "published" } }) {
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
                scent
              }
              sizes {
                sizes_id {
                  id
                  weight
                }
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
        productWeight = printWeightJson(result.data, product)
        const data = {
          ...product,
          slug: product["slug"],
          price: productPrice,
          url: `https://tillallhours.nicmaiarana.workers.dev/products/${product["slug"]}.json`,
          dimensions: {
            weight: productWeight,
          }
        }
        fs.writeFileSync(
          `${productsPath}/${data.slug}.json`,
          JSON.stringify(data)
        )
      })
    })
}*/

exports.onPostBuild = async ({ graphql }) => {
  const data = await graphql(`
    query {
      allProduct(filter: { status: { eq: "published" } }) {
        nodes {
          id
          slug
          name
          description
          featured
          collection
          category
          recommended_scent
          label_color
        }
      }
      allCollections {
        edges {
          node {
            name
            available_vessel_color
            scents {
              scent
            }
            sizes {
              sizes_id {
                id
                weight
              }
            }
            id
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
      allGenericProductImages {
        edges {
          node {
            id
            name
            vessel_color
            size {
              id
            }
            collections {
              collections_id
            }
            position
          }
        }
      }
      allAlternativeProductImages {
        edges {
          node {
            id
            related_product
            size
            color
          }
        }
      }
    }
  `)

  function printSizes(data, indexArray) {
    let sizeArr = []
    switch (indexArray) {
      case 1:
        sizeArr.push(data.allSizes.edges[0].node.size)
        break
      case 2:
        sizeArr.push(data.allSizes.edges[1].node.size)
        break
      case 3:
        sizeArr.push(data.allSizes.edges[2].node.size)
        break
      case 4:
        sizeArr.push(data.allSizes.edges[3].node.size)
        break
      case 5:
        sizeArr.push(data.allSizes.edges[4].node.size)
        break
    }
    return sizeArr
  }

  function printProductPrice(node, data) {
    const listPrices = []
    data.allPriceTable.edges.map(price => {
      for (var i = 0; i < data.allCollections.edges.length; i++) {
        if (node.collection === data.allCollections.edges[i].node.id) {
          for (
            var j = 0;
            j < data.allCollections.edges[i].node.sizes.length;
            j++
          ) {
            if (
              price.node.size ===
              data.allCollections.edges[i].node.sizes[j].sizes_id.id
            ) {
              listPrices.push(price.node.price)
            }
          }
        }
      }
    })
    listPrices.sort()
    return listPrices
  }

  function printPrice(data) {
    const listPrices = []
    data.allPriceTable.edges.map(price => {
      for (var i = 0; i < data.allCollections.edges[0].node.sizes.length; i++) {
        if (
          price.node.size ===
          data.allCollections.edges[0].node.sizes[i].sizes_id.id
        ) {
          listPrices.push(price.node.price)
        }
      }
    })
    listPrices.sort()
    return listPrices
  }

  var catalog = {}

  data.data.allProduct.nodes.map(node => {
    //For the first entry into the catalog before there are any collections listed as keys
    if (Object.keys(catalog).length === 0) {
      for (
        var i = 0;
        i < Object.keys(data.data.allCollections.edges).length;
        i++
      ) {
        if (node.collection === data.data.allCollections.edges[i].node.id) {
          var size = data.data.allCollections.edges[i].node.sizes[0].sizes_id.id
          var weight =
            data.data.allCollections.edges[i].node.sizes[0].sizes_id.weight
          catalog[`${data.data.allCollections.edges[i].node.name}`] = {
            nodes: [
              {
                id: node.id,
                name: node.name,
                collection: node.collection,
                description_heading: node.description_heading,
                description: node.description,
                featured: node.featured,
                tax_exempt: node.tax_exempt,
                recommended_scent: node.recommended_scent,
                label_color: node.label_color,
                slug: node.slug,
                sizes: [
                  {
                    size_id: size,
                    size: printSizes(data.data, size)[0],
                    price: printProductPrice(node, data.data)[0],
                    slug: `${node.slug}/size=${size}`,
                    weight: weight,
                  },
                ],
              },
            ],
          }
        //Alternate Images
          for (
            var j = 0;
            j < Object.keys(data.data.allAlternativeProductImages.edges).length;
            j++
          ) {
            if (
              data.data.allAlternativeProductImages.edges[j].node
                .related_product === node.id
            ) {
              for (
                var k = 0;
                k <
                catalog[`${data.data.allCollections.edges[i].node.name}`].nodes
                  .length;
                k++
              ) {
                if (
                  catalog[`${data.data.allCollections.edges[i].node.name}`]
                    .nodes[k].id === node.id
                ) {
                  for (
                    var m = 0;
                    m < data.data.allCollections.edges[i].node.sizes.length;
                    m++
                  ) {
                    if (
                      data.data.allAlternativeProductImages.edges[j].node.size ===
                      data.data.allCollections.edges[i].node.sizes[m].sizes_id.id
                    ) {
                      weight =
                        data.data.allCollections.edges[i].node.sizes[m].sizes_id
                          .weight
                    }
                  }
                  catalog[
                    `${data.data.allCollections.edges[i].node.name}`
                  ].nodes[k].sizes.push({
                    size_id:
                      data.data.allAlternativeProductImages.edges[j].node.size,
                    size: printSizes(
                      data.data,
                      data.data.allAlternativeProductImages.edges[j].node.size
                    )[0],
                    price: printProductPrice(node, data.data)[0],
                    slug: `${node.slug}/size=${data.data.allAlternativeProductImages.edges[j].node.size}`,
                    weight: weight,
                  })
                }
              }
            }
          }
        }
      }
    //If there is already at least one collection in catalog
    } else {
      for (
        var i = 0;
        i < Object.keys(data.data.allCollections.edges).length;
        i++
      ) {
        if (node.collection === data.data.allCollections.edges[i].node.id) {
          for (var j = 0; j < Object.keys(catalog).length; j++) {
    // If collection exists in catalog
            if (
              Object.keys(catalog)[j] ===
              data.data.allCollections.edges[i].node.name
            ) {
                var size =
                  data.data.allCollections.edges[i].node.sizes[0].sizes_id.id
                var weight =
                  data.data.allCollections.edges[i].node.sizes[0].sizes_id
                    .weight
                catalog[`${Object.keys(catalog)[j]}`].nodes.push({
                  id: node.id,
                  name: node.name,
                  collection: node.collection,
                  description_heading: node.description_heading,
                  description: node.description,
                  featured: node.featured,
                  tax_exempt: node.tax_exempt,
                  recommended_scent: node.recommended_scent,
                  label_color: node.label_color,
                  slug: node.slug,
                  sizes: [
                    {
                      size_id: size,
                      size: printSizes(data.data, size)[0],
                      price: printProductPrice(node, data.data)[0],
                      slug: `${node.slug}/size=${size}`,
                      weight: weight,
                    },
                  ],
                })
                for (
                  var k = 0;
                  k <
                  Object.keys(data.data.allAlternativeProductImages.edges)
                    .length;
                  k++
                ) {
                  if (
                    data.data.allAlternativeProductImages.edges[k].node
                      .related_product === node.id
                  ) {
                    for (
                      var l = 0;
                      l <
                      catalog[`${data.data.allCollections.edges[i].node.name}`]
                        .nodes.length;
                      l++
                    ) {
                      if (
                        catalog[
                          `${data.data.allCollections.edges[i].node.name}`
                        ].nodes[l].id === node.id
                      ) {
                        for (
                          var m = 0;
                          m <
                          data.data.allCollections.edges[i].node.sizes.length;
                          m++
                        ) {
                          if (
                            data.data.allAlternativeProductImages.edges[k].node
                              .size ===
                            data.data.allCollections.edges[i].node.sizes[m]
                              .sizes_id.id
                          ) {
                            weight =
                              data.data.allCollections.edges[i].node.sizes[m]
                                .sizes_id.weight
                          }
                        }
                        catalog[
                          `${data.data.allCollections.edges[i].node.name}`
                        ].nodes[l].sizes.push({
                          size_id:
                            data.data.allAlternativeProductImages.edges[k].node
                              .size,
                          size: printSizes(
                            data.data,
                            data.data.allAlternativeProductImages.edges[k].node
                              .size
                          )[0],
                          price: printProductPrice(node, data.data)[0],
                          slug: `${node.slug}/size=${data.data.allAlternativeProductImages.edges[k].node.size}`,
                          weight: weight,
                        })
                      }
                    }
                  }
                }
                j = Object.keys(catalog).length - 1
            }
    // If no collection found and this is last cycle, then add new collection
            else if (j === Object.keys(catalog).length - 1) {
              var size =
                data.data.allCollections.edges[i].node.sizes[0].sizes_id.id
              var weight =
                data.data.allCollections.edges[i].node.sizes[0].sizes_id.weight
              catalog[`${data.data.allCollections.edges[i].node.name}`] = {
                nodes: [
                  {
                    id: node.id,
                    name: node.name,
                    collection: node.collection,
                    description_heading: node.description_heading,
                    description: node.description,
                    featured: node.featured,
                    tax_exempt: node.tax_exempt,
                    recommended_scent: node.recommended_scent,
                    label_color: node.label_color,
                    slug: node.slug,
                    sizes: [
                      {
                        size_id: size,
                        size: printSizes(data.data, size)[0],
                        price: printProductPrice(node, data.data)[0],
                        slug: `${node.slug}/size=${size}`,
                        weight: weight,
                      },
                    ],
                  },
                ],
              }
              for (
                var k = 0;
                k <
                Object.keys(data.data.allAlternativeProductImages.edges).length;
                k++
              ) {
                if (
                  data.data.allAlternativeProductImages.edges[k].node
                    .related_product === node.id
                ) {
                  for (
                    var l = 0;
                    l <
                    catalog[`${data.data.allCollections.edges[i].node.name}`]
                      .nodes.length;
                    l++
                  ) {
                    if (
                      catalog[`${data.data.allCollections.edges[i].node.name}`]
                        .nodes[l].id === node.id
                    ) {
                      for (
                        var m = 0;
                        m < data.data.allCollections.edges[i].node.sizes.length;
                        m++
                      ) {
                        if (
                          data.data.allAlternativeProductImages.edges[k].node
                            .size ===
                          data.data.allCollections.edges[i].node.sizes[m].sizes_id.id
                        ) {
                          weight =
                            data.data.allCollections.edges[i].node.sizes[m]
                              .sizes_id.weight
                        }
                      }
                      catalog[
                        `${data.data.allCollections.edges[i].node.name}`
                      ].nodes[l].sizes.push({
                        size_id:
                          data.data.allAlternativeProductImages.edges[k].node
                            .size,
                        size: printSizes(
                          data.data,
                          data.data.allAlternativeProductImages.edges[k].node
                            .size
                        )[0],
                        price: printProductPrice(node, data.data)[0],
                        slug: `${node.slug}/size=${data.data.allAlternativeProductImages.edges[k].node.size}`,
                        weight: weight,
                      })
                    }
                  }
                }
              }
              j = Object.keys(catalog).length - 1
            }
          }
        }
      }
    }
  })
  const productsPath = "./public/products"

  var collections = Object.keys(catalog)

  for(var i = 0; i < collections.length; i++) {
    catalog[`${collections[i]}`].nodes.forEach(node => {
      if (!fs.existsSync(`${productsPath}`)) {
        fs.mkdirSync(`${productsPath}`)
      }
      if (!fs.existsSync(`${productsPath}/${node.slug}`)) {
        fs.mkdirSync(`${productsPath}/${node.slug}`)
      }
      for (var j = 0; j < node.sizes.length; j++) {
        const data = {
          id: `${node.id}-${node.sizes[j].size_id}`,
          price: node.sizes[j].price,
          url: `https://${process.env.BASE_DOMAIN}/products/${node.sizes[j].slug}.json`,
          dimensions: {
            weight: node.sizes[j].weight,
          },
        }
        console.log(data)
        fs.writeFileSync(
          `${productsPath}/${node.sizes[j].slug}.json`,
          JSON.stringify(data)
        )
      }
    })
  }
}

function printPriceJson(data, product) {
  const listPrices = []
  for (var i = 0; i < Object.size(data.allCollections.edges); i++) {
    if (product.collection === data.data.allCollections.edges[i].node.id) {
      data.allPriceTable.edges.map(price => {
        for ( var j = 0; j < data.allCollections.edges[i].node.sizes.length; j++ ) {
          var id = data.allCollections.edges[i].node.sizes[j].sizes_id.id
          if ( price.node.size === id ) {
            listPrices.push(price.node.price)
          }
        }
      })
    }
  }
  listPrices
  console.log(`ListPrices: ${product.slug}:` + listPrices)
  price = listPrices[0]
  return price
}

function printWeightJson(data, product) {
  const listWeight = []
  var sizeId
  for (var i = 0; i < Object.size(data.allCollections.edges); i++) {
    if (product.collection === data.allCollections.edges[i].node.id) {
      data.allSizes.edges.map(size => {
        switch (size.node.size) {
          case data.allSizes.edges[0].node.size:
            sizeId = 1
            break
          case data.allSizes.edges[1].node.size:
            sizeId = 2
            break
          case data.allSizes.edges[2].node.size:
            sizeId = 3
            break
          case data.allSizes.edges[3].node.size:
            sizeId = 4
            break
          case data.allSizes.edges[4].node.size:
            sizeId = 5
            break
        }
        for ( var j = 0; j < data.allCollections.edges[i].node.sizes.length; j++ ) {
          var id = data.allCollections.edges[i].node.sizes[j].sizes_id.id
          if ( sizeId === id ) {
            listWeight.push(data.data.allCollections.edges[0].node.sizes[j].sizes_id.weight)
          }
        }
      })
    }
  }
  listWeight
  console.log(`ListWeights: ${product.slug}:` + listWeight)
  price = listWeight[0]
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