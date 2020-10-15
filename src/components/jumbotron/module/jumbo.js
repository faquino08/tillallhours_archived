import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./jumbo.module.css"
//import Jumbotron from "react-bootstrap/Jumbotron"
//import Button from "react-bootstrap/Button"
import Carousel from "react-bootstrap/Carousel"

const Jumb = () => (
  <Carousel fade="true">
    <Carousel.Item className={`${styles.hero1}`}>
    </Carousel.Item>
  </Carousel>
)

export default Jumb;