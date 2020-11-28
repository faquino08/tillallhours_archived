import React, { useLayoutEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image" 
import SEO from "../components/seo"
import Banner from "../components/banner-image/banner_image"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./about.module.css"
import Iframe from "react-iframe"

function AboutPage({ location }) {
  const [isDesktop, setDesktop] = useState(false)

  const data = useStaticQuery(graphql`
    query AboutPage {
      allAboutPage {
        edges {
          node {
            id
            title
            copy
            image_2 {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image_3 {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image_4 {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image_5 {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  `)

  useLayoutEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("resize", function() {
        if (window.innerWidth >= 992) {
          setDesktop(true)
        } else {
          setDesktop(false)
        }
      })
      if (window.innerWidth >= 992) {
        setDesktop(true)
      } else {
        setDesktop(false)
      }
    } else {
      setDesktop(false)
    }
    
    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener("resize", function() {
          if (window.innerWidth >= 992) {
            setDesktop(true)
          } else {
            setDesktop(false)
          }
        })
      }
    }
  })

  return (
    <Layout>
      <SEO title="About" />
      <Banner
        title={data.allAboutPage.edges[0].node.title}
        imageData={
          data.allAboutPage.edges[0].node.image_5.childImageSharp.fluid
        }
      />
      {String(data.allAboutPage.edges[0].node.copy)
        .split("\n\n")
        .map((item, i) => {
          var colOrder = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
          if (i === 0) {
            return (
              <Row className={[styles.cont, styles.rowM]}>
                <Col
                  key={i}
                  xs={{ span: 12, order: `${colOrder[i]}` }}
                  /*md={{ span: 8, order: 1 }}*/
                  lg={{ span: 6, order: 1 }}
                >
                  <div className={styles.p_1} style={{ height: "100%" }}>
                    <p key={i}>{item}</p>
                  </div>
                </Col>
                <Col
                  xs={{ span: 12, order: 1 }}
                  /*md={{ span: 4, order: 2 }}*/
                  lg={{ span: 6, order: 1 }}
                >
                  <div
                    className={styles.p_2}
                    style={{ height: "100%", padding: "1rem" }}
                  >
                    <Img
                      fluid={
                        data.allAboutPage.edges[0].node.image_2.childImageSharp
                          .fluid
                      }
                      className={styles.aboutImage}
                    />
                  </div>
                </Col>
              </Row>
            )
          } else if (i === 1) {
            if ( isDesktop ) {
              return (
                <Row className={[styles.cont, styles.rowM]}>
                  <Col
                    xs={{ span: 12, order: 1 }}
                    /*md={{ span: 4, order: 2 }}*/
                    lg={{ span: 6, order: 1 }}
                  >
                    <div
                      className={styles.p_2}
                      style={{ height: "100%", padding: "1rem" }}
                    >
                      <Img
                        fluid={
                          data.allAboutPage.edges[0].node.image_3.childImageSharp
                            .fluid
                        }
                        className={styles.aboutImage}
                      />
                    </div>
                  </Col>
                  <Col
                    key={i}
                    xs={{ span: 12, order: `${colOrder[i]}` }}
                    /*md={{ span: 8, order: 1 }}*/
                    lg={{ span: 6, order: 1 }}
                  >
                    <div className={styles.p_1} style={{ height: "100%" }}>
                      <p key={i}>{item}</p>
                    </div>
                  </Col>
                </Row>
              )
            } else {
              return (
                <Row className={[styles.cont, styles.rowM]}>
                  <Col
                    key={i}
                    xs={{ span: 12, order: `${colOrder[i]}` }}
                    /*md={{ span: 8, order: 1 }}*/
                    lg={{ span: 6, order: 1 }}
                  >
                    <div className={styles.p_1} style={{ height: "100%" }}>
                      <p key={i}>{item}</p>
                    </div>
                  </Col>
                  <Col
                    xs={{ span: 12, order: 1 }}
                    /*md={{ span: 4, order: 2 }}*/
                    lg={{ span: 6, order: 1 }}
                  >
                    <div
                      className={styles.p_2}
                      style={{ height: "100%", padding: "1rem" }}
                    >
                      <Img
                        fluid={
                          data.allAboutPage.edges[0].node.image_3.childImageSharp
                            .fluid
                        }
                        className={styles.aboutImage}
                      />
                    </div>
                  </Col>
                </Row>
              )
            }
          } else if (i === 2) {
            return (
              <Row className={[styles.cont, styles.rowM]}>
                <Col
                  key={i}
                  xs={{ span: 12, order: `${colOrder[i]}` }}
                  /*md={{ span: 8, order: 1 }}*/
                  lg={{ span: 6, order: 1 }}
                >
                  <div className={styles.p_1} style={{ height: "100%" }}>
                    <p key={i}>{item}</p>
                  </div>
                </Col>
                <Col
                  xs={{ span: 12, order: 1 }}
                  /*md={{ span: 4, order: 2 }}*/
                  lg={{ span: 6, order: 1 }}
                >
                  <div
                    className={styles.p_2}
                    style={{ height: "100%", padding: "1rem" }}
                  >
                    <Img
                      fluid={
                        data.allAboutPage.edges[0].node.image_4.childImageSharp
                          .fluid
                      }
                      className={styles.aboutImage}
                    />
                  </div>
                </Col>
              </Row>
            )
          } else {
            return (
              <Row className={[styles.cont, styles.rowM]}>
                <Col
                  key={i}
                  xs={{ span: 12, order: `${colOrder[i]}` }}
                  /*md={{ span: 8, order: 1 }}*/
                  lg={{ span: 6, order: 1 }}
                >
                  <div className={styles.p_1}>
                    <p key={i}>{item}</p>
                  </div>
                </Col>
                <Col
                  xs={{ span: 12, order: 1 }}
                  /*md={{ span: 4, order: 2 }}*/
                  lg={{ span: 6, order: 1 }}
                ></Col>
              </Row>
            )
          }
        })}

      {/*</Row><Col xs={{ span: 12, order: 3 }} md={{ span: 6, order: 2 }}>
          <div className={styles.p_2}>
            <p>(INSERT IMAGE OF YOU)</p>
          </div>
        </Col>
        <Col xs={{ span: 12, order: 5 }} md={{ span: 6, order: 2 }}>
          <div className={styles.p_2}>
            <p>(INSERT IMAGE OF YOU)</p>
          </div>
        </Col>
        
        */}

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
};

export default AboutPage;