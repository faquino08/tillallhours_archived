import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import catalogGenerator from "./candleIntegrator"
var md = require("markdown-it")()

export default function FeaturedGenerator() {
  const catalog = catalogGenerator()
  var featuredProducts = []

  for ( var i = 0; i < Object.keys(catalog).length; i++ ) {
    var collectionNames = Object.keys(catalog)
    var collection = catalog[`${collectionNames[i]}`]
    collection.nodes.forEach(node => {
      if(node.featured === true) {
        if ( node.featured_size === null || node.featured_size === undefined ) {
          featuredProducts.push(node)
        } else {
          for ( var j = 0; j < node.sizes.length; j++ ) {
            if ( node.sizes[j].size_id === node.featured_size ) {
              node.sizes[0] = node.sizes[j]
              featuredProducts.push(node)
              j = node.sizes.length
            } else if (
              node.sizes[j].size_id !== node.featured_size &&
              j === (node.sizes.length - 1)
            ) {
              featuredProducts.push(node)
            }
          }
        }
      }
    })
  }

  return featuredProducts;
}
