const fetch = require("node-fetch")
const path = require(`path`)
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.sourceNodes = async (
    { actions, createNodeId, createContentDigest },
    configOptions
) => {
       const { createNode } = actions
       // Gatsby adds a configuration that's not needed for this plugin, delete it
       delete configOptions.plugins
       // plugin code goes here ...
       apiSite = configOptions.dest

       const ProductsResponse = await fetch(
         `${apiSite}/tillallhours/items/product`,
         {
           headers: {
             Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
           },
         }
       )

       const homePagesResponse = await fetch(
         `${apiSite}/tillallhours/items/homepage`,
         {
           headers: {
             Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
           },
         }
       )

       const aboutPageResponse = await fetch(
         `${apiSite}/tillallhours/items/about_page`,
         {
           headers: {
             Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
           },
         }
       )

       const productPageResponse = await fetch(
         `${apiSite}/tillallhours/items/product_page`,
         {
           headers: {
             Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
           },
         }
       )

        const catalogPageResponse = await fetch(
          `${apiSite}/tillallhours/items/catalog_page`,
          {
            headers: {
              Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
            },
          }
        )

       const collectionsResponse = await fetch(
         `${apiSite}/tillallhours/items/collections?fields=id,name,available_vessel_color,scents.scent,sizes.sizes_id.id,sizes.sizes_id.weight`,
         {
           headers: {
             Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
           },
         }
       )

       const priceTableResponse = await fetch(
         `${apiSite}/tillallhours/items/price_table?fields=id,size,price`,
         {
           headers: {
             Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
           },
         }
       )

        const scentsResponse = await fetch(
          `${apiSite}/tillallhours/items/scents?fields=id,name,scent_description,description`,
          {
            headers: {
              Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
            },
          }
        )

        const sizesResponse = await fetch(
          `${apiSite}/tillallhours/items/sizes?fields=id,name,size,weight`,
          {
            headers: {
              Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
            },
          }
        )

        const genericImagesResponse = await fetch(
          `${apiSite}/tillallhours/items/generic_product_images?fields=id,name,image_1,size,vessel_color,collections.collections_id,position`,
          {
            headers: {
              Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
            },
          }
        )

        const altProductsImagesResponse = await fetch(
          `${apiSite}/tillallhours/items/alternative_product_images?fields=id,image_1,image_2,image_3,image_4,size,color,related_product`,
          {
            headers: {
              Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
            },
          }
        )

       const processItem = (product, children, nodeName) => {
         const node = product
         const preNodeId = nodeName.toLowerCase()
         const nodeId = createNodeId(`${preNodeId}-${product.id}`)
         const nodeContent = JSON.stringify(node)
         const nodeData = {}
         if (children.length > 0) {
           const nodeData = Object.assign({}, node, {
             id: nodeId,
             parent: null,
             children: children,
             internal: {
               type: `${nodeName}`,
               content: nodeContent,
               contentDigest: createContentDigest(node),
             },
           })
           /*console.log("----------------------------------------------------")
           console.log(nodeData)*/
           return nodeData
         } else {
           const nodeData = Object.assign({}, node, {
             id: nodeId,
             parent: null,
             internal: {
               type: `${nodeName}`,
               content: nodeContent,
               contentDigest: createContentDigest(node),
             },
           })
           /*console.log("----------------------------------------------------")
           console.log(nodeData)*/
           return nodeData
         }
       }

       const processImage = (item, fileId, file, nodeName) => {
         const node = file
         const preNodeId = nodeName.toLowerCase()
         const nodeId = createNodeId(`${preNodeId}-image-${fileId}`)
         const nodeContent = JSON.stringify(node)
         const nodeData = Object.assign({}, node, {
           id: nodeId,
           parent: createNodeId(`${preNodeId}-${item.id}`),
           children: [],
           internal: {
             type: `${nodeName}File`,
             content: nodeContent,
             contentDigest: createContentDigest(node),
           },
         })
         return nodeData
       }

       async function fetchImages (nodesToCreate) {
         for (const [key, value] of Object.entries(nodesToCreate)) {
           //Object.keys(nodesToCreate).map(function(key, index) {
           for (let i = 0; i < nodesToCreate[key].length; i++) {
             nodeItems = nodesToCreate[key]
             node = nodeItems[i]
             let children = []

             for (let j = 1; j <= 5; j++) {
               if (node[`image_${j}`] != null || node[`image_${j}`] != undefined) {
                 var file_id = node[`image_${j}`]
                 if (typeof node[`image_${j}`] === "object") {
                   file_id = node[`image_${j}`].id
                 }
                 const nodesFileIdResponse = await fetch(
                   `${apiSite}/tillallhours/files/${file_id}`,
                   {
                     headers: {
                       Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
                     },
                   }
                 )
                   .then(res => res.json())
                   .then(nodeFileData => {
                     /*console.log(
                       "nodeFile variable:" + JSON.stringify(nodeFileData)
                     )*/
                     const nodeFile = nodeFileData.data.data
                     createNode(processImage(node, file_id, nodeFile, key))
                     node[`image_${j}`] = createNodeId(
                       `${key.toLowerCase()}-image-${file_id}`
                     )
                     node[`image_${j}_url`] = `${nodeFile.full_url}`
                     children.push(
                       createNodeId(`${key.toLowerCase()}-image-${file_id}`)
                     )
                   })
               }
             }
             /*console.log("----------------------------------------------------")
             console.log(key + ":")
             console.log(node)
             console.log("CreateNode called")*/
             createNode(processItem(node, children, String(key)))
           }
         } //)
       }

       const ProductData = await ProductsResponse.json()
       const Products = ProductData.data
       const homePageData = await homePagesResponse.json()
       const homePages = homePageData.data
       const aboutPageData = await aboutPageResponse.json()
       const aboutPage = aboutPageData.data
       const productPageData = await productPageResponse.json()
       const productPage = productPageData.data
       const catalogPageData = await catalogPageResponse.json()
       const catalogPage = catalogPageData.data
       const collectionsData = await collectionsResponse.json()
       const collections = collectionsData.data
       const priceTableData = await priceTableResponse.json()
       const priceTable = priceTableData.data
       const scentsData = await scentsResponse.json()
       const scents = scentsData.data
       const sizesData = await sizesResponse.json()
       const sizes = sizesData.data
       const genericImagesData = await genericImagesResponse.json()
       const genericImages = genericImagesData.data
       const altProductImagesData = await altProductsImagesResponse.json()
       const altProductImages = altProductImagesData.data

       const nodesToCreate = {
         Product: Products,
         HomePage: homePages,
         AboutPage: aboutPage,
         Product_Page: productPage,
         Collections: collections,
         Price_Table: priceTable,
         Scents: scents,
         Sizes: sizes,
         Generic_Product_Images: genericImages,
         CatalogPage: catalogPage,
         Alternative_Product_Images: altProductImages,
       }
       await fetchImages(nodesToCreate)

       /*for(let i = 0; i < testProducts.length; i++) {
        product = testProducts[i]
        let children = []

        for(let j = 1; j <= 5; j++) {
            if (product[`image_${j}`] != null) {
                const file_id = product[`image_${j}`]
                const testProductsFileIdResponse = await fetch(
                    `${apiSite}/tillallhours/files/${file_id}`,
                    {
                        headers: {
                            Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
                        },
                    }
                )
                const testProductFileData = await testProductsFileIdResponse.json()
                const testProductFile = testProductFileData.data.data
                createNode(processImage(product, file_id, testProductFile, "TestProduct"))
                //console.log(`${file_id}, ${testProductFile}`)
                product[`image_${j}`] = createNodeId(
                  `testproduct-image-${file_id}`
                )
                product[`image_${j}_url`] = `${testProductFile.full_url}`
                children.push(createNodeId(`testproduct-image-${file_id}`))
            }
        }
        createNode(processItem(product, children, "TestProduct"))
    }*/
     }

