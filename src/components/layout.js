/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

//import Header from "./header/header"
import Header2 from "./header/module/header"
import "./layout.css"
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header2 />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 2000,
          padding: `0`,
          paddingTop: 0,
          position: "relative",
        }}
      >
        <main>{children}</main>
        <footer>
          <div className="footing">
            © {new Date().getFullYear()}, Miss Lucy's Swim Academy 
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
