import { Link } from "gatsby"
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./header.module.css"
import { Navbar, Nav } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import logo from "../../../images/Logo_1-in-vector.svg"
import "../../../images/js/all.js"

const Header = () => (
  <Navbar
    className={styles.navblue}
    expand="md"
    collapseOnSelect="true"
    sticky="top"
  >
    <div
      style={{
        maxWidth: "1200px",
        margin: `0 auto`,
        width: "100%",
        height: "auto",
        display: "flex",
      }}
    >
      <Navbar.Brand href="/" className={styles.navbar_brand}>
        <img
          src={logo}
          className="d-inline-block align-top"
          alt="Miss Lucy's Swim School logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        as="button"
        children={hamburger}
        className={`navbar-toggler ${styles.navbar_toggler}`}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <div
          className={`
            ${styles.navbar_split}
            ${styles.justify_content_end}
            justify-content-end
          `}
          s
        >
          <div
            className={`
              ${styles.navbar_social}
              ${styles.justify_content_end}
              justify-content-end
            `}
          >
            <ul
              className={`
                ${styles.navbar_nav}
                ${styles.navbar_upper}
                ${styles.justify_content_end}
                mt-3
                mt-md-0
                justify-content-end
                navbar-nav
              `}
            >
              <li>
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
          <Nav
            className={`justify-content-end ${styles.justify_content_end}`}
            activeKey="/home"
          >
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/classes">Classes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Blog</Nav.Link>
            </Nav.Item>
            <Button
              variant="outline-primary"
              className={`${styles.btn} ${styles.btn_outline_primary}`}
            >
              <Nav.Item>
                <Nav.Link href="#link">Contact</Nav.Link>
              </Nav.Item>
            </Button>
          </Nav>
        </div>
      </Navbar.Collapse>
    </div>
  </Navbar>
)

const hamburger = (
  <div for="burger__input" class={styles.hamburger}>
    <span class={styles.burger__lines}>
      <span class={styles.burger__line}></span>
      <span class={styles.burger__line}></span>
      <span class={styles.burger__line}></span>
    </span>
  </div>
)

export default Header;