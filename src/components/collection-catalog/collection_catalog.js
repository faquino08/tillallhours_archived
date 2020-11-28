import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { chunk } from "lodash"
import { useStaticQuery, graphql } from "gatsby"
import Card from "react-bootstrap/Card"
import Banner from "../banner-image/banner_image"
import styles from "./collection_catalog.module.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import catalogGenerator from "../../services/cms/directus/candleIntegrator"

export default function CollectionCatalog(collection,category) {
    if ( category === undefined ) {
        var cards = generateCollectionProductCards(collection)
        const rows = chunk(cards, 3)
    }
}

function generateCollectionProductCards(collection) {
  var catalog = catalogGenerator()
  var products = catalog[`${collection}`].nodes
  var productCards = []
  products.forEach(node => {
    var id = node.id
    var label = node.label_color
    var name = node.name
    node.sizes.forEach(size => {
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
            <h6>${size.price}</h6>
          </div>
        </Link>
      )
    })
  })
  return productCards
}