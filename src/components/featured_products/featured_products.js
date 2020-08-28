import React, { useState, useEffect } from "react"
import Holder from "holderjs"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./featured_products.module.css"
import Carousel from "react-bootstrap/Carousel"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { animated, useSpring, useChain } from "react-spring"
import { handleScroll } from "../../services/scroll.js"

function CardCarousel () {
  const [carousel, setCarousel] = useState(0);
  
  useEffect(() => {
    Holder.run({
      images: ".cardImg",
    })
  });

  return (
    <Container className={styles.bullets}>
      <div className={styles.inner}>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
            <Card.Img
              className="cardImg"
              variant="top"
              data-src="holder.js/100px100p"
            />
            <Button variant="primary" className={styles.cardBtn}>
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
            <Card.Img
              className="cardImg"
              variant="top"
              data-src="holder.js/100px100p"
            />
            <Button variant="primary" className={styles.cardBtn}>
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
            <Card.Img
              className="cardImg"
              variant="top"
              data-src="holder.js/100px100p"
            />
            <Button variant="primary" className={styles.cardBtn}>
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
            <Card.Img
              className="cardImg"
              variant="top"
              data-src="holder.js/100px100p"
            />
            <Button variant="primary" className={styles.cardBtn}>
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
            <Card.Img
              className="cardImg"
              variant="top"
              data-src="holder.js/100px100p"
            />
            <Button variant="primary" className={styles.cardBtn}>
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
      </div>
      <a className={styles.carousel_prev} role="button" href="#">
        <i class="far fa-arrow-alt-circle-left fa-3x"></i>
      </a>
      <a className={styles.carousel_next} role="button" href="#">
        <i class="far fa-arrow-alt-circle-right fa-3x"></i>
      </a>
    </Container>
  )
}

export default CardCarousel;