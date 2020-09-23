const fetch = require("node-fetch")

exports.sourceNodes = async (
    { actions, createNodeId, createContentDigest },
    configOptions
) => {
    const { createNode } = actions
    // Gatsby adds a configuration that's not needed for this plugin, delete it
    delete configOptions.plugins
    // plugin code goes here ...
    apiSite = configOptions.dest
    const apiUrl = `${apiSite}/tillallhours/items/testproduct`

    const testProductsResponse = await fetch(apiUrl, 
        {
            headers: 
            {
                Authorization: "Bearer bVqj8NFJjQfotteKTR2i6POu",
            },
        }
    )
    
    const proccesTestProduct = (product) => {
        const node = product
        
        const nodeId = createNodeId(`test-product-${product.id}`)
        const nodeContent = JSON.stringify(node)
        const nodeData = Object.assign({}, node, {
            id: nodeId,
            parent: null,
            children: [],
            internal: {
                type: `TestProduct`,
                content: nodeContent,
                contentDigest: createContentDigest(node),
            }
        })
        return nodeData
    }

    const testProductData = await testProductsResponse.json();
    const testProducts = testProductData.data

    for(let i = 0; i < testProducts.length; i++) {
        product = testProducts[i]

        createNode(proccesTestProduct(product))
        console.log(testProducts[i])
    }
} 