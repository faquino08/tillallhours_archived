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
         `${apiSite}/tillallhours/items/collections?fields=id,name,available_vessel_color,scents.scent,sizes.sizes_id`,
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
          `${apiSite}/tillallhours/items/scents?fields=id,name,scent_description`,
          {
            headers: {
              Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
            },
          }
        )

        const sizesResponse = await fetch(
          `${apiSite}/tillallhours/items/sizes?fields=id,name,size`,
          {
            headers: {
              Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
            },
          }
        )

        const genericImagesResponse = await fetch(
          `${apiSite}/tillallhours/items/generic_product_images?fields=id,name,image_1,size`,
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
                 const file_id = node[`image_${j}`]
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
                     const nodeFile = nodeFileData.data.data
                     /*console.log(
                       "nodeFile variable:" + JSON.stringify(nodeFile)
                     )*/
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
         Catalog_Page: catalogPage,
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
}

exports.createPages = async ({ graphql, actions }) => {
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
}