exports.onCreateNode = async ({
    node,
    actions: { createNode },
    store,
    cache,
    createNodeId,
}) => {
    // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
    for(let j = 1; j <= 5; j++) {
        if (

            node[`image_${j}`] != null //&&
            //node.internal.type === "TestProduct"
        ) {
            let fileNode = await createRemoteFileNode({
            url: node[`image_${j}_url`], // string that points to the URL of the image
            parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
            createNode, // helper function in gatsby-node to generate the node
            createNodeId, // helper function in gatsby-node to generate the node id
            cache, // Gatsby's cache
            store, // Gatsby's redux store
            })
            // if the file was created, attach the new node to the parent node
            if (fileNode) {
                delete node[`image_${j}`]
                delete node[`image_${j}_url`]
                node[`image_${j}___NODE`] = fileNode.id
            }
        }
    }
    if (node.internal.type === "Product") {
      node[`collection`] = createNodeId(`collections-${node.collection}`)
      node[`recommended_scent`] = createNodeId(
        `scents-${node.recommended_scent}`
      )
    }
    if (node.internal.type === "Collections") {
      node.scents.forEach(scent => {
        scent.scent = createNodeId(`scents-${scent.scent}`)
      })
    }
    if (node.internal.type === "Alternative_Product_Images") {
      node.related_product = createNodeId(`product-${node.related_product}`)
    }
    if (node.internal.type === "Generic_Product_Images") {
      for (var i = 0; i < node.collections.length; i++) {
        node.collections[i].collections_id = createNodeId(
          `collections-${node.collections[i].collections_id}`
        )
      }
    }
}

