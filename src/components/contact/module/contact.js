import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./contact.module.css"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const homeContact = () => (
  <Container className={[styles.home_contact, styles.container]}>
    <Row className={styles.conRow}>
      <Form>
        <Row className={styles.row}>
          <h1>
            CONTACT <font color="#cd1e26">US:</font>
          </h1>
        </Row>
        <Row className={styles.row}>
          <Col md={6} xs={12} className={styles.col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder="First name" />
          </Col>
          <Col md={6} xs={12} className={styles.col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="Last name" />
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col md={6} xs={12} className={styles.col}>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control placeholder="(XXX)-XXX-XXXX" />
          </Col>
          <Col md={6} xs={12} className={styles.col}>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Email" />
          </Col>
          <Col md={6} xs={12} className={styles.col}>
            <Form.Label>Interested In</Form.Label>
            <Form.Control as="select">
              <option>One-on-One Classes</option>
              <option>Small Group Classes</option>
            </Form.Control>
          </Col>
        </Row>

        <Button variant="outline-primary" type="submit" className={styles.btn}>
          Submit
        </Button>
      </Form>
    </Row>
  </Container>
)

export default homeContact;