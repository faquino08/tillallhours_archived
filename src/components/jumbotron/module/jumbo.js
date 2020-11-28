import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./jumbo.module.css"
import styled from "styled-components"
//import Jumbotron from "react-bootstrap/Jumbotron"
//import Button from "react-bootstrap/Button"
import Carousel from "react-bootstrap/Carousel"
import BackgroundImage from "gatsby-background-image"

function Jumb(props) {
  const data = useStaticQuery(graphql`
    query Hero {
      allHomePage(filter: { location: { eq: "hero" } }) {
        edges {
          node {
            location
            id
            image_1 {
              childImageSharp {
                fluid(maxWidth: 2000) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image_2 {
              childImageSharp {
                fluid(maxWidth: 2000) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image_3 {
              childImageSharp {
                fluid(maxWidth: 2000) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            image_4 {
              childImageSharp {
                fluid(maxWidth: 2000) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  `)
  var images = []
  if (data.allHomePage.edges[0].node.image_1 !== undefined) {
    images.push(data.allHomePage.edges[0].node.image_1.childImageSharp.fluid)
  } 
  
  if (data.allHomePage.edges[0].node.image_2 !== undefined) {
    images.push(data.allHomePage.edges[0].node.image_2.childImageSharp.fluid)
  } 
  
  if (data.allHomePage.edges[0].node.image_3 !== undefined) {
    images.push(data.allHomePage.edges[0].node.image_3.childImageSharp.fluid)
  } 
  
  if (data.allHomePage.edges[0].node.image_4 !== undefined) {
    images.push(data.allHomePage.edges[0].node.image_4.childImageSharp.fluid)
  } 
  
  if (data.allHomePage.edges[0].node.image_5 !== undefined) {
    images.push(data.allHomePage.edges[0].node.image_5.childImageSharp.fluid)
  }

  return (
    <Carousel fade="true" interval={500}>
      {images.map(item => {
        if (item !== null && 
            item !== undefined) {
          return (
            <Carousel.Item>
              <BackgroundImage
                className={styles.hero1}
                fluid={item}
                backgroundColor={`#040e18`}
              />
            </Carousel.Item>
          )
        }
      })}
    </Carousel>
  )
}

const StyledJumb = styled(Jumb)`
  background-repeat: repeat-y;
  background-size: cover;
`

function compileJumbo(images) {
  var jumboItems = {}
  for (var i = 0; i < images.length; i++) {
    jumboItems[i] = ( <Carousel.Item>
                        <BackgroundImage
                          className={styles.hero1}
                          fluid={images[i]}
                          backgroundColor={`#040e18`}
                        />
                      </Carousel.Item>)
  }
  return jumboItems;
}
export default StyledJumb