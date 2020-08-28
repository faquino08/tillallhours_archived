//import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./header.css"
import { Navbar, Nav } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import logo from "../../images/logo_blk.svg"
import "../../images/js/all.js"

const Header = ({ siteTitle }) => (
  <Navbar className="navcolor" expand="md" collapseOnSelect="true">
    <div
      style={{
        maxWidth: "1200px",
        margin: `0 auto`,
        width: "100%",
        height: "auto",
        display: "flex",
      }}
    >
      <Navbar.Brand href="/">
        <p
          className="d-inline-block align-top"
        >
          tillallhours
        </p>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        as="button"
        children={hamburger}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="navbar-split justify-content-end">
          <div className="navbar-social justify-content-end">
            <ul className="navbar-nav navbar-upper mt-3 mt-md-0 justify-content-end">
              <li>
                <a href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Classes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Blog</Nav.Link>
            </Nav.Item>
            <Button variant="outline-primary">
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

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const hamburger = (
  <div for="burger__input" class="hamburger">
    <span class="burger__lines">
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </span>
  </div>
)

export default Header;
