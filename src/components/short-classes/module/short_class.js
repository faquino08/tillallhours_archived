import React, { useRef, useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./short_class.module.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import teaswh2 from "../../../images/teachingswiming (50).jpg"
import teaswh3 from "../../../images/teachingswiming (89).jpg"
import { Link } from "gatsby"
import { animated, useSpring, useChain } from "react-spring"
//import { layoutGenerator } from "react-break"
import { handleScroll } from "../../../services/scroll.js"

const QuickClasses = () => {
  //Refs and Springs
  const ref = useRef()
  const picRef = useRef()
  const textRef = useRef()
  const [clToggle, setToggle] = useState(false)
  const config = { mass: 5, tension: 2000, friction: 200 }
  const { x, opacity } = useSpring({
    config,
    x: clToggle ? 0 : 1,
    opacity: clToggle ? 1 : 0,
    from: { x: 0, opacity: 0.05 },
    ref: picRef,
  })
  const { y } = useSpring({
    config,
    y: clToggle ? 1 : 0,
    from: { y: 0 },
    ref: textRef,
  })

  //Chain
  useChain(clToggle ? [picRef, textRef] : [textRef, picRef])
  
  useEffect(() => {
    window.addEventListener("scroll", function() {
      handleScroll(ref, "standard", 2, setToggle)
    })

    return () => {
      window.removeEventListener("scroll", function() {
        handleScroll(ref, "standard", 2, setToggle)
      })
    }
  })

  return (
    <Container className={styles.home_classes} ref={ref}>
      <Row>
        <Col md={4} xs={12} className={styles.fP}>
          <animated.img
            src={teaswh2}
            style={{
              transform: x.interpolate(x => `translate3d(${x * 50}%,0,0)`),
              opacity
            }}
          ></animated.img>
        </Col>
        <Col md={4} xs={12}>
          <animated.div
            style={{
              opacity: y.interpolate(y => `${y}`),
              scale: y.interpolate(y => `${y}`),
            }}
          >
            <p className={styles.para}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className={styles.short_btn}>
              <Button variant="outline-primary">
                <Link to="/">Classes</Link>
              </Button>
            </div>
          </animated.div>
        </Col>
        <Col md={4} xs={12} className={styles.lP}>
          <animated.img
            src={teaswh3}
            style={{
              transform: x.interpolate(x => `translate3d(${-x * 50}%,0,0)`),
              opacity
            }}
          ></animated.img>
        </Col>
      </Row>
    </Container>
  )
}

export default QuickClasses