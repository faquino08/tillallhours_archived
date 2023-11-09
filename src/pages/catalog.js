import React, { useLayoutEffect, useState } from "react"
import { Link } from "gatsby"
import { chunk } from 'lodash'
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image" 
import Card from "react-bootstrap/Card"
import Banner from "../components/banner-image/banner_image"
import styles from "./catalog.module.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import catalogGenerator from "../services/cms/directus/candleIntegrator"

function CatalogPage() {
    const [gridNum, setGridNum] = useState(2)

    useLayoutEffect(() => {
      if (typeof window !== undefined) {
        window.addEventListener("resize", function() {
          if (window.innerWidth >= 992) {
            setGridNum(4)
          } else {
            setGridNum(2)
          }
        })
        if (window.innerWidth >= 992) {
          setGridNum(4)
        } else {
          setGridNum(2)
        }
      } else {
        setGridNum(2)
      }

      return () => {
        if (typeof window !== undefined) {
          window.addEventListener("resize", function() {
            if (window.innerWidth >= 992) {
              setGridNum(4)
            } else {
              setGridNum(2)
            }
          })
        }
      }
    })

    const data = useStaticQuery(graphql`
      query CatalogPage {
        allCatalogPage {
          nodes {
            location
            image_1 {
              childImageSharp {
                fluid(jpegQuality: 100) {
                  tracedSVG
                  src
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

    const outdoorCollection = chunk(
      generateCollectionProductCards("Outdoor Living", data),
      gridNum
    )
    const moodCollection = chunk(
      generateCollectionProductCards("Mood", data),
      gridNum
    )
    const discoverCollection = chunk(
      generateCollectionProductCards("Discovery Set", data),
      gridNum
    )
    const homeNight = chunk(
      generateCategoryProductCards("Home Living", "A Nightcap"),
      gridNum
    )
    const homeTravel = chunk(
      generateCategoryProductCards("Home Living", "Our Travels"),
      gridNum
    )
    const homeUnwind = chunk(
      generateCategoryProductCards("Home Living", "Unwind Or"),
      gridNum
    )
    const homeCore = chunk(
      generateCategoryProductCards("Home Living", "At Our Core"),
      gridNum
    )
    const homeInspiring = chunk(
      generateCategoryProductCards("Home Living", "Keep Inspiring"),
      gridNum
    )

    const [test, setTest] = useState(
      catalogGenerator()
    )

    return (
      <Layout>
        <SEO title="The Catalog" author="tillallhours Candle Co." />
        <Banner
          title="The Catalog"
          imageData={data.allCatalogPage.nodes[8].image_1.childImageSharp.fluid}
          pct={85}
          back={"gray"}
          height={37.5}
        />
        <Container className={styles.cont}>
          <Banner
            title={`${data.allCatalogPage.nodes[0].location}`}
            imageData={
              data.allCatalogPage.nodes[0].image_1.childImageSharp.fluid
            }
            pct={75}
            back={"black"}
            height={30}
          />
          <Container className={styles.cont2}>
            <Banner
              title={`${data.allCatalogPage.nodes[1].location}`}
              imageData={
                data.allCatalogPage.nodes[1].image_1.childImageSharp.fluid
              }
              pct={75}
              back={"black"}
              height={20}
            />
            {homeNight.map(cols => (
              <Row>
                {cols.map(col => (
                  <Col sm={12} md={6} lg={3} className={styles.cardCol}>
                    {col}
                  </Col>
                ))}
              </Row>
            ))}
            <Banner
              title={`${data.allCatalogPage.nodes[2].location}`}
              imageData={
                data.allCatalogPage.nodes[2].image_1.childImageSharp.fluid
              }
              pct={75}
              back={"black"}
              height={20}
            />
            {homeTravel.map(cols => (
              <Row>
                {cols.map(col => (
                  <Col sm={12} md={6} lg={3} className={styles.cardCol}>
                    {col}
                  </Col>
                ))}
              </Row>
            ))}
            <Banner
              title={`${data.allCatalogPage.nodes[3].location}`}
              imageData={
                data.allCatalogPage.nodes[3].image_1.childImageSharp.fluid
              }
              pct={75}
              back={"black"}
              height={20}
            />
            {homeUnwind.map(cols => (
              <Row>
                {cols.map(col => (
                  <Col sm={12} md={6} lg={3} className={styles.cardCol}>
                    {col}
                  </Col>
                ))}
              </Row>
            ))}
            <Banner
              title={`${data.allCatalogPage.nodes[4].location}`}
              imageData={
                data.allCatalogPage.nodes[4].image_1.childImageSharp.fluid
              }
              pct={75}
              back={"black"}
              height={20}
            />
            {homeCore.map(cols => (
              <Row>
                {cols.map(col => (
                  <Col sm={12} md={6} lg={3} className={styles.cardCol}>
                    {col}
                  </Col>
                ))}
              </Row>
            ))}
            <Banner
              title={`${data.allCatalogPage.nodes[5].location}`}
              imageData={
                data.allCatalogPage.nodes[5].image_1.childImageSharp.fluid
              }
              pct={75}
              back={"black"}
              height={20}
            />
            {homeInspiring.map(cols => (
              <Row>
                {cols.map(col => (
                  <Col sm={12} md={6} lg={3} className={styles.cardCol}>
                    {col}
                  </Col>
                ))}
              </Row>
            ))}
            <h1>Discovery Set:</h1>
            {discoverCollection.map(cols => (
              <Row>
                {cols.map(col => (
                  <Col sm={12} md={6} lg={3} className={styles.cardCol}>
                    {col}
                  </Col>
                ))}
              </Row>
            ))}
          </Container>
          <Banner
            title={`${data.allCatalogPage.nodes[6].location}`}
            imageData={
              data.allCatalogPage.nodes[6].image_1.childImageSharp.fluid
            }
            pct={75}
            back={"black"}
            height={25}
          />
          {outdoorCollection.map(cols => (
            <Row>
              {cols.map(col => (
                <Col sm={12} md={6} lg={3} className={styles.cardCol}>
                  {col}
                </Col>
              ))}
            </Row>
          ))}
          <Banner
            title={`${data.allCatalogPage.nodes[7].location}`}
            imageData={
              data.allCatalogPage.nodes[7].image_1.childImageSharp.fluid
            }
            pct={75}
            back={"black"}
            height={25}
          />
          {moodCollection.map(cols => (
            <Row>
              {cols.map(col => (
                <Col sm={12} md={6} lg={3} className={styles.cardCol}>
                  {col}
                </Col>
              ))}
            </Row>
          ))}
        </Container>
        <footer>
          <div className="footing">
            <Row>
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                  display: "grid",
                }}
              >
                <p
                  style={{
                    marginBottom: "0.75rem",
                    marginTop: "0.75rem",
                    fontSize: "1.25em",
                  }}
                >
                  Connect With Us:
                </p>
                <div>
                  <a
                    href="http://instagram.com/tillallhours"
                    style={{
                      color: "white",
                      marginLeft: "0.3em",
                      marginRight: "0.3em",
                    }}
                  >
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                  <a
                    href="https://www.pinterest.com/tillallhours"
                    style={{
                      color: "white",
                      marginLeft: "0.3em",
                      marginRight: "0.3em",
                    }}
                  >
                    <i className="fab fa-pinterest fa-lg"></i>
                  </a>
                  <a
                    href="mailto: info@tillallhours.com"
                    style={{
                      color: "white",
                      marginLeft: "0.3em",
                      marginRight: "0.3em",
                    }}
                  >
                    <i className="fas fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "0.75rem",
                }}
              >
                © {new Date().getFullYear()}, tillallhours Candle Co.
              </div>
            </Row>
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
          if (price.node.size === data.allCollections.edges[i].node.sizes[j].sizes_id.id) {
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
      <Link to={`/${node.slug}`}>
        <Card className={styles.card} key={node.id}>
          <Card.Body>
            <Card.Img
              className={styles.cardImg}
              variant="top"
              src={node.image_1.childImageSharp.fluid.src}
              style={{ borderColor: `${node.label_color}` }}
            />
            <Card.Img
              className={styles.cardImg2}
              variant="top"
              src={node.image_3.childImageSharp.fluid.src}
            />
          </Card.Body>
          <Button variant="dark" className={styles.cardBtn}>
            Customize
          </Button>
        </Card>
        <div className={styles.cardTitle}>
          <h4>{node.name}</h4>
          <h6>${printProductPrice(node, data)[0]}</h6>
        </div>
      </Link>
    )
  })
  return productCards
}

function generateCollectionProductCards(collection) {
  var catalog = catalogGenerator()
  var products = catalog[`${collection}`].nodes
  var productCards = []
  products.forEach(node => {
    var id = node.id
    var label = node.label_color
    var name = node.name
    console.log(node)
    node.sizes.forEach(size => {
      console.log('Images')
      console.log(size.images)
      productCards.push(
        <Link to={`/${size.slug}`}>
          <Card className={styles.card} key={id}>
            <Card.Body>
              <Card.Img
                className={styles.cardImg}
                variant="top"
                src={size.images[0].childImageSharp.fluid.src}
                style={{ borderColor: `${label}` }}
              />
              <Card.Img
                className={styles.cardImg2}
                variant="top"
                src={size.images[2].childImageSharp.fluid.src}
              />
            </Card.Body>
            <Button variant="dark" className={styles.cardBtn}>
              Customize
            </Button>
          </Card>
          <div className={styles.cardTitle}>
            <h4>{name}</h4>
            <h6>{size.size}</h6>
          </div>
          <div className={styles.cardPrice}>
            <h6>${size.price}</h6>
          </div>
        </Link>
      )
    })
  })
  return productCards
}

function generateCategoryProductCards(collection, category) {
  var catalog = catalogGenerator()
  var products = catalog[`${collection}`].nodes
  var productCards = []
  products.forEach(node => {
    var id = node.id
    var label = node.label_color
    var name = node.name
    var cat = node.category
    node.sizes.forEach(size => {
      if ( category === cat) {
        productCards.push(
          <Link to={`/${size.slug}`}>
            <Card className={styles.card} key={id}>
              <Card.Body>
                <Card.Img
                  className={styles.cardImg}
                  variant="top"
                  src={size.images[0].childImageSharp.fluid.src}
                  style={{ borderColor: `${label}` }}
                />
                <Card.Img
                  className={styles.cardImg2}
                  variant="top"
                  src={size.images[2].childImageSharp.fluid.src}
                />
              </Card.Body>
              <Button variant="dark" className={styles.cardBtn}>
                Customize
              </Button>
            </Card>
            <div className={styles.cardTitle}>
              <h4>{name}</h4>
              <h6>{size.size}</h6>
            </div>
            <div className={styles.cardPrice}>
              <h6>${size.price}</h6>
            </div>
          </Link>
        )
      }
    })
  })
  return productCards
}

export default CatalogPage