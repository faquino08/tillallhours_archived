/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const fetch = require(`node-fetch`)

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