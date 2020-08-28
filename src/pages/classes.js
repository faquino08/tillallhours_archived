import React from "react"
//import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner-image/banner_image"
import Row from "react-bootstrap/Row"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./classes.module.css"
import Col from "react-bootstrap/Col"

const ClassPage = () => {
    return (
        <Layout>
            <SEO title="Classes" />
            <Banner title="Classes" />
            <Row className={[styles.cont,styles.rowM]}>
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
                        <p>(Graphic of Levels of Development)</p>
                    </div>
                </Col>
            </Row>
            <Row className={[styles.cont,styles.rowM]}>
                <Col xs={12} md={6}>
                    <div className={styles.p_2}>
                        <p>(Schedule)</p>
                    </div>
                </Col>
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
            </Row>
            <Row className={[styles.bottom,styles.rowM]}>
                <footer>
                    <div className="footing">
                    © {new Date().getFullYear()}, Miss Lucy's Swim Academy
                    </div>
                </footer>
            </Row>
        </Layout>
    )
};

export default ClassPage;