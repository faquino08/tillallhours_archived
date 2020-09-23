import React from "react"

const path = require('path')

/*exports.createPages = ({ boundActionCreators, graphql }, { urlPrefix }) => {
    const { createPage } = boundActionCreators

    return new Promise((resolve, reject) => {
        resolve(
          graphql(
            `
              {
                allDirectusTestproduct {
                  edges {
                    node {
                      id
                      title
                      category
                      price
                      description
                      scent
                      taxable
                      image_1
                      image_2
                      image_3
                      image_4
                      image_5
                      url
                    }
                  }
                }
              }
            `
          ).then(result => {
            if (result.errors) {
            console.error('GraphQL query returned errors')
            reject(result.errors)
            }

            result.data.allDirectusTestproduct.edges.forEach(edge => {
                try {
                    let node = edge.node
                    let path = `posts/${node.id}`
                    createPage({
                    path,
                    layout: 'index',
                    component: path.resolve('src/templates/post.jsx'),
                    context: {
                        post: node,
                    },
                    })
                    console.log(`Generated page '${path}'`)
                }
                catch (error) {
                    console.error(`Failed to generate page posts/'${path}': ${error}`)
                }
                })
            })
        )
    })
}*/