/*exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
      query {
        allProduct(filter: { status: { eq: "published" } }) {
          edges {
            node {
              slug
              id
              collection
            }
          }
        }
      }
    `)
    
    result.data.allProduct.edges.forEach(({ node }) => {
        createPage({
            path: node.slug,
            component: path.resolve(`./src/templates/product.js`),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.slug,
                id: node.id,
                collection: node.collection,
            },
        })
    })
}*/

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  
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

  const result = await graphql(`
    query {
      allProduct(filter: { status: { eq: "published" } }) {
        edges {
          node {
            slug
            id
            collection
          }
        }
      }
    }
  `)

  function genericImages(size, collection) {
    var arr = []
    var result = []
    for (var i = 0; i < data.data.allGenericProductImages.edges.length; i++) {
      for (
        var j = 0;
        j < data.data.allGenericProductImages.edges[i].node.collections.length;
        j++
      ) {
        if (
          data.data.allGenericProductImages.edges[i].node.collections[j]
            .collections_id === collection
        ) {
          if (data.data.allGenericProductImages.edges[i].node.size.id === size) {
            arr.push({
              position: data.data.allGenericProductImages.edges[i].node.position,
              image: data.data.allGenericProductImages.edges[i].node.image_1,
            })
          }
        }
      }
    }
    arr.sort((a, b) => (a.position > b.position ? 1 : -1))
    for (var i = 0; i < arr.length; i++) {
      result.push(arr[i].image)
    }
    return result
  }

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

  //console.log(JSON.stringify(data))

  /*result.data.allProduct.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/product.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
        id: node.id,
        collection: node.collection,
      },
    })
  })*/
  
  data.data.allProduct.nodes.map(node => {
    if (Object.keys(catalog).length === 0) {
      for (
        var i = 0;
        i < Object.keys(data.data.allCollections.edges).length;
        i++
      ) {
        if (node.collection === data.data.allCollections.edges[i].node.id) {
          var size = data.data.allCollections.edges[i].node.sizes[0].sizes_id.id
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
                    slug: `${node.slug}size=${size}`,
                  },
                ],
              },
            ],
          }
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
                  catalog[`${data.data.allCollections.edges[i].node.name}`].nodes[
                    k
                  ].id === node.id
                ) {
                  catalog[`${data.data.allCollections.edges[i].node.name}`].nodes[
                    k
                  ].sizes.push({
                    size_id:
                      data.data.allAlternativeProductImages.edges[j].node.size,
                    size: printSizes(
                      data.data,
                      data.data.allAlternativeProductImages.edges[j].node.size
                    )[0],
                    price: printProductPrice(node, data.data)[1],
                    slug: `${node.slug}size=${data.data.allAlternativeProductImages.edges[j].node.size}`,
                  })
                }
              }
            }
          }
        }
      }
    } else {
      for (
        var i = 0;
        i < Object.keys(data.data.allCollections.edges).length;
        i++
      ) {
        if (node.collection === data.data.allCollections.edges[i].node.id) {
          for (var j = 0; j < Object.keys(catalog).length; j++) {
            if (
              Object.keys(catalog)[j] ===
              data.data.allCollections.edges[i].node.name
            ) {
              var size = data.data.allCollections.edges[i].node.sizes[0].sizes_id.id
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
                    slug: `${node.slug}size=${size}`,
                  },
                ],
              })
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
                    catalog[`${data.data.allCollections.edges[i].node.name}`].nodes
                      .length;
                    l++
                  ) {
                    if (
                      catalog[`${data.data.allCollections.edges[i].node.name}`]
                        .nodes[l].id === node.id
                    ) {
                      catalog[
                        `${data.data.allCollections.edges[i].node.name}`
                      ].nodes[l].sizes.push({
                        size_id:
                          data.data.allAlternativeProductImages.edges[k].node.size,
                        size: printSizes(
                          data.data,
                          data.data.allAlternativeProductImages.edges[k].node.size
                        )[0],
                        price: printProductPrice(node, data.data)[1],
                        slug: `${node.slug}size=${data.data.allAlternativeProductImages.edges[k].node.size}`,
                      })
                    }
                  }
                }
              }
              j = Object.keys(catalog).length - 1
            } else if (j === Object.keys(catalog).length - 1) {
              var size = data.data.allCollections.edges[i].node.sizes[0].sizes_id.id
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
                        price: printPrice(data.data)[0],
                        slug: `${node.slug}size=${size}`,
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
                    catalog[`${data.data.allCollections.edges[i].node.name}`].nodes
                      .length;
                    l++
                  ) {
                    if (
                      catalog[`${data.data.allCollections.edges[i].node.name}`]
                        .nodes[l].id === node.id
                    ) {
                      catalog[
                        `${data.data.allCollections.edges[i].node.name}`
                      ].nodes[l].sizes.push({
                        size_id:
                          data.data.allAlternativeProductImages.edges[k].node.size,
                        size: printSizes(
                          data.data,
                          data.data.allAlternativeProductImages.edges[k].node.size
                        )[0],
                        price: printPrice(data.data)[1],
                        slug: `${node.slug}size=${data.data.allAlternativeProductImages.edges[k].node.size}`,
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

  var collections = Object.keys(catalog)

  for(var i = 0; i < collections.length; i++) {
    catalog[`${collections[i]}`].nodes.forEach(node => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/product.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
          id: node.id,
          collection: node.collection,
        },
      })
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Product implements Node {
        image_1: File
        image_2: File
        image_3: File
        image_4: File
        image_5: File
    }

    type HomePage implements Node {
        image_1: File
        image_2: File
        image_3: File
        image_4: File
    }

    type AboutPage implements Node {
        image_1: File
        image_2: File
        image_3: File
        image_4: File
        image_5: File
    }

    type Product_Page implements Node {
        image_1: File
        image_2: File
        image_3: File
        image_4: File
        image_5: File
    }

    type Collections implements Node

    type Scents implements Node

    type Sizes implements Node

    type Generic_Product_Images implements Node {
        image_1: File
    }

    type CatalogPage implements Node {
        image_1: File
    }

    type Alternative_Product_Images implements Node {
        image_1: File
        image_2: File
        image_3: File
        image_4: File
        image_5: File
    }
  `)
}