import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./about.module.css"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <footer className={[styles.bottom, styles.rowM]}>
      <div className="footing">
        © {new Date().getFullYear()}, tillallhours Candle Co.
        <a href="http://instagram.com/tillallhours" style={{ color: "white" }}>
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  </Layout>
)

export default NotFoundPage
