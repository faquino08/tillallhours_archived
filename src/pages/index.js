import React, { useLayoutEffect, useEffect, useRef, useState } from "react"
//import { Link } from "gatsby"
import Layout from "../components/layout"
//import Image from "../components/image"
import SEO from "../components/seo"
//import Jumb from "../components/jumbotron/jumbo.js"
import Jumb2 from "../components/jumbotron/module/jumbo.js"
import BulletPitch from "../components/bullet-pitch/bullet_pitch.js"
import FeaturedProducts from "../components/featured_products/featured_products.js"
//import Short_About from "../components/short-about/short_about.js"
import Short_About2 from "../components/short-about/module/short_about.js"
import Short_Classes2 from "../components/short-classes/module/short_class.js"
//import Contact_Form from "../components/contact/contact.js"
import Contact_Form2 from "../components/contact/module/contact.js"
import { animated, useSpring } from "react-spring"
import styles from "./index.module.css"
//import { layoutGenerator } from "react-break"
import { handleScroll, parallaxMultiplier } from "../services/scroll.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const IndexPage = ({ location }) => {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const [{ offset }, setPara] = useSpring(() => ({ offset: 0 }));
  const [paraMulti, setMulti] = useState(0.1);
  const path = location.pathname

  useLayoutEffect(() => {
    window.addEventListener("resize", function() {
      parallaxMultiplier(containerRef, footerRef, setMulti)
    })
    window.addEventListener("scroll", function() {
      handleScroll(containerRef, "parallax", 0, setPara)
    });

    if (document.readyState === "complete") {
      parallaxMultiplier(containerRef, footerRef, setMulti);
    } else {
      window.addEventListener("load", function() {
        parallaxMultiplier(containerRef, footerRef, setMulti)
      })
      return () => {
        window.removeEventListener("load", function() {
          parallaxMultiplier(containerRef, footerRef, setMulti)
        })
      }
    }

    return () => {
      window.removeEventListener("resize", function() {
        parallaxMultiplier(containerRef, footerRef, setMulti)
      })
      window.removeEventListener("scroll", function() {
        handleScroll(containerRef, "parallax", 0, setPara)
      });
    };
  });

  return (
    <div ref={containerRef}>
      <Layout loc={`${path}`}>
        <SEO title="Home" />
        <Jumb2 />
        <animated.div
          className={styles.parallax}
          style={{
            transform: offset.interpolate(
              o => `translateY(${o * paraMulti}px)`
            ),
            WebkitTransform: offset.interpolate(
              o => `translateY(${o * paraMulti}px)`
            ),
            MozTransform: offset.interpolate(
              o => `translateY(${o * paraMulti}px)`
            ),
            OTransform: offset.interpolate(
              o => `translateY(${o * paraMulti}px)`
            ),
          }}
        >
          <BulletPitch />
          <FeaturedProducts />
          <Short_About2 />
        </animated.div>
        <div className={styles.bottom} ref={footerRef}>
          {/*<Contact_Form2 />*/}
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
                      fontSize: "1.25em"
                    }}
                  >
                    Contact Us:
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
        </div>
      </Layout>
    </div>
  )
};

export default IndexPage;
