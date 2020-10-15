import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image" 
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"
import { Carousel } from "react-responsive-carousel"
import styles from "./css/product.module.css"
var classNames = require("classnames")

export default function ProductPage({ data }) {
  const product = data.allProduct 
  var genericImages
  var sizeOption = null
  var colorOption = null
  var scentOption = null
  var snipButton = null
  var addCartClasses = classNames("snipcart-add-item", styles.buyBtn)

  const [productOptions, setProduct] = useState({
    collection: data.allCollections.edges[0].node.name,
    size: printSizes(data, data.allCollections.edges[0].node.sizes)[0],
    available_sizes: printSizes(data, data.allCollections.edges[0].node.sizes),
    price: printPrice(data)[0],
    available_prices: printPrice(data),
    recommended_scent: printRecScents(data),
    scent: printScents(data)[0],
    scent2: printScents(data)[0],
    scent3: printScents(data)[0],
    available_scents: printScents(data),
    color: printColors(
      data.allCollections.edges[0].node.available_vessel_color
    )[0],
    available_colors: printColors(
      data.allCollections.edges[0].node.available_vessel_color
    ),
    test: data.allCollections,
    test2: printScentList(printScentDetails(data)),
  })

  const [otherColorOpacity, setColorOpacity] = useState(0)
  const [colorOpacity, setOrigColorOpacity] = useState(1)

  var otherColorStyles = { opacity: otherColorOpacity }
  var ColorStyles = {}

  if (productOptions.collection === "Outdoor Living") {
    ColorStyles = { opacity: colorOpacity }
  }

  if (productOptions.available_sizes.length > 1) {
    sizeOption = (
      <Form.Group>
        <Form.Label>Size:</Form.Label>
        <Form.Control as="select" onChange={handleSize}>
          {productOptions.available_sizes.map(size => {
            if (size === "13 oz.") {
              return <option disabled>{size} Coming Soon!</option>
            } else {
              return <option>{size}</option>
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
          {productOptions.available_colors.map(color => (
            <option>{color}</option>
          ))}
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
  }

  if (productOptions.available_scents.length > 1 && 
      productOptions.collection === "Discovery Set") {
    scentOption = [
      <Form.Group>
        <Form.Label>Scent 1:</Form.Label>
        <Form.Control as="select" onChange={handleScent}>
          {productOptions.available_scents.map(scent => {
            if (scent === productOptions.recommended_scent) {
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
            if (scent === productOptions.recommended_scent) {
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
            if (scent === productOptions.recommended_scent) {
              return <option selected>{scent}</option>
            } else {
              return <option>{scent}</option>
            }
          })}
        </Form.Control>
      </Form.Group>
    ]
  }

  if(productOptions.collection === "Discovery Set") {
    snipButton = (
      <Button
        className={addCartClasses}
        data-item-id={product.edges[0].node.id}
        data-item-name={product.edges[0].node.name}
        data-item-price={parseFloat(printPrice(data)[0])}
        data-item-url={`http://05dbc1cc038e.ngrok.io/products/${product.edges[0].node.slug}.json`}
        data-item-custom1-name="Size"
        data-item-custom1-options={printSnipOptions(
          setOptionsPriceDiff(
            printSizes(data, data.allCollections.edges[0].node.sizes),
            getPriceDifferentials(printPrice(data))
          )
        )}
        data-item-custom1-value={productOptions.size}
        data-item-custom2-name="Scent 1"
        data-item-custom2-options={printSnipOptions(printScents(data))}
        data-item-custom2-value={productOptions.scent}
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
        data-item-id={product.edges[0].node.id}
        data-item-name={product.edges[0].node.name}
        data-item-price={parseFloat(printPrice(data)[0])}
        data-item-url={`http://05dbc1cc038e.ngrok.io/products/${product.edges[0].node.slug}.json`}
        data-item-custom1-name="Size"
        data-item-custom1-options={printSnipOptions(
          setOptionsPriceDiff(
            printSizes(data, data.allCollections.edges[0].node.sizes),
            getPriceDifferentials(printPrice(data))
          )
        )}
        data-item-custom1-value={productOptions.size}
        data-item-custom2-name="Scent"
        data-item-custom2-options={printSnipOptions(printScents(data))}
        data-item-custom2-value={productOptions.scent}
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
    setProduct({ ...productOptions, 
                      size: event.target.value })
  }

  function handleScent(event) {
    setProduct({ ...productOptions, 
                      scent: event.target.value })
  }

  function handleScent2(event) {
    setProduct({ ...productOptions, scent2: event.target.value })
  }

  function handleScent3(event) {
    setProduct({ ...productOptions, scent3: event.target.value })
  }

  function handleColor(event) {
    setProduct({ ...productOptions, 
                      color: event.target.value })
  }

  function renderGenericImages(images, genImages) {
    console.log("Render Generic Images: ")
    var productImages = []
    for (var i = 0; i < (images.length + 1); i++) {
      if ( i === 0 ) {
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
      } else if ( i === 1 ) {
        if ((genImages.length === 1) || (genImages.length === 0)) {
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
        if ((genImages.length === 1) || (genImages.length === 0)) {
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
              <Img fluid={images[i - 1].fluid} backgroundColor="transparent" />
            </div>
          )
        }
      }
    }
    console.log(productImages)
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
    if (productOptions.color !== productOptions.available_colors[0] ) {
      setColorOpacity(1)
      setOrigColorOpacity(0)
    } else {
      setColorOpacity(0)
      setOrigColorOpacity(1)
    }
  })

  return (
    <Layout>
      <Row style={{ width: `100%`, margin: 0 }} className={styles.mainSection}>
        <Col md={4} xs={12} className={styles.imageSection}>
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
        <Col md={8} xs={12} className={styles.infoSection}>
          <h1>{product.edges[0].node.name}</h1>
          <p className={styles.collName}>
            {data.allCollections.edges[0].node.name}
          </p>
          <h5>${productOptions.price}</h5>
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
                <Card.Body>
                  {printScentList(printScentDetails(data)).map(node => node)}
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
                <Card.Body>
                  <h5>
                    {data.allProductPage.edges[0].node.accordion_subtitle}
                  </h5>
                  {data.allProductPage.edges[0].node.accordion_body
                    .split("\n")
                    .map((item, i) => {
                      return <p key={i}>{item}</p>
                    })}
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
                <Card.Body>
                  <h5>
                    {data.allProductPage.edges[1].node.accordion_subtitle}
                  </h5>
                  {data.allProductPage.edges[1].node.accordion_body
                    .split("\n")
                    .map((item, i) => {
                      return <p key={i}>{item}</p>
                    })}
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
                <Card.Body>
                  {data.allProductPage.edges[2].node.accordion_body
                    .split("\n")
                    .map((item, i) => {
                      return <p key={i}>{item}</p>
                    })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>

      <footer>
        <div className="footing">
          © {new Date().getFullYear()}, tillallhours Candle Co.
        </div>
      </footer>
    </Layout>
  )
}

export const query = graphql`
    query($slug: String!, $id: String!, $collection: String!) {
      allProduct(filter: {slug: {eq: $slug}}) {
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
      allImageSharp(filter: {parent: {parent: {id: {eq: $id}}}}) {
        nodes {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      allCollections(filter: {id: {eq: $collection}}) {
        edges {
          node {
            available_vessel_color
            name
            id
            scents {
              scent
            }
            sizes {
              sizes_id
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
          }
        }
      }
      allGenericProductImages {
        edges {
          node {
            id
            name
            size
            image_1 {
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
    switch (index.sizes_id) {
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
        scentDetailArr[`${data.allScents.edges[j].node.name}`] =
          data.allScents.edges[j].node.scent_description
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
      if (String(option) !== "13 oz.") {
        options += `${option}`
      }
    } else {
      if (option.substr(0,6) !== "13 oz.") {
        options += `|${option}`
      }
    }
  })
  return options
}

function printPrice(data) {
  const listPrices = [];
  data.allPriceTable.edges.map(price =>{
    for (var i =0; i < data.allCollections.edges[0].node.sizes.length; i++) {
      if(price.node.size === data.allCollections.edges[0].node.sizes[i].sizes_id) {
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
  const listPrices = []
  for (var i = 0; i < Object.size(data.allCollections.edges[0]); i++) {
    if (product.edges[0].node.collection === data.allCollections.edges[0].node/*[i]*/.id) {
      data.allPriceTable.edges.map(price => {
        for ( var j = 0; j < data.allCollections.edges[0].node.sizes.length; j++ ) {
          if ( price.node.size === data.allCollections.edges[0].node/*[i]*/.sizes[j].sizes_id ) {
            listPrices.push(price.node.price)
          }
        }
      })
    }
  }
  return listPrices
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
      switch (array.edges[i].node.size) {
        case 1:
          array.edges[i].node.size = data.allSizes.edges[0].node.size
          sizeArr.push(data.allSizes.edges[0].node.size)
          break
        case 2:
          array.edges[i].node.size = data.allSizes.edges[1].node.size
          sizeArr.push(data.allSizes.edges[1].node.size)
          break
        case 3:
          array.edges[i].node.size = data.allSizes.edges[2].node.size
          sizeArr.push(data.allSizes.edges[2].node.size)
          break
        case 4:
          array.edges[i].node.size = data.allSizes.edges[3].node.size
          sizeArr.push(data.allSizes.edges[3].node.size)
          break
        case 5:
          array.edges[i].node.size = data.allSizes.edges[4].node.size
          sizeArr.push(data.allSizes.edges[4].node.size)
          break
      }
      if (product.size === array.edges[i].node.size) {
        imgArr.push(array.edges[i].node.image_1.childImageSharp.fluid)
      }
    }
  }
  console.log(imgArr)
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