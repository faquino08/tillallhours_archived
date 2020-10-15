import React, { useRef, useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./bullet_pitch.module.css"
import { animated, useSpring, useChain } from "react-spring"
import { handleScroll } from "../../../services/scroll.js"

const BulletPitch = () => {
  //Refs and Heading Spring
  const ref = useRef()
  const headingRef = useRef()
  const bodyRef = useRef()
  const [blToggle, setToggle] = useState(false)
  const { popUp } = useSpring({
    from: { popUp: 0 },
    popUp: blToggle ? 1 : 0,
    ref: headingRef,
    config: { duration: 500 },
  })

  //Body Spring
  const { transform, opacity } = useSpring({
    from: {
      opacity: 0,
      transform: "scale(0.8)",
    },
    to: {
      opacity: blToggle ? 1 : 0,
      transform: blToggle ? "scale(1)" : "scale(0.8)",
    },
    config: { duration: 500 },
    ref: bodyRef,
  })

  //Chain
  useChain(blToggle ? [headingRef, bodyRef] : [bodyRef, headingRef])

  useEffect(() => {
    window.addEventListener(
      "scroll",
      function() {
        handleScroll(ref, "simple", 2, setToggle)
      },
      { passive: true }
    )

    return () => {
      window.removeEventListener("scroll", function() {
        handleScroll(ref, "simple", 2, setToggle)
      })
    }
  })

  return (
    <Container className={styles.bullets} ref={ref}>
      <Row className={styles.row}>
        <animated.h1
          className={styles.animHeading}
          style={{
            opacity: popUp.interpolate({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [0, 0, 0, 0, 0, 0.25, 0.75, 1],
            }),
            transform: popUp
              .interpolate({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [1, 0.97, 0.9, 1.1, 0.9, 0.5, 2, 1],
              })
              .interpolate(popUp => `scale(${popUp})`),
            transform2: popUp
              .interpolate({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [-40, -20, -15, -10, -1, 1, -1, 0],
              })
              .interpolate(popUp => `translateY(${popUp}em)`),
          }}
        >
          Featured Products:
        </animated.h1>
      </Row>
      <Row className={styles.row}>
        <Col xs={12} md={4} className={[styles["bt_1"], styles.col]}>
          <animated.div
            style={{ transform, opacity }}
            className={styles.bullet_pt}
          >
            <Card>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
                <Card.Img variant="top" /*src="holder.js/100px180"*/ />
                <Button variant="primary" className={styles.cardBtn}>
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </animated.div>
        </Col>
        <Col xs={12} md={4} className={[styles["bt_2"], styles.col]}>
          <animated.div
            style={{ transform, opacity }}
            className={styles.bullet_pt}
          >
            <Card>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
                <Card.Img variant="top" /*src="holder.js/100px180"*/ />
                <Button variant="primary" className={styles.cardBtn}>
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </animated.div>
        </Col>
        <Col xs={12} md={4} className={[styles["bt_3"], styles.col]}>
          <animated.div
            style={{ transform, opacity }}
            className={styles.bullet_pt}
          >
            <Card>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>Card Title</Card.Title>
                <Card.Img variant="top" /*src="holder.js/100px180"*/ />
                <Button variant="primary" className={styles.cardBtn}>
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </animated.div>
        </Col>
      </Row>
    </Container>
  )
}

export default BulletPitch