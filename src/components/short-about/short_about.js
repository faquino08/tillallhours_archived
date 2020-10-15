import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./short_about.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import teaswh1 from "../../images/teachingswiming (30).jpg"
import { Link } from "gatsby"

const quickAboutUs = () => (
  <Container className="home_about">
    <Row>
      <Col md={6} xs={12}>
        <img src={teaswh1}></img>
      </Col>
      <Col md={6} xs={12}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
          facilisis magna etiam tempor orci eu lobortis elementum. Viverra
          mauris in aliquam sem fringilla.
        </p>
        <div className="short_btn">
          <Button variant="outline-primary" >
            <Link to="/about">About Us</Link>
          </Button>
        </div>
      </Col>
    </Row>
  </Container>
)

export default quickAboutUs;