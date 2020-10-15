import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useRef, useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./header.css"
import { useSpring, animated, config } from "react-spring"
import { Navbar, Nav } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import "../../images/js/all.js"
import { handleScroll } from "../../services/scroll.js"

function Header(props) {
  const ref = useRef()
  const [logoToggle, setToggle] = useState(false)
  const [navBgToggle, setNavToggle] = useState(false)
  
  const brandAnimation = useSpring({
    from: {
      transform: "translate3d(12.5%, 5%, 0)",
      color: "white",
      fontSize: "9.5rem",
    },
    to: {
      transform: logoToggle
        ? "translate3d(0, 0, 0)"
        : "translate3d(12.5%, 5%, 0)",
      color: logoToggle ? "black" : "white",
      fontSize: logoToggle ? "1.75rem" : "9.5rem",
    },
    config: config.gentle,
  })

  const bgAnimation = useSpring({
    from: {
      height: "0%",
    },
    to: {
      height: navBgToggle ? "100%" : "0%",
    },
    config: config.wobbly,
  })

  const fontAnimation = useSpring({
    from: {
      color: "white",
    },
    to: {
      color: navBgToggle ? "black" : "white",
    },
    config: config.gentle,
  })

  useEffect(() => {
    if (props.home == true) {
      if (window.innerWidth < 992) {
        setToggle(true)
      }
      window.addEventListener(
        "scroll",
        function() {
          handleScroll(ref, "nav", 50, setToggle)
          handleScroll(ref, "nav", 50, setNavToggle)
        },
        { passive: true }
      )
      window.addEventListener(
        "resize",
        function() {
          if (window.innerWidth < 992) {
            setToggle(true)
          }
          if (window.innerWidth >= 992) {
            setToggle(false)
          }
        },
        { passive: true }
      )

      return () => {
        window.removeEventListener("scroll", function() {
          handleScroll(ref, "nav", 50, setToggle)
          handleScroll(ref, "nav", 50, setNavToggle)
        })
        window.removeEventListener("resize", function() {
          if (window.innerWidth < 992) {
            setToggle(true)
          }
          if (window.innerWidth >= 992) {
            setToggle(false)
          }
        })
      }
    }
  })

  if(props.home) {
    return (
      <Navbar
        className="navcolor"
        expand="md"
        collapseOnSelect="true"
        ref={ref}
      >
        <animated.div className="navBg" style={bgAnimation} />
        <div
          style={{
            maxWidth: "1200px",
            margin: `0 auto`,
            width: "100%",
            height: "auto",
            display: "flex",
            zIndex: "12000",
          }}
        >
          <Navbar.Brand href="/">
            <animated.div
              className="d-inline-block align-top"
              style={brandAnimation}
            >
              tillallhours
              <div>candle co</div>
            </animated.div>
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
                    <a href="http://instagram.com/tillallhours">
                      <i className="fab fa-instagram" style={fontAnimation}></i>
                    </a>
                  </li>
                </ul>
              </div>
              <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                  <Nav.Link href="/" style={fontAnimation}>
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/catalog" style={fontAnimation}>
                    Shop
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/about" style={fontAnimation}>
                    About
                  </Nav.Link>
                </Nav.Item>
                <Button variant="outline-primary" className="snipcart-checkout">
                  <i class="fas fa-shopping-cart"></i>
                </Button>
              </Nav>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    )
  } else {
    return (
      <Navbar
        className="navcolor"
        expand="md"
        collapseOnSelect="true"
        ref={ref}
      >
        <animated.div className="navBg" />
        <div
          style={{
            maxWidth: "1200px",
            margin: `0 auto`,
            width: "100%",
            height: "auto",
            display: "flex",
            zIndex: "12000",
          }}
        >
          <Navbar.Brand href="/">
            <animated.div className="d-inline-block align-top">
              tillallhours
              <div>candle co</div>
            </animated.div>
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
                    <a href="http://instagram.com/tillallhours">
                      <i className="fab fa-instagram" style={fontAnimation}></i>
                    </a>
                  </li>
                </ul>
              </div>
              <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                  <Nav.Link href="/" style={fontAnimation}>
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/catalog" style={fontAnimation}>
                    Shop
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/about" style={fontAnimation}>
                    About
                  </Nav.Link>
                </Nav.Item>
                <Button variant="outline-primary" className="snipcart-checkout">
                  <i class="fas fa-shopping-cart"></i>
                </Button>
              </Nav>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const hamburger = (
  <div htmlFor="burger__input" class="hamburger">
    <span class="burger__lines">
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </span>
  </div>
)

export default Header;
