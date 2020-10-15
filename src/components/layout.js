/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {useState, } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

//import Header from "./header/header"
import Header2 from "./header/header"
import "./layout.css"
//import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons'

function Layout({ children, loc }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  if (loc == "/") {
    return (
      <>
        <Header2 home={true} />
        <main>{children}</main>
      </>
    )
  } else {
    return (
      <>
        <Header2 home={false} />
        <main className="nonHomeMain">{children}</main>
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout