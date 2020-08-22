import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner-image/banner_image"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./about.module.css"
import Iframe from "react-iframe"

const AboutPage = () => {
    return (
      <Layout>
        <SEO title="About" />
        <Banner title="About Us" />
        <Row className={[styles.cont, styles.rowM]}>
          <Col xs={12} md={6}>
            <div className={styles.p_1}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
              maximus velit. Vivamus nec dolor augue. Nullam et quam blandit,
              posuere augue id, vulputate purus. Sed eget sodales est, sit amet
              ullamcorper magna. Curabitur congue nisl vitae elit cursus, nec
              ultrices quam molestie. Curabitur sit amet tortor sed mauris
              sollicitudin sollicitudin. Quisque dignissim commodo felis.
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className={styles.p_2}>
              <p>(INSERT IMAGE OF YOU AND YOUR MOM)</p>
            </div>
          </Col>
        </Row>
        <Row className={[styles.cont, styles.rowM, styles.rMap]}>
          <div className={styles.p_3}>
            <p>
              <b>Our Location:</b>
            </p>
            <Iframe
              src={"https://snazzymaps.com/embed/230998"}
              width={"100%"}
              height={"100%"}
              style={{ border: "none" }}
            ></Iframe>
          </div>
        </Row>
        <Row className={[styles.bottom, styles.rowM]}>
          <footer>
            <div className="footing">
              © {new Date().getFullYear()}, Miss Lucy's Swim Academy
            </div>
          </footer>
        </Row>
      </Layout>
    )
};

export default AboutPage;