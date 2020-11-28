import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
//import Holder from "holderjs"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./featured_products.module.css"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { animated, useSpring, useChain } from "react-spring"
import { handleScroll } from "../../services/scroll.js"
import featuredGenerator from "../../services/cms/directus/featuredIntegrator.js"

function CardCarousel () {
  const [centerModeWidth, setWidth] = useState(26)
  
  useEffect(() => {
    centerModePct();
    return centerModePct();
  })
  
  function centerModePct() {
    if (window.innerWidth < 767) {
      setWidth(81)
    } else {
      setWidth(26)
    }
  }

  const data = useStaticQuery(graphql`
    query Product {
      allProduct(
        filter: { status: { eq: "published" }, featured: { eq: true } }
      ) {
        nodes {
          id
          name
          collection
          slug
          image_1 {
            childImageSharp {
              fluid {
                src
              }
            }
          }
          image_3 {
            childImageSharp {
              fluid {
                src
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
    }
  `)

  var featuredProducts = featuredGenerator()

  return (
    <Container className={styles.bullets}>
      <Carousel
        infiniteLoop
        autoPlay
        showThumbs={false}
        showStatus={false}
        centerMode
        centerSlidePercentage={centerModeWidth}
        className={styles.inner}
        interval={1750}
      >
        {featuredProducts.map(node => (
          <Link to={`/${node.sizes[0].slug}`} style={{ width: "100%" }}>
            <Card className={styles.card} key={node.id}>
              <Card.Body style={{ width: "100%" }}>
                <Card.Img
                  className={styles.cardImg}
                  variant="top"
                  src={node.sizes[0].images[0].childImageSharp.fluid.src}
                  style={{ borderColor: `${node.label_color}` }}
                />
                <Card.Img
                  className={styles.cardImg2}
                  variant="top"
                  src={node.sizes[0].images[2].childImageSharp.fluid.src}
                />
              </Card.Body>
              <Button variant="dark" className={styles.cardBtn}>
                Customize
              </Button>
            </Card>
            <div className={styles.cardTitle}>
              <h4>{node.name}</h4>
              <h6>{node.sizes[0].size}</h6>
            </div>
            <div className={styles.cardPrice}>
              <h6>${node.sizes[0].price}</h6>
            </div>
          </Link>
        ))}
      </Carousel>
    </Container>
  )
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
            price.node.size === data.allCollections.edges[i].node.sizes[j].sizes_id.id
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

export default CardCarousel;