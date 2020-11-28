import React, { useRef, useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./short_about.module.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import teaswh1 from "../../../images/teachingswiming (30).jpg"
import { Link } from "gatsby"
import { animated, useSpring, useChain } from "react-spring"
import { handleScroll } from "../../../services/scroll.js"

function QuickAboutUs () {
  //Refs and Text Spring
  const ref = useRef()
  const textRef = useRef()
  const picRef = useRef()
  const [abToggle, setToggle] = useState(false)
  const config = { mass: 5, tension: 2000, friction: 200 }
  const { x, y, ...rest } = useSpring({
    config,
    opacity: abToggle ? 1 : 0,
    x: abToggle ? 0 : 20,
    y: abToggle ? 1 : 0,
    from: { opacity: 0, x: 20, y: 0 },
    ref: textRef,
  })
  const { opacity, transform } = useSpring({
    config,
    to: {
      opacity: abToggle ? 1 : 0,
      transform: abToggle ? "scale(1)" : "scale(0.8)",
    },
    from: { opacity: 0, scale: 0 },
    ref: picRef,
  })

  //Chain
  useChain(abToggle ? [picRef, textRef] : [textRef, picRef])

  //Scroll Listener
  /*const handleScroll = () => {
    const posY = window.innerHeight
    let bottom = ref.current.getBoundingClientRect().bottom
    let top = ref.current.getBoundingClientRect().top 
    if (bottom <= posY) {
      setToggle(true)
    } else if (top * 1.1 > posY) {
      setToggle(false)
    }
  }*/

  useEffect(() => {
    window.addEventListener("scroll", function () {
      handleScroll(ref, "standard", 2, setToggle)
    })

    return () => {
      window.removeEventListener("scroll", function() {
        handleScroll(ref, "standard", 2, setToggle)
      })
    }
  })

  const data = useStaticQuery(graphql`
    query About {
      allHomePage(filter: { location: { eq: "Storyline" } }) {
        nodes {
          location
          id
          paragraph
          image_1 {
            childImageSharp {
              fluid {
                src
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Container className={styles.home_about} ref={ref}>
      <Row>
        <Col md={6} xs={12}>
          <animated.img
            src={data.allHomePage.nodes[0].image_1.childImageSharp.fluid.src}
            style={{ opacity, transform }}
          ></animated.img>
        </Col>
        <Col md={6} xs={12}>
          <animated.div
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(${x}px,0,0)`),
            }}
          >
            <p className={styles.para}>
              {String(data.allHomePage.nodes[0].paragraph)
                .split("\n")
                .map((item, i) => {
                  return <p key={i}>{item}</p>
                })}
            </p>
            <div className={styles.short_btn}>
              <Button variant="outline-primary">
                <Link to="/about">About Us</Link>
              </Button>
            </div>
          </animated.div>
        </Col>
      </Row>
    </Container>
  )
}

export default QuickAboutUs