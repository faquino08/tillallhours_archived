import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image" 
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"
import { Carousel } from "react-responsive-carousel"
import styles from "./css/product.module.css"
import ReactHtmlParser from "react-html-parser"
var classNames = require("classnames")
var md = require("markdown-it")()

export default function ProductPage({ location, data }) {
  const product = data.allProduct 
  var genericImages
  var sizeOption = null
  var colorOption = null
  var scentOption = null
  var snipButton = null
  var addCartClasses = classNames("snipcart-add-item", styles.buyBtn)

  const [productOptions, setProduct] = useState({
    collection: data.allCollections.edges[0].node.name,
    size:
      getSize(location) !== null
        ? getSize(location)
        : data.allCollections.edges[0].node.sizes[0].sizes_id.id,
    available_sizes: data.allCollections.edges[0].node.sizes,
    price:
      getSize(location) !== null
        ? printPriceJson(data, data.allProduct)[`${getSize(location)}`]
        : printPriceJson(data, data.allProduct)[
            `${data.allCollections.edges[0].node.sizes[0].sizes_id.id}`
          ],
    available_prices: printPrice(data),
    recommended_scent: printRecScents(data),
    scent1:
      printRecScents(data)[0] !== undefined
        ? printRecScents(data)
        : printScents(data)[0],
    scent2:
      printScents(data)[1] !== null
        ? printScents(data)[1]
        : printScents(data)[0],
    scent3:
      printScents(data)[2] !== null
        ? printScents(data)[2]
        : printScents(data)[0],
    available_scents: printScents(data),
    color: printDefaultColor(data),
    available_colors: printColors(
      data.allCollections.edges[0].node.available_vessel_color
    ),
    weight:
      getSize(location) !== null
        ? printWeightJson(data, data.allProduct)[`${getSize(location)}`]
        : printWeightJson(data, data.allProduct)[
            `${data.allCollections.edges[0].node.sizes[0].sizes_id.id}`
          ],
    test2: printSizeJson(data, data.allProduct),
  })

  const [otherColorOpacity, setColorOpacity] = useState(0)
  const [colorOpacity, setOrigColorOpacity] = useState(1)

  var scentDesc1 = productOptions.scent1
  var scentDesc2 = productOptions.scent2
  var scentDesc3 = productOptions.scent3
  var otherColorStyles = { opacity: otherColorOpacity }
  var ColorStyles = {}

  scentDesc1 = printSelectedScent(printScentDetails(data), 1)
  scentDesc2 = printSelectedScent(printScentDetails(data), 2)
  scentDesc3 = printSelectedScent(printScentDetails(data), 3)
  var scentDescriptions = [scentDesc1, scentDesc2, scentDesc3]

  if (productOptions.collection === "Outdoor Living") {
    ColorStyles = { opacity: colorOpacity }
  }

  if (productOptions.available_sizes.length > 1) {
    sizeOption = (
      <Form.Group>
        <Form.Label>Size:</Form.Label>
        <Form.Control as="select" onChange={handleSize}>
          {productOptions.available_sizes.map(size => {
            if ( size.sizes_id.id === productOptions.size )
            {
              return <option selected>{printSize(data, size.sizes_id.id)}</option>
            } else {
              return <option>{printSize(data, size.sizes_id.id)}</option>
            }
          })}
        </Form.Control>
      </Form.Group>
    )
  }

  if (productOptions.available_colors.length > 1) {
    colorOption = (
      <Form.Group>
        <Form.Label>Color:</Form.Label>
        <Form.Control as="select" onChange={handleColor}>
          {productOptions.available_colors.map(color => {
            if ( productOptions.size === 4 && color === "Silver" ) {
              return <option>{"Gold"}</option>
            } else if ( productOptions.size === 4 && color === "Gold" ) {
              return <option>{"Silver"}</option>
            } 
            return <option>{color}</option>
          })}
        </Form.Control>
      </Form.Group>
    )
  }

  if (productOptions.available_scents.length > 1) {
    scentOption = [
      <Form.Group>
        <Form.Label>Scent:</Form.Label>
        <Form.Control as="select" onChange={handleScent}>
          {productOptions.available_scents.map(scent => {
            if(scent === productOptions.recommended_scent) {
              return <option selected>{scent}</option>
            } else {
              return <option>{scent}</option>
            }
          })}
        </Form.Control>
      </Form.Group>
    ]
    scentDescriptions = [scentDesc1]
  }

  if (productOptions.available_scents.length > 1 && 
      productOptions.collection === "Discovery Set") {
    scentOption = [
      <Form.Group>
        <Form.Label>Scent 1:</Form.Label>
        <Form.Control as="select" onChange={handleScent}>
          {productOptions.available_scents.map(scent => {
            if (scent === productOptions.scent1) {
              return <option selected>{scent}</option>
            } else {
              return <option>{scent}</option>
            }
          })}
        </Form.Control>
      </Form.Group>,
      <Form.Group>
        <Form.Label>Scent 2:</Form.Label>
        <Form.Control as="select" onChange={handleScent2}>
          {productOptions.available_scents.map(scent => {
            if (scent === productOptions.scent2) {
              return <option selected>{scent}</option>
            } else {
              return <option>{scent}</option>
            }
          })}
        </Form.Control>
      </Form.Group>,
      <Form.Group>
        <Form.Label>Scent 3:</Form.Label>
        <Form.Control as="select" onChange={handleScent3}>
          {productOptions.available_scents.map(scent => {
            if (scent === productOptions.scent3) {
              return <option selected>{scent}</option>
            } else {
              return <option>{scent}</option>
            }
          })}
        </Form.Control>
      </Form.Group>
    ]
    scentDescriptions = [scentDesc1, scentDesc2, scentDesc3]
  }

  if(productOptions.collection === "Discovery Set") {
    snipButton = (
      <Button
        className={addCartClasses}
        data-item-id={`${product.edges[0].node.id}-${productOptions.size}`}
        data-item-name={product.edges[0].node.name}
        data-item-price={parseFloat(printPrice(data)[0])}
        data-item-url={`https://tillallhours.com/products/${product.edges[0].node.slug}/size=${productOptions.size}.json`}
        data-item-weight={productOptions.weight}
        data-item-custom1-name="Size"
        data-item-custom1-options={printSnipOptions(
          setOptionsPriceDiff(
            printSizes(data, data.allCollections.edges[0].node.sizes),
            getPriceDifferentials(printPrice(data))
          )
        )}
        data-item-custom1-value={printSize(data, productOptions.size)}
        data-item-custom2-name="Scent 1"
        data-item-custom2-options={printSnipOptions(printScents(data))}
        data-item-custom2-value={productOptions.scent1}
        data-item-custom3-name="Scent 2"
        data-item-custom3-options={printSnipOptions(printScents(data))}
        data-item-custom3-value={productOptions.scent2}
        data-item-custom4-name="Scent 3"
        data-item-custom4-options={printSnipOptions(printScents(data))}
        data-item-custom4-value={productOptions.scent3}
        data-item-custom5-name="Color"
        data-item-custom5-options={printSnipOptions(
          printColors(data.allCollections.edges[0].node.available_vessel_color)
        )}
        data-item-custom5-value={productOptions.color}
        variant="primary"
        type="submit"
      >
        Add to cart
      </Button>
    )
  } else {
    snipButton = (
      <Button
        className={addCartClasses}
        data-item-id={`${product.edges[0].node.id}-${productOptions.size}`}
        data-item-name={product.edges[0].node.name}
        data-item-price={parseFloat(printPrice(data)[0])}
        data-item-url={`https://tillallhours.com/products/${product.edges[0].node.slug}/size=${productOptions.size}.json`}
        data-item-weight={productOptions.weight}
        data-item-custom1-name="Size"
        data-item-custom1-options={printSnipOptions(
          setOptionsPriceDiff(
            printSizes(data, data.allCollections.edges[0].node.sizes),
            getPriceDifferentials(printPrice(data))
          )
        )}
        data-item-custom1-value={printSize(data, productOptions.size)}
        data-item-custom2-name="Scent"
        data-item-custom2-options={printSnipOptions(printScents(data))}
        data-item-custom2-value={productOptions.scent1}
        data-item-custom3-name="Color"
        data-item-custom3-options={printSnipOptions(
          printColors(data.allCollections.edges[0].node.available_vessel_color)
        )}
        data-item-custom3-value={productOptions.color}
        variant="primary"
        type="submit"
      >
        Add to cart
      </Button>
    )
  }

  function handleSize(event) {
    var sizeId = printSizeJson(data, data.allProduct)[`${event.target.value}`]
    setProduct({
      ...productOptions,
      size: printSizeJson(data, data.allProduct)[`${event.target.value}`],
      color: updateDefaultColor(data, sizeId),
      weight: printWeightJson(data, data.allProduct)[`${sizeId}`],
    })
  }

  function handleScent(event) {
    setProduct({ ...productOptions, scent1: event.target.value })
    scentDesc1 = printSelectedScent(printScentDetails(data), 1)
  }

  function handleScent2(event) {
    setProduct({ ...productOptions, scent2: event.target.value })
    scentDesc2 = printSelectedScent(printScentDetails(data), 2)
  }

  function handleScent3(event) {
    setProduct({ ...productOptions, scent3: event.target.value })
    scentDesc3 = printSelectedScent(printScentDetails(data), 3)
  }

  function handleColor(event) {
    setProduct({ ...productOptions, 
                      color: event.target.value })
  }

  function renderGenericImages(images, genImages) {
    var productImages = []
    for (var h = 0; h < data.allAlternativeProductImages.edges.length; h++) {
      if( productOptions.size === data.allAlternativeProductImages.edges[h].node.size ) {
        for (var j = 0; j < images.length + 1; j++) {
          if (j === 0) {
            if (genImages.length === 0) {
              productImages.push(
                <div style={{ width: `100%` }}>
                  <Img
                    fluid={
                      data.allAlternativeProductImages.edges[h].node.image_1
                        .childImageSharp.fluid
                    }
                    backgroundColor="transparent"
                    className={styles.firstColor}
                  />
                </div>
              )
            } else {
              productImages.push(
                <div style={{ width: `100%` }}>
                  <Img
                    fluid={genImages[genImages.length - 1]}
                    backgroundColor="transparent"
                    className={styles.otherColor}
                    style={otherColorStyles}
                  />
                  <Img
                    fluid={
                      data.allAlternativeProductImages.edges[h].node.image_1
                        .childImageSharp.fluid
                    }
                    backgroundColor="transparent"
                    className={styles.firstColor}
                    style={ColorStyles}
                  />
                </div>
              )
            }
          } else if (j === 1) {
            if (genImages.length === 1 || genImages.length === 0) {
                if (
                  data.allAlternativeProductImages.edges[h].node.image_2
                    .childImageSharp.fluid !== undefined
                ) {
                  productImages.push(
                    <div style={{ width: `100%` }}>
                      <Img
                        fluid={
                          data.allAlternativeProductImages.edges[h].node.image_2
                            .childImageSharp.fluid
                        }
                        backgroundColor="transparent"
                        className={styles.firstColor}
                      />
                    </div>
                  )
                }
            } else {
              productImages.push(
                <div style={{ width: `100%` }}>
                  <Img
                    fluid={genImages[1]}
                    backgroundColor="transparent"
                    className={styles.otherColor}
                    style={otherColorStyles}
                  />
                  <Img
                    fluid={genImages[0]}
                    backgroundColor="transparent"
                    className={styles.firstColor}
                    style={ColorStyles}
                  />
                </div>
              )
            }
          } else {
            if (genImages.length === 1 || genImages.length === 0) {
              if (j === 2) {
                if (
                  data.allAlternativeProductImages.edges[h].node.image_3
                    .childImageSharp.fluid !== undefined
                ) {
                  productImages.push(
                    <div style={{ width: `100%` }}>
                      <Img
                        fluid={
                          data.allAlternativeProductImages.edges[h].node.image_3
                            .childImageSharp.fluid
                        }
                        backgroundColor="transparent"
                      />
                    </div>
                  )
                }
              } 
            } else {
              if (j === 2) {
                if (
                  data.allAlternativeProductImages.edges[h].node.image_2
                    .childImageSharp.fluid !== undefined
                ) {
                  productImages.push(
                    <div style={{ width: `100%` }}>
                      <Img
                        fluid={
                          data.allAlternativeProductImages.edges[h].node.image_2
                            .childImageSharp.fluid
                        }
                        backgroundColor="transparent"
                      />
                    </div>
                  )
                }
              } else if (j === 3) {
                if (
                  data.allAlternativeProductImages.edges[h].node.image_3
                    .childImageSharp.fluid !== undefined
                ) {
                  productImages.push(
                    <div style={{ width: `100%` }}>
                      <Img
                        fluid={
                          data.allAlternativeProductImages.edges[h].node.image_3
                            .childImageSharp.fluid
                        }
                        backgroundColor="transparent"
                      />
                    </div>
                  )
                }
              } 
            }
          }
        }
      } else {
        for (var i = 0; i < images.length + 1; i++) {
          if (i === 0) {
            if (genImages.length === 0) {
              productImages.push(
                <div style={{ width: `100%` }}>
                  <Img
                    fluid={images[i].fluid}
                    backgroundColor="transparent"
                    className={styles.firstColor}
                  />
                </div>
              )
            } else {
              productImages.push(
                <div style={{ width: `100%` }}>
                  <Img
                    fluid={genImages[genImages.length - 1]}
                    backgroundColor="transparent"
                    className={styles.otherColor}
                    style={otherColorStyles}
                  />
                  <Img
                    fluid={images[i].fluid}
                    backgroundColor="transparent"
                    className={styles.firstColor}
                    style={ColorStyles}
                  />
                </div>
              )
            }
          } else if (i === 1) {
            if (genImages.length === 1 || genImages.length === 0) {
              productImages.push(
                <div style={{ width: `100%` }}>
                  <Img
                    fluid={images[i].fluid}
                    backgroundColor="transparent"
                    className={styles.firstColor}
                  />
                </div>
              )
            } else {
              productImages.push(
                <div style={{ width: `100%` }}>
                  <Img
                    fluid={genImages[1]}
                    backgroundColor="transparent"
                    className={styles.otherColor}
                    style={otherColorStyles}
                  />
                  <Img
                    fluid={genImages[0]}
                    backgroundColor="transparent"
                    className={styles.firstColor}
                    style={ColorStyles}
                  />
                </div>
              )
            }
          } else {
            if (genImages.length === 1 || genImages.length === 0) {
              if (images[i] !== undefined) {
                productImages.push(
                  <div style={{ width: `100%` }}>
                    <Img
                      fluid={images[i].fluid}
                      backgroundColor="transparent"
                    />
                  </div>
                )
              }
            } else {
              productImages.push(
                <div style={{ width: `100%` }}>
                  <Img
                    fluid={images[i - 1].fluid}
                    backgroundColor="transparent"
                  />
                </div>
              )
            }
          }
        }
      }
    }

    if ( data.allAlternativeProductImages.edges.length === 0 ) {
      for (var i = 0; i < images.length + 1; i++) {
        if (i === 0) {
          if (genImages.length === 0) {
            productImages.push(
              <div style={{ width: `100%` }}>
                <Img
                  fluid={images[i].fluid}
                  backgroundColor="transparent"
                  className={styles.firstColor}
                />
              </div>
            )
          } else {
            productImages.push(
              <div style={{ width: `100%` }}>
                <Img
                  fluid={genImages[genImages.length - 1]}
                  backgroundColor="transparent"
                  className={styles.otherColor}
                  style={otherColorStyles}
                />
                <Img
                  fluid={images[i].fluid}
                  backgroundColor="transparent"
                  className={styles.firstColor}
                  style={ColorStyles}
                />
              </div>
            )
          }
        } else if (i === 1) {
          if (genImages.length === 1 || genImages.length === 0) {
            productImages.push(
              <div style={{ width: `100%` }}>
                <Img
                  fluid={images[i].fluid}
                  backgroundColor="transparent"
                  className={styles.firstColor}
                />
              </div>
            )
          } else {
            productImages.push(
              <div style={{ width: `100%` }}>
                <Img
                  fluid={genImages[1]}
                  backgroundColor="transparent"
                  className={styles.otherColor}
                  style={otherColorStyles}
                />
                <Img
                  fluid={genImages[0]}
                  backgroundColor="transparent"
                  className={styles.firstColor}
                  style={ColorStyles}
                />
              </div>
            )
          }
        } else {
          if (genImages.length === 1 || genImages.length === 0) {
            if (images[i] !== undefined) {
              productImages.push(
                <div style={{ width: `100%` }}>
                  <Img fluid={images[i].fluid} backgroundColor="transparent" />
                </div>
              )
            }
          } else {
            productImages.push(
              <div style={{ width: `100%` }}>
                <Img
                  fluid={images[i - 1].fluid}
                  backgroundColor="transparent"
                />
              </div>
            )
          }
        }
      }
    }

    return productImages
    /*if (index === 0) {
      return (
        <>
          <>
            <div style={{ width: `100%` }}>
              <img
                src={images[images.length - 1].src}
                //backgroundColor="transparent"
              />
              <img src={node.fluid.src} backgroundColor="transparent" />
            </div>
          </>
          <>
            <div style={{ width: `100%` }}>
              <Img
                fluid={images[1]}
                backgroundColor="transparent"
              />
              <Img
                fluid={images[0]}
                backgroundColor="transparent"
              />
            </div>
          </>
        </>
      )
    }*/
  }

  useEffect(() => {
    genericImages = changeGenericImageSizes(data, data.allGenericProductImages, productOptions)
    for ( var i = 0; i < data.allGenericProductImages.edges.length; i++) {
      if( data.allGenericProductImages.edges[i].node.name === "candle-rear"
          && data.allGenericProductImages.edges[i].node.size.id === productOptions.size ) {
        var color = printColor(parseInt(data.allGenericProductImages.edges[i].node.vessel_color))
      }
    }
    if (productOptions.color !== color) {
      setColorOpacity(1)
      setOrigColorOpacity(0)
    } else {
      setColorOpacity(0)
      setOrigColorOpacity(1)
    }
  })

  function printDefaultColor(data) {
    var size = getSize(location) !== null
        ? getSize(location)
        : data.allCollections.edges[0].node.sizes[0].sizes_id.id;
    for (var i = 0; i < data.allGenericProductImages.edges.length; i++) {
      if (
        data.allGenericProductImages.edges[i].node.name === "candle-rear" &&
        data.allGenericProductImages.edges[i].node.size.id === size
      ) {
        var color = printColor(
          parseInt(data.allGenericProductImages.edges[i].node.vessel_color)
        )
        return color
      }
    }
  }

  function updateDefaultColor(data, newSize) {
    for (var i = 0; i < data.allGenericProductImages.edges.length; i++) {
      if (
        data.allGenericProductImages.edges[i].node.name === "candle-rear" &&
        data.allGenericProductImages.edges[i].node.size.id === newSize
      ) {
        var color = printColor(
          parseInt(data.allGenericProductImages.edges[i].node.vessel_color)
        )
        return color
      }
    }
  }

  function printSelectedScent(scents,num) {
    if (Object.keys(scents).length > 0) {
      for (const [key, value] of Object.entries(scents)) {
        if (String(key) === String(productOptions[`scent${num}`])) {
          return (
            <Card.Body>
              <h5>{key}</h5>
              {ReactHtmlParser(value)}
            </Card.Body>
          )
        }
      }
    }
  }

  function getSize(location) {
    var size = null
    if(location.search !== "") {
      var fields = location.search
      if (fields.substring(1, 6) === "size=") {
        for (var i = 0; i < data.allCollections.edges[0].node.sizes.length; i++) {
          if (parseInt(fields.substring(6)) === 
          data.allCollections.edges[0].node.sizes[i].sizes_id.id){
            size = parseInt(fields.substring(6))
          }
        }
      }
    }
    return size;
  }

  return (
    <Layout>
      <SEO title={`${product.edges[0].node.name}`} author="tillallhours Candle Co." />
      <Row style={{ width: `100%`, margin: 0 }} className={styles.mainSection}>
        <Col md={6} xs={12} className={styles.imageSection}>
          <Carousel
            infiniteLoop
            //autoPlay
            dynamicHeight={true}
            style={{ width: `100%` }}
            showThumbs={false}
          >
            {/*images.map((node, index) => {
              if ( index === 0 ) {
                return (*/
            renderGenericImages(
              data.allImageSharp.nodes,
              changeGenericImageSizes(
                data,
                data.allGenericProductImages,
                productOptions
              )
            ).map(node => node) //)
            /*} else {
                return (
                  <div style={{ width: `100%` }}>
                    <Img fluid={node.fluid} backgroundColor="transparent" />
                  </div>
                )
              }
            })*/
            }
          </Carousel>
        </Col>
        <Col md={6} xs={12} className={styles.infoSection}>
          <h1>{product.edges[0].node.name}</h1>
          <p className={styles.collName}>
            {data.allCollections.edges[0].node.name}
          </p>
          <h5>
            ${printPriceJson(data, data.allProduct)[`${productOptions.size}`]}
          </h5>
          <p className={styles.descSection}>
            {product.edges[0].node.description}
          </p>
          <Form>
            {sizeOption}
            {colorOption}
            {scentOption}
          </Form>
          {snipButton}
          <Accordion className={styles.accordion}>
            <Card className={styles.accordionHeader}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="flat"
                  eventKey="0"
                  className={styles.accordionBtn}
                >
                  Scent Descriptions
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className={styles.descSection}>
                  {scentDescriptions}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className={styles.accordionHeader}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="flat"
                  eventKey="1"
                  className={styles.accordionBtn}
                >
                  {data.allProductPage.edges[0].node.accordion_title}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body className={styles.acc0}>
                  <h4>
                    {data.allProductPage.edges[0].node.accordion_subtitle}
                  </h4>
                  {ReactHtmlParser(
                    md.render(data.allProductPage.edges[0].node.body)
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className={styles.accordionHeader}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="flat"
                  eventKey="2"
                  className={styles.accordionBtn}
                >
                  {data.allProductPage.edges[1].node.accordion_title}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body className={styles.acc1}>
                  <h4>
                    {data.allProductPage.edges[1].node.accordion_subtitle}
                  </h4>
                  {ReactHtmlParser(
                    md.render(data.allProductPage.edges[1].node.body)
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className={styles.accordionHeader}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="flat"
                  eventKey="3"
                  className={styles.accordionBtn}
                >
                  {data.allProductPage.edges[2].node.accordion_title}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body className={styles.acc2}>
                  <h4>
                    {data.allProductPage.edges[2].node.accordion_subtitle}
                  </h4>
                  {ReactHtmlParser(
                    md.render(data.allProductPage.edges[2].node.body)
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>

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

export const query = graphql`
         query($id: String!, $collection: String!) {
           allProduct(filter: { id: { eq: $id } }) {
             edges {
               node {
                 id
                 slug
                 name
                 description
                 featured
                 collection
                 category
                 recommended_scent
               }
             }
           }
           allImageSharp(filter: { parent: { parent: { id: { eq: $id } } } }) {
             nodes {
               fluid(maxWidth: 600) {
                 ...GatsbyImageSharpFluid_noBase64
               }
             }
           }
           allCollections(filter: { id: { eq: $collection } }) {
             edges {
               node {
                 available_vessel_color
                 name
                 id
                 scents {
                   scent
                 }
                 sizes {
                   sizes_id { 
                     id 
                     weight
                   }
                 }
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
           allScents {
             edges {
               node {
                 id
                 name
                 scent_description
                 description
               }
             }
           }
           allGenericProductImages(
             filter: {
               collections: {
                 elemMatch: { collections_id: { eq: $collection } }
               }
             }
           ) {
             edges {
               node {
                 id
                 name
                 size {
                   id
                 }
                 image_1 {
                   childImageSharp {
                     fluid(maxWidth: 600) {
                       ...GatsbyImageSharpFluid_noBase64
                     }
                   }
                 }
                 vessel_color
               }
             }
           }
           allAlternativeProductImages(
             filter: { related_product: { eq: $id } }
           ) {
             edges {
               node {
                 color
                 id
                 size
                 related_product
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
           allProductPage {
             edges {
               node {
                 accordion_title
                 accordion_subtitle
                 accordion_body
                 body
               }
             }
           }
         }
       `

function printCollection(index) {
  let collect;
  switch (index) {
    case 1:
      collect = "Home Living";
      break;
    case 2:
      collect = "Outdoor Living"
      break;
    case 3:
      collect = "Mood"
      break;
    case 4:
      collect = "Discovery Set"
      break;
    case 5:
      collect = "custom"
      break;
  }
  return collect;
}

function printSizes(data, indexArray) {
  let sizeArr = []
  indexArray.forEach(index => {
    switch (index.sizes_id.id) {
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
  })
  return sizeArr
}

function printSize(data, index) {
  var sizeArr
  
  switch (index) {
    case 1:
      sizeArr = data.allSizes.edges[0].node.size
      break
    case 2:
      sizeArr = data.allSizes.edges[1].node.size
      break
    case 3:
      sizeArr = data.allSizes.edges[2].node.size
      break
    case 4:
      sizeArr = data.allSizes.edges[3].node.size
      break
    case 5:
      sizeArr = data.allSizes.edges[4].node.size
      break
  }
  return sizeArr
}

function printColor(index) {
  let color
  switch (index) {
    case 0:
      color = "Gold"
      break
    case 1:
      color = "Silver"
      break
    case 2:
      color = "Dark Gray Stone"
      break
    case 3:
      color = "Light Gray Stone"
      break
    case 4:
      color = "Multicolor"
      break
  }
  return color
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
  });
  return colorArr;
}

function printScents(data) {
  let scentArr = [];

  for(var i = 0; i < data.allCollections.edges[0].node.scents.length; i++) {
    for (var j = 0; j < data.allScents.edges.length; j++) {
      if (
        data.allScents.edges[j].node.id ===
        data.allCollections.edges[0].node.scents[i].scent
      ) {
        scentArr.push(data.allScents.edges[j].node.name)
      }
    }
  }
  return scentArr;
}

function printScentDetails(data) {
  let scentDetailArr = {}

  for (var i = 0; i < data.allCollections.edges[0].node.scents.length; i++) {
    for (var j = 0; j < data.allScents.edges.length; j++) {
      if (
        data.allScents.edges[j].node.id ===
        data.allCollections.edges[0].node.scents[i].scent
      ) {
        var desc = md.render(data.allScents.edges[j].node.description);
        scentDetailArr[`${data.allScents.edges[j].node.name}`] = desc
      }
    }
  }
  return scentDetailArr
}

function printRecScents(data) {
  let recScent = [];
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

function printSnipOptions(category) {
  let options = ``
  category.forEach((option,index) =>{
    if (index === 0) {
      options += `${option}`
    } else {
      options += `|${option}`
    }
  })
  return options
}

function printPrice(data) {
  const listPrices = [];
  data.allPriceTable.edges.map(price =>{
    for (var i =0; i < data.allCollections.edges[0].node.sizes.length; i++) {
      if(price.node.size === data.allCollections.edges[0].node.sizes[i].sizes_id.id) {
        listPrices.push(price.node.price)
      }
    }
  })
  listPrices.sort()
  return listPrices
}

function getPriceDifferentials(priceArray) {
  const listPriceArr = [];
  priceArray.map((price,index) => {
    if(index === 0) {
      listPriceArr.push(price);
    } else {
      var difference = price - listPriceArr[0]
      listPriceArr.push(difference)
    }
  })
  return listPriceArr
}

function setOptionsPriceDiff(sizeArr, priceArr) {
  var sizePriceArr = [];
  for(var i = 0; i < priceArr.length; i++) {
    if (i === 0) {
      sizePriceArr.push(`${sizeArr[i]}`)
    } else {
      sizePriceArr.push(
        `${sizeArr[i]}[+${priceArr[i].toFixed(2)}]`
      )
    }
  }
  return sizePriceArr
}

function printPriceJson(data, product) {
  const listPrices = {}
  for (var i = 0; i < Object.size(data.allCollections.edges[0]); i++) {
    if (product.edges[0].node.collection === data.allCollections.edges[0].node/*[i]*/.id) {
      data.allPriceTable.edges.map(price => {
        for ( var j = 0; j < data.allCollections.edges[0].node.sizes.length; j++ ) {
          if ( price.node.size === data.allCollections.edges[0].node/*[i]*/.sizes[j].sizes_id.id ) {
            listPrices[`${price.node.size}`] = price.node.price
          }
        }
      })
    }
  }
  return listPrices
}

function printWeightJson(data, product) {
  const listWeights = {}
  var sizeId
  for (var i = 0; i < Object.size(data.allCollections.edges[0]); i++) {
    if (product.edges[0].node.collection === data.allCollections.edges[0].node/*[i]*/.id) {
      data.allSizes.edges.map(size => {
        for ( var j = 0; j < data.allCollections.edges[0].node.sizes.length; j++ ) {
          switch (size.node.size) {
            case data.allSizes.edges[0].node.size:
              sizeId = 1
              break
            case data.allSizes.edges[1].node.size:
              sizeId = 2
              break
            case data.allSizes.edges[2].node.size:
              sizeId = 3
              break
            case data.allSizes.edges[3].node.size:
              sizeId = 4
              break
            case data.allSizes.edges[4].node.size:
              sizeId = 5
              break
          }
          if (
            sizeId ===
            data.allCollections.edges[0].node /*[i]*/.sizes[j].sizes_id.id
          ) {
            listWeights[`${sizeId}`] =
              data.allCollections.edges[0].node /*[i]*/.sizes[j].sizes_id.weight
          }
        }
      })
    }
  }
  return listWeights
}

function printSizeJson(data, product) {
  const listSizes = {}
  var sizeid
  for (var i = 0; i < Object.size(data.allCollections.edges[0]); i++) {
    if (product.edges[0].node.collection === data.allCollections.edges[0].node/*[i]*/.id) {
      data.allSizes.edges.map(size => {
        for ( var j = 0; j < data.allCollections.edges[0].node.sizes.length; j++ ) {
          switch (size.node.size) {
            case data.allSizes.edges[0].node.size:
              sizeid = 1
              break
            case data.allSizes.edges[1].node.size:
              sizeid = 2
              break
            case data.allSizes.edges[2].node.size:
              sizeid = 3
              break
            case data.allSizes.edges[3].node.size:
              sizeid = 4
              break
            case data.allSizes.edges[4].node.size:
              sizeid = 5
              break
          }
          if (
            sizeid ===
            data.allCollections.edges[0].node /*[i]*/.sizes[j].sizes_id.id
          ) {
            listSizes[`${size.node.size}`] = sizeid
          }
        }
      })
    }
  }
  return listSizes
}

Object.size = function(obj) {
  var size = 0,
    key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++
  }
  return size
}

function changeGenericImageSizes(data, array, product) {
  var sizeArr = []
  var imgObj = {}
  var imgArr = []
  if(product !== undefined) {
    for (var i = 0; i < array.edges.length; i++) {
      switch ( printSizeJson(data,data.allProduct)[`${array.edges[i].node.size.id}`]) {
        case 1:
          array.edges[i].node.size.id = data.allSizes.edges[0].node.size
          sizeArr.push(data.allSizes.edges[0].node.size)
          break
        case 2:
          array.edges[i].node.size.id = data.allSizes.edges[1].node.size
          sizeArr.push(data.allSizes.edges[1].node.size)
          break
        case 3:
          array.edges[i].node.size.id = data.allSizes.edges[2].node.size
          sizeArr.push(data.allSizes.edges[2].node.size)
          break
        case 4:
          array.edges[i].node.size.id = data.allSizes.edges[3].node.size
          sizeArr.push(data.allSizes.edges[3].node.size)
          break
        case 5:
          array.edges[i].node.size.id = data.allSizes.edges[4].node.size
          sizeArr.push(data.allSizes.edges[4].node.size)
          break
      }
      if (product.size === array.edges[i].node.size.id) {
        imgArr.push(array.edges[i].node.image_1.childImageSharp.fluid)
      }
    }
  }
  return imgArr
}

function printScentList(scents) {
  var scentList = []
  if (Object.keys(scents).length > 0) {
    for (const [key, value] of Object.entries(scents)) {
      scentList.push(
        <Card.Body>
          <h4>{key}</h4>
          <p>
            {
              value.split('\n').map((item, i) => {
                return <p key={i}>{item}</p>
              })
            }
          </p>
        </Card.Body>
      )
    }
  } else {
    var randomScent = "We will pick three random scents from our catalog to see which one is your favorite."
      scentList.push(randomScent)
  }
  return scentList
}