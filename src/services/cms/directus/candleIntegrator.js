import React from "react"
import { useStaticQuery, graphql } from "gatsby"
var md = require("markdown-it")()

export default function CatalogGenerator( id ) {
    const data = useStaticQuery(graphql`
      query CatalogGnrtr {
        allProduct(filter: { status: { eq: "published" } }) {
          nodes {
            id
            slug
            name
            description
            featured
            featured_size
            collection
            category
            recommended_scent
            image_1 {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image_2 {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image_3 {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image_4 {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image_5 {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
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
              weight
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
              image_1 {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
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
              image_1 {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
              image_2 {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
              image_3 {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
              image_4 {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
              image_5 {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
          }
        }
      }
    `)

    function genericImages(size,collection) {
      var arr = []
      var result = []
      for (var i = 0; i < data.allGenericProductImages.edges.length; i++) {
        for (
          var j = 0; 
          j < data.allGenericProductImages.edges[i].node.collections.length;
          j++
        )
        {
          if (
            data.allGenericProductImages.edges[i].node.collections[j].collections_id ===
            collection
          )
          {
            if (
              data.allGenericProductImages.edges[i].node.size.id === size
            )
            {
              arr.push({
                position: data.allGenericProductImages.edges[i].node.position,
                image: data.allGenericProductImages.edges[i].node.image_1,
                color: data.allGenericProductImages.edges[i].node.vessel_color,
              })
            }
          }
        }
      }
      arr.sort((a, b) => (a.position > b.position) ? 1 : -1)
      for (var i = 0; i < arr.length; i++) {
        result.push({image: arr[i].image, color: arr[i].color})
      }
      return result;
    }

    var catalog = {}
    var weight

    data.allProduct.nodes.map(node => {
      if (Object.keys(catalog).length === 0) {
        for (var i = 0; i < Object.keys(data.allCollections.edges).length; i++) {
          if (node.collection === data.allCollections.edges[i].node.id) {
            var size = data.allCollections.edges[i].node.sizes[0].sizes_id.id
            var weight = data.allCollections.edges[i].node.sizes[0].sizes_id.weight
            catalog[`${data.allCollections.edges[i].node.name}`] = {
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
                  category: node.category,
                  featured_size: node.featured_size,
                  sizes: [
                    {
                      size_id: size,
                      size: printSizes(data, size)[0],
                      images: [
                        node.image_1,
                        node.image_2,
                        node.image_3,
                        node.image_4,
                        node.image_5,
                      ],
                      price: printProductPrice(node, data)[0],
                      slug: `${node.slug}?size=${size}`,
                      generic_images: genericImages(size, node.collection),
                      weight: weight,
                    },
                  ],
                },
              ],
            }
            for (var j = 0; j < Object.keys(data.allAlternativeProductImages.edges).length; j++) {
              if (
                data.allAlternativeProductImages.edges[j].node
                  .related_product === node.id
              ) 
              {
                for (var k =0; 
                      k < catalog[`${data.allCollections.edges[i].node.name}`].nodes.length; 
                      k++) 
                {
                  if (catalog[`${data.allCollections.edges[i].node.name}`].nodes[k].id === 
                      node.id) 
                  {
                    for (
                      var m = 0;
                      m < data.allCollections.edges[i].node.sizes.length;
                      m++
                    ) {
                      if (
                        data.allAlternativeProductImages.edges[j].node.size ===
                        data.allCollections.edges[i].node.sizes[m].sizes_id.id
                      ) {
                        weight =
                          data.allCollections.edges[i].node.sizes[m].sizes_id.weight
                      }
                    }
                    catalog[`${data.allCollections.edges[i].node.name}`].nodes[
                      k
                    ].sizes.push({
                      size_id:
                        data.allAlternativeProductImages.edges[j].node.size,
                      size: printSizes(
                        data,
                        data.allAlternativeProductImages.edges[j].node.size
                      )[0],
                      images: [
                        data.allAlternativeProductImages.edges[j].node.image_1,
                        data.allAlternativeProductImages.edges[j].node.image_2,
                        data.allAlternativeProductImages.edges[j].node.image_3,
                        data.allAlternativeProductImages.edges[j].node.image_4,
                        data.allAlternativeProductImages.edges[j].node.image_5,
                      ],
                      price: printProductPrice(node, data)[1],
                      slug: `${node.slug}?size=${data.allAlternativeProductImages.edges[j].node.size}`,
                      generic_images: genericImages(
                        data.allAlternativeProductImages.edges[j].node.size,
                        node.collection
                      ),
                      weight: weight,
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
          i < Object.keys(data.allCollections.edges).length;
          i++
        ) {
          if (node.collection === data.allCollections.edges[i].node.id) {
            for (var j = 0; j < Object.keys(catalog).length; j++) {
              if (
                Object.keys(catalog)[j] ===
                data.allCollections.edges[i].node.name
              ) {
                var size = data.allCollections.edges[i].node.sizes[0].sizes_id.id
                var weight = data.allCollections.edges[i].node.sizes[0].sizes_id.weight
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
                  category: node.category,
                  featured_size: node.featured_size,
                  sizes: [
                    {
                      size_id: size,
                      size: printSizes(data, size)[0],
                      images: [
                        node.image_1,
                        node.image_2,
                        node.image_3,
                        node.image_4,
                        node.image_5,
                      ],
                      price: printProductPrice(node, data)[0],
                      slug: `${node.slug}?size=${size}`,
                      generic_images: genericImages(size, node.collection),
                      weight: weight,
                    },
                  ],
                })
                for (
                  var k = 0;
                  k <
                  Object.keys(data.allAlternativeProductImages.edges).length;
                  k++
                ) {
                  if (
                    data.allAlternativeProductImages.edges[k].node
                      .related_product === node.id
                  ) {
                    for (var l =0; 
                          l < catalog[`${data.allCollections.edges[i].node.name}`].nodes.length; 
                          l++) 
                    {
                      if (catalog[`${data.allCollections.edges[i].node.name}`].nodes[l].id === 
                          node.id) 
                      {
                        for ( var m = 0; m < data.allCollections.edges[i].node.sizes.length; m++) {
                          if (
                            data.allAlternativeProductImages.edges[k].node
                              .size ===
                            data.allCollections.edges[i].node.sizes[m].sizes_id
                              .id
                          ) {
                            weight =
                              data.allCollections.edges[i].node.sizes[m]
                                .sizes_id.weight
                          }
                        }
                        catalog[
                          `${data.allCollections.edges[i].node.name}`
                        ].nodes[l].sizes.push({
                          size_id:
                            data.allAlternativeProductImages.edges[k].node.size,
                          size: printSizes(
                            data,
                            data.allAlternativeProductImages.edges[k].node.size
                          )[0],
                          images: [
                            data.allAlternativeProductImages.edges[k].node
                              .image_1,
                            data.allAlternativeProductImages.edges[k].node
                              .image_2,
                            data.allAlternativeProductImages.edges[k].node
                              .image_3,
                            data.allAlternativeProductImages.edges[k].node
                              .image_4,
                            data.allAlternativeProductImages.edges[k].node
                              .image_5,
                          ],
                          price: printProductPrice(node, data)[1],
                          slug: `${node.slug}?size=${data.allAlternativeProductImages.edges[k].node.size}`,
                          generic_images: genericImages(
                            data.allAlternativeProductImages.edges[k].node.size,
                            node.collection
                          ),
                          weight: weight,
                        })
                      }
                    }
                  }
                }
                j = Object.keys(catalog).length - 1
              } else if (j === Object.keys(catalog).length - 1) {
                var size = data.allCollections.edges[i].node.sizes[0].sizes_id.id
                var weight = data.allCollections.edges[i].node.sizes[0].sizes_id.weight
                catalog[`${data.allCollections.edges[i].node.name}`] = {
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
                      category: node.category,
                      featured_size: node.featured_size,
                      sizes: [
                        {
                          size_id: size,
                          size: printSizes(data, size)[0],
                          images: [
                            node.image_1,
                            node.image_2,
                            node.image_3,
                            node.image_4,
                            node.image_5,
                          ],
                          price: printProductPrice(node, data)[0],
                          slug: `${node.slug}?size=${size}`,
                          generic_images: genericImages(size, node.collection),
                          weight: weight,
                        },
                      ],
                    },
                  ],
                }
                for (
                  var k = 0;
                  k <
                  Object.keys(data.allAlternativeProductImages.edges).length;
                  k++
                ) {
                  if (
                    data.allAlternativeProductImages.edges[k].node
                      .related_product === node.id
                  ) {
                    for (
                      var l = 0;
                      l <
                      catalog[`${data.allCollections.edges[i].node.name}`].nodes
                        .length;
                      l++
                    ) {
                      if (
                        catalog[`${data.allCollections.edges[i].node.name}`]
                          .nodes[l].id === node.id
                      ) {
                        for (
                          var m = 0;
                          m < data.allCollections.edges[i].node.sizes.length;
                          m++
                        ) {
                          if (
                            data.allAlternativeProductImages.edges[k].node
                              .size ===
                            data.allCollections.edges[i].node.sizes[m].sizes_id
                              .id
                          ) {
                            weight =
                              data.allCollections.edges[i].node.sizes[m]
                                .sizes_id.weight
                          }
                        }
                        catalog[
                          `${data.allCollections.edges[i].node.name}`
                        ].nodes[l].sizes.push({
                          size_id:
                            data.allAlternativeProductImages.edges[k].node.size,
                          size: printSizes(
                            data,
                            data.allAlternativeProductImages.edges[k].node.size
                          )[0],
                          images: [
                            data.allAlternativeProductImages.edges[k].node
                              .image_1,
                            data.allAlternativeProductImages.edges[k].node
                              .image_2,
                            data.allAlternativeProductImages.edges[k].node
                              .image_3,
                            data.allAlternativeProductImages.edges[k].node
                              .image_4,
                            data.allAlternativeProductImages.edges[k].node
                              .image_5,
                          ],
                          price: printPrice(data)[1],
                          slug: `${node.slug}?size=${data.allAlternativeProductImages.edges[k].node.size}`,
                          generic_images: genericImages(
                            data.allAlternativeProductImages.edges[k].node.size,
                            node.collection
                          ),
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

    return catalog;

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

    function printColors(indexArray) {
      let colorArr = []

      indexArray.forEach(index => {
        switch (parseInt(index)) {
          case 0:
            colorArr.push("Gold")
            break
          case 1:
            colorArr.push("Silver")
            break
          case 2:
            colorArr.push("Dark Gray Stone")
            break
          case 3:
            colorArr.push("Light Gray Stone")
            break
          case 4:
            colorArr.push("Multicolor")
            break
        }
      })
      return colorArr
    }

    function printScents(data) {
      let scentArr = []

      for (
        var i = 0;
        i < data.allCollections.edges[0].node.scents.length;
        i++
      ) {
        for (var j = 0; j < data.allScents.edges.length; j++) {
          if (
            data.allScents.edges[j].node.id ===
            data.allCollections.edges[0].node.scents[i].scent
          ) {
            scentArr.push(data.allScents.edges[j].node.name)
          }
        }
      }
      return scentArr
    }

    function printScentDetails(data) {
      let scentDetailArr = {}

      for (
        var i = 0;
        i < data.allCollections.edges[0].node.scents.length;
        i++
      ) {
        for (var j = 0; j < data.allScents.edges.length; j++) {
          if (
            data.allScents.edges[j].node.id ===
            data.allCollections.edges[0].node.scents[i].scent
          ) {
            var desc = md.render(data.allScents.edges[j].node.description)
            scentDetailArr[`${data.allScents.edges[j].node.name}`] = desc
          }
        }
      }
      return scentDetailArr
    }

    function printRecScents(data) {
      let recScent = []
      for (var j = 0; j < data.allScents.edges.length; j++) {
        if (
          data.allScents.edges[j].node.id ===
          data.allProduct.edges[0].node.recommended_scent
        ) {
          recScent = data.allScents.edges[j].node.name
        }
      }
      return recScent
    }

    function printPrice(data) {
      const listPrices = []
      data.allPriceTable.edges.map(price => {
        for (
          var i = 0;
          i < data.allCollections.edges[0].node.sizes.length;
          i++
        ) {
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
}