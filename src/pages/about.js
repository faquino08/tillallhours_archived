import React from "react"
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

function AboutPage() {
  const data = useStaticQuery(graphql`
    query AboutPage {
      allAboutPage {
        edges {
          node {
            id
            title
            copy
            image_1 {
              childImageSharp {
                fluid(maxWidth: 2000) {
                  base64
                  tracedSVG
                  srcWebp
                  srcSetWebp
                  originalImg
                  originalName
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="About" />
      <Banner title={data.allAboutPage.edges[0].node.title}>
        <div className={styles.bannerImgOver}>
          <Img
            fluid={
              data.allAboutPage.edges[0].node.image_1.childImageSharp.fluid
            }
            className={styles.bannerImg}
          />
        </div>
      </Banner>
      <Row className={[styles.cont, styles.rowM]}>
        <Col xs={12} md={6}>
          <div className={styles.p_1}>
            {String(data.allAboutPage.edges[0].node.copy)
              .split("\n")
              .map((item, i) => {
                return <p key={i}>{item}</p>
              })}
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className={styles.p_2}>
            <p>(INSERT IMAGE OF YOU)</p>
          </div>
        </Col>
      </Row>
      <footer className={[styles.bottom, styles.rowM]}>
        <div className="footing">
          © {new Date().getFullYear()}, tillallhours Candle Co.
        </div>
      </footer>
    </Layout>
  )
};

export default AboutPage;