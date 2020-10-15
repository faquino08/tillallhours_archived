import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { chunk } from 'lodash'
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image" 
import Card from "react-bootstrap/Card"
import Banner from "../components/banner-image/banner_image"
import styles from "./products.module.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

function CatalogPage() {
    const data = useStaticQuery(graphql`
      query CatalogPage {
        allCatalogPage {
          edges {
            node {
              image_1 {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    base64
                    tracedSVG
                    srcWebp
                    srcSetWebp
                    originalImg
                    originalName
                  }
                }
              }
            }
          }
        }
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
        allSizes {
          edges {
            node {
              id
              name
              size
            }
          }
        }
      }
    `)

    const [state, testState] = useState({
      test: data,
    })
    const rows = chunk(generateProductCards(data), 3)
    return (
      <Layout>
        <SEO title="The Catalog" />
        <Banner title="The Catalog">
          <div className={styles.bannerImgOver}>
            <Img
              fluid={
                data.allCatalogPage.edges[0].node.image_1.childImageSharp.fluid
              }
              className={styles.bannerImg}
            />
          </div>
        </Banner>
        <Container>
          {/*data.allProduct.nodes.map((node) => {
              return (
                <Card className={styles.card} key={node.id}>
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
                    Add To Cart
                  </Button>
                </Card>
              )
            })*/
          rows.map(cols => (
            <Row>
              {cols.map(col => (
                <Col sm={12} md={4} className={styles.cardCol}>
                  {col}
                </Col>
              ))}
            </Row>
          ))}
        </Container>
        <footer className={[styles.bottom, styles.rowM]}>
          <div className="footing">
            © {new Date().getFullYear()}, tillallhours Candle Co.
          </div>
        </footer>
      </Layout>
    )
}

function printProductPrice(node, data) {
  const listPrices = []
  data.allPriceTable.edges.map(price => {
    for (var i = 0; i < data.allCollections.edges.length; i++) {
      if(node.collection === data.allCollections.edges[i].node.id) {
        for (var j = 0; j < data.allCollections.edges[i].node.sizes.length; j++) {
          if (price.node.size === data.allCollections.edges[i].node.sizes[j].sizes_id) {
              listPrices.push(price.node.price)
          }
        }
      }
    }
  })
  listPrices.sort()
  return listPrices
}

function generateProductCards(data) {
  var productCards = []
  data.allProduct.nodes.map(node => {
    productCards.push(
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
    )
  })
  return productCards
}

export default CatalogPage