import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"
import "./bullet_pitch.css"

function BulletPitch () {

  const data = useStaticQuery(graphql`
    query Bullets {
      allHomePage(filter: { location: { eq: "Bullet Pt" } }) {
        nodes {
          location
          id
          paragraph
          image_1 {
            publicURL
          }
        }
      }
    }
  `)

  return (
    <Container className="bullets">
      {fivePoints(data)}
        {/*<Col xs={12} md={4} className="bt_1">
          <div className="bullet_pt">
            <i
              className="fas fa-user-friends fa-3x"
              style={{ color: "white" }}
            ></i>
            <p>Family owned and operated.</p>
          </div>
        </Col>
        <Col xs={12} md={4} className="bt_2">
          <div className="bullet_pt">
            <i class="fas fa-users fa-3x" style={{ color: "white" }}></i>{" "}
            <p>Committed to keeping class sizes small.</p>
          </div>
        </Col>
        <Col xs={12} md={4} className="bt_3">
          <div className="bullet_pt">
            <i class="fas fa-swimmer fa-3x" style={{ color: "white" }}></i>
            <p>Dedicated to your progress and growth.</p>
          </div>
        </Col>*/}
    </Container>
  )
}

function threePoints(data) {
  return data.allHomePage.nodes.map(node => (
    <Row>
      <Col xs={12} md={4} className="bt">
        <div className="bullet_pt">
          <img src={node.image_1.publicURL} className="bt_img" />{" "}
          {/*<i class="fas fa-users fa-3x" style={{ color: "black" }}></i>{" "}*/}
          <p>{node.paragraph}</p>
        </div>
      </Col>
    </Row>
  ))
}

function fourPoints(data) {
  return data.allHomePage.nodes.map(node => (
    <Row>
      <Col xs={12} md={3} className="bt">
        <div className="bullet_pt">
          <img src={node.image_1.publicURL} className="bt_img" />{" "}
          {/*<i class="fas fa-users fa-3x" style={{ color: "black" }}></i>{" "}*/}
          <p>{node.paragraph}</p>
        </div>
      </Col>
    </Row>
  ))
}

function fivePoints(data) {
  return (
    <>
      <Row>
        {data.allHomePage.nodes.map((node, index) => {return fivePointHelper1(node, index);})}
      </Row>
      <Row>
        {data.allHomePage.nodes.map((node, index) => {return fivePointHelper2(node, index);})}
      </Row>
    </>
  )
}

function fivePointHelper1(node, index) {
  if (index < 3) {
    return (
      <Col xs={12} md={4} className="bt">
        <div className="bullet_pt">
          <img src={node.image_1.publicURL} className="bt_img" />{" "}
          {/*<i class="fas fa-users fa-3x" style={{ color: "black" }}></i>{" "}*/}
          <p>{node.paragraph}</p>
        </div>
      </Col>
    )
  } else {
    return
  }
}

function fivePointHelper2(node, index) {
  if (index >= 3) {
    if (index == 3) {
      return (
        <>
          <Col xs={12} md={2} className="bt"></Col>
          <Col xs={12} md={4} className="bt">
            <div className="bullet_pt">
              <img src={node.image_1.publicURL} className="bt_img" />{" "}
              {/*<i class="fas fa-users fa-3x" style={{ color: "black" }}></i>{" "}*/}
              <p>{node.paragraph}</p>
            </div>
          </Col>
        </>
      )
    } else if (index == 4) {
      return (
        <>
          <Col xs={12} md={4} className="bt">
            <div className="bullet_pt">
              <img src={node.image_1.publicURL} className="bt_img" />{" "}
              {/*<i class="fas fa-users fa-3x" style={{ color: "black" }}></i>{" "}*/}
              <p>{node.paragraph}</p>
            </div>
          </Col>
          <Col xs={12} md={2} className="bt"></Col>
        </>
      )
    }
  } else {
    return
  }
}

export default BulletPitch;