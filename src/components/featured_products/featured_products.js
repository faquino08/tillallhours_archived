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

function CardCarousel () {
  const [centerModeWidth, setWidth] = useState(26)
  
  useEffect(() => {
    centerModePct();
    return centerModePct();
  })
  
  function centerModePct() {
    if (window.innerWidth < 1024) {
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
              sizes_id
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

  return (
    <Container className={styles.bullets}>
      <Carousel
        infiniteLoop
        autoPlay
        showThumbs={false}
        centerMode
        centerSlidePercentage={centerModeWidth}
        className={styles.inner}
      >
        {data.allProduct.nodes.map(node => (
          <Card className={styles.card} key={node.id}>
            <Link to={`/${node.slug}`}>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>
                  <h4>
                    {node.name}
                    <h6>${printProductPrice(node, data)[0]}</h6>
                  </h4>
                </Card.Title>
                <Card.Img
                  className={styles.cardImg}
                  variant="top"
                  src={node.image_1.childImageSharp.fluid.src}
                />
              </Card.Body>
              <Button variant="dark" className={styles.cardBtn}>
                Customize
              </Button>
            </Link>
          </Card>
        ))}
      </Carousel>
    </Container>
    /**<Container className={styles.bullets}>
      <Carousel
        infiniteLoop
        autoPlay
        showThumbs={false}
        centerMode
        centerSlidePercentage={centerModeWidth}
        className={styles.inner}
      >
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
            <Card.Img
              className="cardImg"
              variant="top"
              data-src="holder.js/100px100p"
            />
          </Card.Body>
          <Button variant="dark" className={styles.cardBtn}>
            Add To Cart
          </Button>
        </Card>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
            <Card.Img
              className="cardImg"
              variant="top"
              data-src="holder.js/100px100p"
            />
          </Card.Body>
          <Button variant="dark" className={styles.cardBtn}>
            Add To Cart
          </Button>
        </Card>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
            <Card.Img
              className="cardImg"
              variant="top"
              data-src="holder.js/100px100p"
            />
          </Card.Body>
          <Button variant="dark" className={styles.cardBtn}>
            Add To Cart
          </Button>
        </Card>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
            <Card.Img
              className="cardImg"
              variant="top"
              data-src="holder.js/100px100p"
            />
          </Card.Body>
          <Button variant="dark" className={styles.cardBtn}>
            Add To Cart
          </Button>
        </Card>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
            <Card.Img
              className="cardImg"
              variant="top"
              data-src="holder.js/100px100p"
            />
          </Card.Body>
          <Button variant="dark" className={styles.cardBtn}>
            Add To Cart
          </Button>
        </Card>
      </Carousel>
    </Container>**/
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
            price.node.size === data.allCollections.edges[i].node.sizes[j].size_id
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